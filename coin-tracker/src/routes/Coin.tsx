import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components"

const Container = styled.div`
    padding: 10px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

interface ICoinInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface IPriceInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_15m: number;
            percent_change_30m: number;
            percent_change_1h: number;
            percent_change_6h: number;
            percent_change_12h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            percent_change_30d: number;
            percent_change_1y: number;
            ath_price: number;
            ath_date: string;
            percent_from_price_ath: number;
        }
    }
}


export default function Coin() {
    const { coinId } = useParams();
    const [loading, setLoading] = useState(true);

    const [coinInfo, setCoinInfo] = useState<ICoinInfo>();
    const [priceInfo, setPriceInfo] = useState<IPriceInfo>();

    useEffect(() => {
        (async() => {
            await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
                .then(response => response.json())
                .then(data => {
                    setCoinInfo(data);
                });
            await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
                .then(response => response.json())
                .then(data => {
                    setPriceInfo(data);
                });
            setLoading(false);
        })();
    }, [])

    return (
        <Container>
            <Header>
                {/* 직접 url 입력해서 진입하면 state를 읽을 수 없음. */}
                <Title>{coinId}</Title>
            </Header>
            {loading && <Loader>Loading...</Loader>}
            {coinInfo?.id}
        </Container>
    )
}