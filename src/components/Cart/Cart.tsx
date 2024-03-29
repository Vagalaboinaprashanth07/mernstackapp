import React, { memo, useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxstore/store';
import { fetchCartItems, updateCartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '../../reduxstore/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const user = useSelector((state: RootState) => state.userDetails.userDetails);
    const capitalizedUserId = user && user.userId ? user.userId.charAt(0).toUpperCase() + user.userId.slice(1) : null;

    useEffect(() => {
        if (user) {
            if (Object.keys(user).length === 0) {
                navigate('/login')
            } else {
                dispatch(fetchCartItems(user.userId))
            }
        }
    }, [user])
    const handleCartChanges = () => {
        if (user) {
            dispatch(updateCartItems({ userId: user.userId, updateCartItems: cartItems }))
        }
    }

    const handleDontSave = () => {
        if (user) {
            if (Object.keys(user).length === 0) {
                navigate('/login')
            } else {
                dispatch(fetchCartItems(user.userId))
            }
        }
    }
    const totalPay = useMemo(() => {
        return cartItems.reduce((acc, curr) => {
            return acc = acc + (Number(curr.price) * Number(curr.qty));
        }, 0)
    }, [cartItems])


    return (
        <div>
            <div>
                <button type="button" className="btn btn-primary mx-3 position-relative" data-bs-toggle="modal" data-bs-target="#cartModal">
                    <span className='bi bi-cart'></span> Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItems!=null?<span>{cartItems.length}</span>:0}
                        <span className="visually-hidden">Cart Items Count</span>
                    </span>
                </button>
                <div className="modal fade" data-bs-backdrop="static" id="cartModal" tabIndex={-1} aria-labelledby="cartModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="cartModalLabel">{capitalizedUserId}'s Cart</h1>
                                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            </div>
                            <div className="modal-body m-0 pt-0" style={{maxHeight:'350px',minHeight:'250px',scrollbarWidth:'thin',overflowY:'scroll'}}>
                                <table className='table table-hover' >
                                    <thead className='position-sticky top-0 bg-white'>
                                        <tr>
                                            <th>Preview</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartItems.length > 0 && cartItems.map((item) => <tr key={item.id}>
                                                <td><img src={item.image} width={50} height={50} /></td>
                                                <td>{Number(item.price)}</td>
                                                <td>
                                                    <span className='d-flex justify-content-start align-items-center'>
                                                        <button onClick={() => { dispatch(decrementQuantity(item)) }} className='btn btn-tranparent fw-bolder d-flex justify-content-center align-items-center' style={{ height: "15px", width: "15px" }}>-</button>
                                                        <span> {Number(item.qty)} </span>
                                                        <button onClick={() => { dispatch(incrementQuantity(item)) }} className='btn btn-tranparent fw-bolder d-flex justify-content-center align-items-center' style={{ height: "10px", width: "8px" }}>+</button>
                                                    </span>
                                                </td>
                                                <td>$ {(Number(item.price) * Number(item.qty)).toFixed()}</td>
                                                <td><button onClick={() => dispatch(removeFromCart(item))} className='bi bi-trash text-danger bg-transparent border-0'></button></td>
                                            </tr>)
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={3} align='right'>Total:</td>
                                            <td colSpan={2}>{`${totalPay}`}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleDontSave} data-bs-dismiss="modal">Dont Save Changes</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCartChanges}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Cart;