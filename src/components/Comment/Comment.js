import "./Comment.css"

function Comment({text, author, pubDate}) {
    return <div className="comment">
        <div className="comment-header">
            <h5 className="comment__author">{author}</h5>
            <h6 className="comment__pubDate">{pubDate}</h6>
        </div>
        <div className="comment__text">{text}</div>
    </div>
}

export default Comment;