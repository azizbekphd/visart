import "./VideoPreview.css"

function VideoPreview({thumbnail, title, author, views, pubDate}) {
    return <div className="video-preview">
        <div className="video-preview__thumbnail-wrapper">
            <img src={thumbnail} className="video-preview__thumbnail"/>
        </div>
        <div className="video-preview__data">
            <h3 className="video-preview__title">{title}</h3>
        </div>
    </div>
}

export default VideoPreview;