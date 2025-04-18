import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoinInfo, fetchCoinTicker } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 10px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  position: relative;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  a {
    position: absolute;
    left: 0;
    cursor: pointer;
    color: white;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

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
    };
  };
}

export default function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation();
  // const [loading, setLoading] = useState(true);

  // const [coinInfo, setCoinInfo] = useState<ICoinInfo>();
  // const [priceInfo, setPriceInfo] = useState<IPriceInfo>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  // useEffect(() => {
  //     (async() => {
  //         await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //             .then(response => response.json())
  //             .then(data => {
  //                 setCoinInfo(data);
  //             });
  //         await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //             .then(response => response.json())
  //             .then(data => {
  //                 setPriceInfo(data);
  //             });
  //         setLoading(false);
  //     })();
  // }, [])

  const { isLoading: infoLoading, data: infoData } = useQuery<ICoinInfo>({
    queryKey: ["coinInfo", coinId],
    queryFn: () => fetchCoinInfo(coinId),
  });
  const { isLoading: tickerLoading, data: tickerData } = useQuery<IPriceInfo>(
    ["coinTicker", coinId],
    () => fetchCoinTicker(coinId)
  );

  if (infoLoading || tickerLoading) {
    return <Loader>Loading...</Loader>;
  }

  return (
    <Container>
      {/* 헤드 속성 바꿔줌 */}
      <Helmet>
        <title>코인</title>
      </Helmet>

      <Header>
        {/* 직접 url 입력해서 진입하면 state를 읽을 수 없음. */}
        <Title>
          <Link to="/">&larr;</Link>
          {state?.name ? state.name : infoData?.name}
        </Title>
      </Header>

      <Overview>
        <OverviewItem>
          <span>Rank:</span>
          <span>{infoData?.rank}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Symbol:</span>
          <span>${infoData?.symbol}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Price:</span>
          <span>${tickerData?.quotes.USD.price.toFixed(2)}</span>
        </OverviewItem>
      </Overview>

      <Description>{infoData?.description}</Description>

      <Overview>
        <OverviewItem>
          <span>Total Suply:</span>
          <span>{tickerData?.total_supply}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Max Supply:</span>
          <span>{tickerData?.max_supply}</span>
        </OverviewItem>
      </Overview>

      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to="chart">Chart</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to="price">Price</Link>
        </Tab>
      </Tabs>

      <Outlet />
    </Container>
  );
}
