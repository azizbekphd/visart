import "./Center.css";

function Center (props) {
    return <div className="center" {...props}>
        {props.children}
    </div>
}

export default Center;