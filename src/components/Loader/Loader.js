import "./Loader.css"
import "./ProgressBar.css"

function Loader({progress}) {
    return (progress ?
    <div className="progress-bar">
        <div className="progress-bar__progress" style={{flex: progress}}></div>
        <div className="progress-bar__left" style={{flex: 100 - progress}}></div>
    </div>
    : <><div className="loadingio-spinner-spinner-f3w4rmbc7l6"><div className="ldio-9zfiu9m71zr">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div></div></>);
}

export default Loader;