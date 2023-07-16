import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCount, decreaseCount, removeCart } from 'store/modules/carts';
import { increaseAge } from 'store/modules/userSlice';

export default function Cart() {
    const { carts, user } = useSelector(state => state);
    const dispatch = useDispatch();
    return (
        <div className="container">
            <div>
                {`${user.name}(${user.age}세)의 장바구니`}
                <button type="button" onClick={() => dispatch(increaseAge())}>
                    증가
                </button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map(i => (
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td>{i.title}</td>
                            <td>{i.count}</td>
                            <td>
                                <button type="button" onClick={() => dispatch(increaseCount(i.id))}>
                                    증가
                                </button>
                                <button type="button" onClick={() => dispatch(decreaseCount(i.id))}>
                                    감소
                                </button>
                            </td>
                            <td>
                                <button type="button" onClick={() => dispatch(removeCart(i.id))}>
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
