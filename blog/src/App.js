import React, { useState } from 'react';
import './App.css';

function App() {
    const name = '유미네';
    const [titles, setTitle] = useState(['나', '다', '가']);
    const [modalTitle, setModalTitle] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    // function changeTitle(title) {
    //     const index = titles.findIndex((i) => i === title);
    //     const copy = [...titles];
    //     copy[index] = 'test';
    //     setTitle(copy);
    // }

    function showModal(title) {
        setModalVisible(true);
        setModalTitle(title);
    }

    function updateTitle({ target: { dataset: { index } } }) {
        const copy = [...titles];
        copy[index] = 'test';
        setTitle(copy);
    }

    function sortTitle() {
        const copy = [...titles].sort();
        setTitle(copy);
    }

    function toggleModal() {
        setModalVisible(!isModalVisible);
    }

    return (
        <div className="App">
            <div>
                <h4>{ name }</h4>
            </div>
            <button type="button" onClick={sortTitle}>정렬</button>
            <button type="button" data-index="0" onClick={updateTitle}>수정</button>
            <button type="button" onClick={toggleModal}>모달</button>
            {
                titles.map((i) => (
                    <Post
                        key={i}
                        title={i}
                        showModal={() => showModal(i)}
                    />
                ))
            }
            {
                isModalVisible
                    ? (
                        <Modal
                            title={modalTitle}
                            close={() => setModalVisible(false)}
                        />
                    ) : null
            }
        </div>
    );
}

function Post({ title, showModal }) {
    const [likes, setLikes] = useState(0);
    function increaseLikes() {
        setLikes(likes + 1);
    }
    return (
        <div>
            <h4>
                { title }
                <button type="button" onClick={showModal}>선택</button>
                <button type="button" onClick={increaseLikes}>👍</button>
                { likes }
            </h4>
            <p>7월 11일</p>
        </div>
    );
}

function Modal({ title, close }) {
    return (
        <div className="modal">
            <h4>
                { title }
                <button type="button" onClick={close}>X</button>
            </h4>
        </div>
    );
}
export default App;
