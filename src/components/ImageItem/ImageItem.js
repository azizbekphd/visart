import { Link } from "react-router-dom";
import "./ImageItem.css"

function ImageItem({data}) {
    const {id, author, title, thumbnail, pubDate} = data;
    return <div className="image-item">
        <Link className="image-item__thumbnail-wrapper" to={`/p/${id}`}>
            <img src={thumbnail} className="image-preview__thumbnail"/>
        </Link>
        <div className="image-item__data">
            <Link to={`/p/${id}`}>
                <h4 className="image-item__title" title={title}>{title}</h4>
            </Link>
            <div className="image-item__secondary-data">
                <h5 className="image-item__author">{author.username}</h5>
                <h6 className="image-item__pubDate">{pubDate}</h6>
            </div>
        </div>
    </div>
}

export default ImageItem;