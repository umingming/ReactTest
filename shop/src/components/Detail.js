import { useEffect, useState } from 'react';
import {
    useParams,
} from 'react-router-dom';
import data from '../assets/data';

export default function Detail() {
    const { id } = useParams();
    const { title, content, price } = data.find((i) => i.id === +id);
    const [count, setCount] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const flag = inputValue && !/^\d+$/.test(inputValue);
        setModalVisible(flag);
    }, [inputValue]);

    return (
        <div className="container">
            {
                isModalVisible
                    ? (
                        <div className="alert alert-warning">
                            경고: 숫자만 입력하세요
                        </div>
                    )
                    : ''
            }
            <input
                value={inputValue}
                onChange={({ target: { value } }) => { setInputValue(value); }}
            />
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`https://codingapple1.github.io/shop/shoes${+id + 1}.jpg`}
                        alt=""
                        width="100%"
                    />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{title}</h4>
                    <p>{content}</p>
                    <p>{price}</p>
                    <button type="button" onClick={() => setCount(count + 1)}>{count}</button>
                    <button type="button" className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
}
