import "./ZoomingIntro.css";

function ZoomingIntro ({children, loaded}) {
    return <div className={["zooming-intro", loaded ? "loaded" : ""].join(" ")}>
        {children}
    </div>
}

export default ZoomingIntro;