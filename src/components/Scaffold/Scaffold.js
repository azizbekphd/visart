import { useNavigate } from "react-router-dom";
import "./Scaffold.css";

function Scaffold({backButton, backAction, title, titleAction, ...props}) {
    const navigate = useNavigate()

    return <div className="scaffold-root">
        <div className="scaffold-app-bar">
            <button className="scaffold-app-bar__back"
                onClick={()=>{
                    backAction ? backAction() : navigate(-1)
                }}>
                <span className="material-icons-outlined">navigate_before</span>
            </button>
            <h3 className="scaffold-app-bar__title" onClick={titleAction}>{title}</h3>
        </div>
        <div className="scaffold-body">
            {props.children}
        </div>
    </div>
}

export default Scaffold;