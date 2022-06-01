import { useState } from "react";
import "./PasswordInput.css"

function PasswordInput(props) {
    const [visible, setVisible] = useState(false);

    function handleVisibility () {
        setVisible(!visible)
    }

    return <div className="password-input">
        {props.required ? <span className="required_label">*</span> : null}
        <input
            {...props}
            type={visible ? "text" : "password"}
            className={props.value ? "" : "empty"}
        />
        <span className="material-icons visibility-button"
            onClick={handleVisibility}
        >
            {visible ? "visibility" : "visibility_off"}
        </span>
    </div>
}

export default PasswordInput;