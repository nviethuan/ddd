// https://developers.binance.com/docs/binance-spot-api-docs/CHANGELOG
export const BINANCE_NETWORKS = {
  mainnet: {
    socketStream: ['wss://stream.binance.com:443', 'wss://stream.binance.com:9443'],
    socketPublic: ['wss://ws-api.binance.com:443/ws-api/v3', 'wss://ws-api.binance.com:9443/ws-api/v3'],
    rest: ['https://api.binance.com', 'https://api-gcp.binance.com'],
  },
  testnet: {
    socketStream: ['wss://testnet.binance.vision/ws'],
    socketPublic: ['wss://testnet.binance.vision/ws-api/v3'],
    rest: ['https://testnet.binance.vision/api'],
  },
};
