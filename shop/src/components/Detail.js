import {
    useParams,
} from 'react-router-dom';
import data from '../assets/data';

export default function Detail() {
    const { id } = useParams();
    const { title, content, price } = data.find((i) => i.id === +id);

    return (
        <div className="container">
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
                    <button type="button" className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
}
