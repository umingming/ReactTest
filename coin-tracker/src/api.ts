
const BASE_URL = "https://api.coinpaprika.com/v1"

export async function fetchCoins() {
    return await fetch(`${BASE_URL}/coins`)
        .then(response => response.json())
        .then(data => data.slice(0, 100));
}

export async function fetchCoinInfo(coinId?: string) {
    return await fetch(`${BASE_URL}/coins/${coinId}`)
        .then(response => response.json());
}

export async function fetchCoinTicker(coinId?: string) {
    return await fetch(`${BASE_URL}/tickers/${coinId}`)
        .then(response => response.json());
}