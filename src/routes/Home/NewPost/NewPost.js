import { useNavigate } from "react-router-dom";
import "./NewPost.css";

function NewPost() {
    const navigate = useNavigate()

    return <>
        <div className="new-post-wrapper">
            <h2 className="new-post-title">Select new post type</h2>
            <div className="new-post-types">
                <button className="new-post-type-wrapper" onClick={()=>{navigate("/new/video")}}>
                    <div className="new-post-type left">
                        <span className="material-icons-outlined icon">movie</span>
                        <h3>Video</h3>
                    </div>
                </button>
                <button className="new-post-type-wrapper" onClick={()=>{navigate("/new/image")}}>
                    <div className="new-post-type right">
                        <span className="material-icons-outlined icon">image</span>
                        <h3>Image</h3>
                    </div>
                </button>
            </div>
        </div>
    </>
}

export default NewPost;