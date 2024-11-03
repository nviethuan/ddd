package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"reflect"

	pb "prosessor/proto"

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

func (s *server) Calculate(ctx context.Context, in *pb.CalculateRequest) (*pb.CalculateReply, error) {
	symbol := in.GetSymbol()
	currentPrice := in.GetCurrentPrice()
	walletBaseBalance := in.GetWalletBaseBalance()
	walletQuoteBalance := in.GetWalletQuoteBalance()
	priceHistories := in.GetPriceHistories()
	purchasePowers := in.GetPurchasePowers()
	sellPowers := in.GetSellPowers()

	log.Printf("Received: %v", symbol)
	log.Printf("Received: %v", currentPrice)
	log.Printf("Received: %v", walletBaseBalance)
	log.Printf("Received: %v", walletQuoteBalance)
	log.Printf("Received: %v", priceHistories)
	log.Printf("Received: %v", purchasePowers)
	log.Printf("Received: %v", sellPowers)

	if !isArray(priceHistories) {
		return nil, fmt.Errorf("priceHistories is not a slice")
	}
	if !isArray(purchasePowers) {
		return nil, fmt.Errorf("purchasePowers is not an array")
	}
	if !isArray(sellPowers) {
		return nil, fmt.Errorf("sellPowers is not an array")
	}


	return &pb.CalculateReply{ShouldBuy: false, ShouldSell: false}, nil
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