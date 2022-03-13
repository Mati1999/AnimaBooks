import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Button.scss'

const Button = ({ clase,content,event,goTo }) => {
    return (
        <Link className="linkButtons" to={`${goTo}`}>
            <button className={clase} type='text' onClick={() => { event() }}>{content}</button>
        </Link>
    )
}

export default Button