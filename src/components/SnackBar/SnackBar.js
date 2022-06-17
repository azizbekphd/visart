import { useEffect, useState } from "react"
import "./SnackBar.css"

function SnackBar({message}) {
    const [visible, setVisible] = useState(false)
    const [messageValue, setMessageValue] = useState(message)
    const [messageProp, setMessageProp] = useState(message)
    
    useEffect(()=>{
        setMessageProp(message)
        if (message) {
            setMessageValue(message)
        }
        if(message){
            setVisible(true);
        } else {
            setTimeout(()=>{
                setVisible(false);
            }, 300);
        }
    },[message])

    if (visible) {
        return <div className={["snackbar-wrapper", messageProp ? "visible" : "invisible"].join(" ")}>
            <div className="snackbar">
                {messageValue}
            </div>
        </div>
    }
}

export default SnackBar;