import Loader from "../Loader/Loader";
import "./LoadingAlert.css"

function LoadingAlert({ visible, progress, cancel, cancelAction }) {
    if (visible) {
        return <div className="loading-alert-wrapper">
            <Loader progress={progress} />
            {cancelAction ?
                <button className="loading-alert__cancel-button" onClick={cancelAction}>
                    {cancel ?? "Cancel"}
                </button> : <></>}
        </div>
    }
}

export default LoadingAlert;