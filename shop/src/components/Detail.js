import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { addCart } from '../store/modules/carts';

export default function Detail({ products }) {
    const dispatch = useDispatch();
    const id = Number(useParams().id);
    const orgRecent = JSON.parse(localStorage.getItem('recent')) ?? [];
    const newRecent = [...orgRecent.filter(i => i !== id), id];
    localStorage.setItem('recent', JSON.stringify(newRecent));

    const { title, content, price } = products.find(i => i.id === Number(id));
    const [tabIndex, setTabIndex] = useState(0);
    const tabs = [
        { title: 'Tab1', content: '내용1', key: 0 },
        { title: 'Tab2', content: '내용2', key: 1 },
        { title: 'Tab3', content: '내용3', key: 2 },
    ];
    useEffect(() => {
        const $content = document.querySelector('.start');
        const timer = setTimeout(() => {
            $content?.classList.add('end');
        }, 100);
        return () => {
            clearTimeout(timer);
            $content?.classList.remove('end');
        };
    }, []);

    return (
        <div className="start container">
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`} alt="" width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{title}</h4>
                    <p>{content}</p>
                    <p>{`${price.toLocaleString()}원`}</p>

                    <button type="button" className="btn btn-danger" onClick={() => dispatch(addCart({ id, title }))}>
                        주문하기
                    </button>
                </div>
                <Nav fill variant="tabs" defaultActiveKey={tabIndex}>
                    {tabs.map(i => (
                        <Nav.Link key={i.key} eventKey={i.key} onClick={() => setTabIndex(i.key)}>
                            {i.title}
                        </Nav.Link>
                    ))}
                </Nav>
            </div>
            <div className="content">{tabs[tabIndex].content}</div>
        </div>
    );
}
