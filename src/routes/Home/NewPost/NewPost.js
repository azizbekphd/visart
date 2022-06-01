import "./NewPost.css";

function NewPost() {
    return <>
        <div className="new-post-wrapper">
            <h2>Choose new post type</h2>
            <div className="new-post-types">
                <button className="new-post-type">
                    <span>Video</span>
                </button>
                <button className="new-post-type">
                    <span>Image</span>
                </button>
            </div>
        </div>
    </>
}

export default NewPost;