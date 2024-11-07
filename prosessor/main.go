package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"math"
	"net"
	pb "prosessor/proto"
	"reflect"

	"google.golang.org/grpc"

	"google.golang.org/grpc/metadata"
	// "google.golang.org/grpc/peer"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

const apiKey = "your-secure-api-key"

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedCalculateServer
}

func apiKeyAuthInterceptor(
	ctx context.Context,
	req interface{},
	info *grpc.UnaryServerInfo,
	handler grpc.UnaryHandler,
) (interface{}, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("missing metadata")
	}

	keys := md["api-key"]
	if len(keys) == 0 || keys[0] != apiKey {
		return nil, fmt.Errorf("unauthorized: invalid API key")
	}

	return handler(ctx, req)
}

func isArray(value interface{}) bool {
	// Sử dụng reflect.TypeOf để lấy kiểu của biến
	return reflect.TypeOf(value).Kind() == reflect.Slice
}

var profit float64 = 1 // 1%

func calculateShouldBuy(currentPrice *float64, priceHistories *[]float64, walletQuoteBalance *float64, ch chan bool) {
	minPrice := math.MaxFloat64
	for _, price := range *priceHistories {
		if price < minPrice {
			minPrice = price
		}
	}

	ch <- *currentPrice < minPrice && *walletQuoteBalance >= 100
}

func calculateShouldSell(currentPrice *float64, boughtPrice *float64, walletBaseBalance *float64, ch chan bool) {
	balanceWithProfit := *boughtPrice + (*boughtPrice * profit) / 100
	validBalance := *walletBaseBalance > 0
	
	usdtBalanceWithBinanceFee := *walletBaseBalance * *currentPrice - (*walletBaseBalance * *currentPrice * 0.1) / 100

	validProfit := usdtBalanceWithBinanceFee + (usdtBalanceWithBinanceFee * profit) / 100
	ch <- *currentPrice > balanceWithProfit && validBalance && validProfit >= *currentPrice
}

func (s *server) Calculate(ctx context.Context, in *pb.CalculateRequest) (*pb.CalculateReply, error) {
	// symbol := in.GetSymbol()
	currentPrice := in.GetCurrentPrice()
	boughtPrice := in.GetBoughtPrice()
	walletBaseBalance := in.GetWalletBaseBalance()
	walletQuoteBalance := in.GetWalletQuoteBalance()
	priceHistories := in.GetPriceHistories()
	purchasePowers := in.GetPurchasePowers()
	sellPowers := in.GetSellPowers()

	if !isArray(priceHistories) {
		return nil, fmt.Errorf("priceHistories is not a slice")
	}
	if !isArray(purchasePowers) {
		return nil, fmt.Errorf("purchasePowers is not an array")
	}
	if !isArray(sellPowers) {
		return nil, fmt.Errorf("sellPowers is not an array")
	}

	chShouldBuy := make(chan bool, 1)
	chShouldSell := make(chan bool, 1)

	go calculateShouldBuy(&currentPrice, &priceHistories, &walletQuoteBalance, chShouldBuy)
	go calculateShouldSell(&currentPrice, &boughtPrice, &walletBaseBalance, chShouldSell)

	shouldBuy := <-chShouldBuy
	shouldSell := <-chShouldSell

	return &pb.CalculateReply{ShouldBuy: shouldBuy, ShouldSell: shouldSell}, nil
}

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer(grpc.UnaryInterceptor(apiKeyAuthInterceptor))

	pb.RegisterCalculateServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
