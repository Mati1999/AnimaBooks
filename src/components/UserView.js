import React from 'react'
import { useUserContext } from '../context/UserContext'
import '../Styles/UserView.scss';

const UserView = () => {

    const { user,userOrders } = useUserContext();

    return (
        <div className='userProfile'>
            <h1>{user.email}</h1>
            <div className='orders'>
                <h2>Ordenes de compra</h2>
                <div className='ordersContainer'>
                    {userOrders.map((order,index) => {
                        return (
                            <div key={index} className='order'>
                                <div className='orderAndDate'>
                                    <h5>
                                        Orden #{index + 1}
                                    </h5>
                                    <h6>{order.date}</h6>
                                </div>
                                <ul>
                                    {order.items.map((item,i) => {
                                        return (
                                            <li key={i}>
                                                <h5>{item.title}</h5>
                                                <span>{item.amount} unidades</span>
                                            </li>
                                        )
                                    })
                                    }
                                </ul>
                                <p>Precio total: $ {order.total}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserView