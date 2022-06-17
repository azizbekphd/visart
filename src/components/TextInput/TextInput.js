import "./TextInput.css";

function TextInput({
    message,
    multiline,
    ...props
}) {
    return <div className="text-input">
        {props.required ? <span className="required_label">*</span> : null}
        {multiline
        ? <textarea {...props} className={props.value ? "" : "empty"}>{props.value}</textarea>
        : <input {...props} className={props.value ? "" : "empty"}/>
        }
        <span className="input__message">
            {message}
        </span>
    </div>
}

export default TextInput;