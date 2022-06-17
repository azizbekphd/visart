import { Link } from "react-router-dom";
import "./VideoItem.css"

function VideoItem ({data}) {
    const {id, author, title, thumbnail} = data;
    return <div className="video-item">
        <Link className="video-item__thumbnail-wrapper" to={`/p/${id}`}>
            <img src={thumbnail} className="video-preview__thumbnail"/>
        </Link>
        <div className="video-item__data">
            <Link to={`/p/${id}`}>
                <h4 className="video-item__title" title={title}>{title}</h4>
            </Link>
            <h5 className="video-item__author">{author.username}</h5>
        </div>
    </div>
}

export default VideoItem;