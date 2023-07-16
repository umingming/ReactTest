import { useState } from 'react';
import {
    useParams,
} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import data from '../assets/data';

export default function Detail() {
    const { id } = useParams();
    const { title, content, price } = data.find((i) => i.id === +id);
    const [tabIndex, setTabIndex] = useState(0);
    const tabs = [
        { title: 'Tab1', content: '내용1', key: 0 },
        { title: 'Tab2', content: '내용2', key: 1 },
        { title: 'Tab3', content: '내용3', key: 2 },
    ];

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
                    <p>{`${price.toLocaleString()}원`}</p>

                    <button type="button" className="btn btn-danger">주문하기</button>
                </div>
                <Nav fill variant="tabs" defaultActiveKey={tabIndex}>
                    {
                        tabs.map((i) => (
                            <Nav.Link
                                key={i.key}
                                eventKey={i.key}
                                onClick={() => setTabIndex(i.key)}
                            >
                                {i.title}
                            </Nav.Link>
                        ))
                    }
                </Nav>
                <div>{tabs[tabIndex].content}</div>
            </div>
        </div>
    );
}
