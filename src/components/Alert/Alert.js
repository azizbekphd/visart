import { useEffect } from "react";
import "./Alert.css";

function Alert({title, message, buttons, visible, setVisible}) {

    if (visible) return <div className="alert-dialog-wrapper">
        <div className="alert-dialog">
            <h3>{title}</h3>
            <h4>{message}</h4>
            <div className="alert-dialog__buttons">
                {buttons.map((b)=>{
                    return <h3 onClick={()=>{
                        setVisible(false)
                        b.callback && b.callback()
                    }} className="alert-dialog__button">{b.title.toString()}</h3>
                })}
            </div>
        </div>
    </div>
}

export default Alert;