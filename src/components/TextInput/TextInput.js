import "./TextInput.css";

function TextInput({
    message,
    ...props
}) {
    return <div className="text-input">
        {props.required ? <span className="required_label">*</span> : null}
        <input {...props} className={props.value ? "" : "empty"}/>
        <span className="input__message">
            {message}
        </span>
    </div>
}

export default TextInput;