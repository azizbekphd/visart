import Loader from "../Loader/Loader";
import "./LoadingAlert.css"

function LoadingAlert({visible}){
    if (visible) {
        return <div className="loading-alert-wrapper">
            <Loader />
        </div>
    }
}

export default LoadingAlert;