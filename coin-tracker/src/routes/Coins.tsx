import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components"
import { fetchCoins } from "../api";

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

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
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

export default function Coins() {
    // const [coins, setCoins] = useState<ICoin[]>([]);
    // const [loading, setLoading] = useState(true);
    
    // useEffect(() => {
    //     fetch("https://api.coinpaprika.com/v1/coins")
    //     .then(response => response.json())
    //     .then(data => {
    //         setLoading(false);
    //         setCoins(data.slice(0, 100));
    //     });
    // }, [])
    
    // 캐시에 데이터를 저장해둠.
    const { isFetching, isError, isSuccess, isLoading, data } = useQuery<ICoin[]>({
        queryKey: ["coins"], 
        queryFn: fetchCoins,
    });
    console.log(isFetching, isError, isSuccess, isLoading)

    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading && <Loader>Loading...</Loader>}
            <CoinList>
                {data?.map(coin => (
                    <Coin key={coin.id}>
                        <Link to={coin.id} state={coin} >
                            <Img
                                src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                            />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
            </CoinList>
        </Container>
    )
}