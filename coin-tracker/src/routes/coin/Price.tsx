import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../../api";
import ApexChart from "react-apexcharts"
import { styled } from "styled-components";
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
const Loader = styled.div`
    text-align: center;
`;
interface IHistory {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

export default function Price() {
    const { coinId } = useParams();
    const { isLoading, data = [] } = useQuery<IHistory[]>({
        queryKey: ["price", coinId], 
        queryFn: () => fetchCoinHistory(coinId),
    });

    // 
    if (isLoading) {
        return <Loader>Loading...</Loader>;
    }

    return (
        <div>
            {/* #region 초기화 */}
            <Editor
                initialValue="hello react editor world!"
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
            />
            <ApexChart 
                type="candlestick" 
                series={[
                    {
                        data: data.map(history => (({ 
                            x: new Date(history.time_close), 
                            y: [history.open, history.high, history.low, history.close]
                        }))) 
                    },
                ]}
                options={{
                    theme: {
                        mode: "dark"
                    },
                    chart: {
                        height: 500,
                        width: 500,
                        background: "transparent",
                        toolbar: {
                            show: false
                        }
                    },
                    grid: {
                        show: false,
                    },
                    yaxis: {
                        show: false
                    },
                    xaxis: {
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        labels: {
                            show: false,
                        },
                        type: "datetime", // 카테고리를 데이트로 인식
                        categories: data.map(history => history.time_close)
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            gradientToColors: ["#ffffff9d"],
                            stops: [0, 40]
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: (value) => `${value.toFixed(1)}` // 값 포매터
                        }
                    }
                }}
            />
            {/* #endregion */}
        </div>
    )
}