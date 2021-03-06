import React,{ useState } from 'react'
import { useUserContext } from '../context/UserContext'
import '../Styles/UserView.scss';

const UserView = () => {

    const [recharge,setRecharge] = useState(true);
    const { user,userOrders } = useUserContext();


    return (
        <div className='userProfile'>
            <h1>{user.email}</h1>
            <div className='orders'>
                <h2>Ordenes de compra</h2>
                <div className='ordersContainer'>
                    {userOrders === undefined ?
                        setTimeout(() => {
                            setRecharge(!recharge)
                        },4000)
                        :
                        userOrders.map((order,index) => {
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
                                                    <img src={item.image} alt="" />
                                                    <div>
                                                        <h5>{item.title}</h5>
                                                        <span>{item.amount} unidades</span>
                                                    </div>
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