import "./TextInput.css";

function TextInput({
    message,
    ...props
}) {
    return <div className="text-input">
        <input {...props} className={props.value ? "" : "empty"}/>
        <span className="input__message">
            {message}
        </span>
    </div>
}

export default TextInput;