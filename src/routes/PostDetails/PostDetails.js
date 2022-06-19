import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Center from "../../components/Center/Center";
import Comment from "../../components/Comment/Comment";
import Loader from "../../components/Loader/Loader";
import Scaffold from "../../components/Scaffold/Scaffold";
import SnackBar from "../../components/SnackBar/SnackBar";
import TextInput from "../../components/TextInput/TextInput";
import UserContext from "../../contexts/UserContext";
import apiRequest from "../../utils/apiRequest";
import "./PostDetails.css";
import { MapInteractionCSS } from 'react-map-interaction';
import getTimezone from "../../utils/getTimezone";

function PostDetails(props) {
    const { id } = useParams()
    const { getToken } = useContext(UserContext)
    const navigate = useNavigate()
    const imageWrapper = useRef()
    const image = useRef()

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState()
    const [aspectRatio, setAspectRatio] = useState("1/1")
    const [initialScale, setInitialScale] = useState(1)
    const [imageViewerValue, setImageViewerValue] = useState({
        scale: 1,
        translation: {x: 0, y: 0}
    })
    const [data, setData] = useState({
        ok: true,
        type: null,
        title: "",
        source: "",
        stats: {
            views: 0,
            likes: 0,
            dislikes: 0,
            liked: null,
            comments: []
        },
        author: {
            id: null,
            username: ""
        }
    })
    const [comments, setComments] = useState(null)
    const [comment, setComment] = useState("")

    const loadData = useCallback(async () => {
        setIsLoading(true);
        await apiRequest({
            path: `post/details/${id}/`,
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        }).then(async (response) => {
            if (response.ok) {
                setData(await response.json())
            } else {
                console.log(await response.text())
                setData({
                    ...data,
                    ok: false,
                })
            }
        }).catch((e) => {
            console.log(e)
            setData({
                ...data,
                ok: false,
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }, [data, getToken, id])

    function share() {
        // navigator.share({
        //     title: `${data.title} - ${data.author.username}`,
        //     text: `Take a look at "${data.title}" - ${data.author.username} on visart`,
        //     url: document.location.href,
        // })
        navigator.clipboard.writeText(document.location.href)
            .then((_) => {
                setMessage("Link copied to clipboard")
                setTimeout(() => {
                    setMessage(null)
                }, 3000);
            })
    }

    async function setReaction(reaction) {
        if (data.stats.liked === reaction) {
            reaction = null;
        }
        await apiRequest({
            path: `post/react/${id}/`,
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            body: {
                reaction: reaction,
            }
        }).then(async (response) => {
            setData({
                ...data,
                stats: await response.json(),
            })
        }).catch((e) => {
            console.log(e)
        })
    }

    async function loadComments() {
        await apiRequest({
            path: `post/get_comments/${id}/`,
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            method: "POST",
            body: {
                timezone: getTimezone(),
            }
        }).then(async (response) => {
            if (response.ok) {
                let c = await response.json()
                setComments(c)
            }
        }).catch((e) => {
            console.log(e)
        }).finally(() => {

        })
    }

    useEffect(() => {
        loadData()
        loadComments()
        window.onresize = handleResize;
    }, [])

    async function leaveComment(event){
        event.preventDefault()
        await apiRequest({
            path: `post/leave_comment/${id}/`,
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            method: "POST",
            body: {
                timezone: getTimezone(),
                text: comment,
            }
        }).then(async (response) => {
            if (response.ok) {
                let c = await response.json()
                setComments(c)
                setComment("")
            }
        }).catch((e) => {
            console.log(e)
        }).finally(() => {

        })
    }

    function handleImageViewer(value){
        if (value.scale <= initialScale) {
            setImageViewerValue({
                scale: 1,
                translation: {x: 0, y: 0}
            })
        }
        let newValue = {
            scale: value.scale,
            translation: value.translation,
        }
        setImageViewerValue(newValue)
    }

    function handleResize(e){
        console.log(imageWrapper.current.clientWidth, image.current.clientWidth)
        setAspectRatio(`${image.current.clientWidth} / ${image.current.clientHeight}`)
        let initScale = imageWrapper.current.clientWidth / image.current.clientWidth;
        setInitialScale(initScale)
        setImageViewerValue({
            translation: {x: 0, y: 0},
            scale: initScale,
        })
    }

    return <Scaffold
        title={data.author.username}
        titleAction={() => {
            navigate(`u/${data.author.username}`)
        }} >
        {data.type
            ? <div className="post-details-content">
                {data.type === "video" ?
                    <iframe
                        className="youtube_video"
                        src={`${data.source}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen="allowfullscreen"
                        mozallowfullscreen="mozallowfullscreen"
                        msallowfullscreen="msallowfullscreen"
                        oallowfullscreen="oallowfullscreen"
                        webkitallowfullscreen="webkitallowfullscreen"></iframe>:
                    <div
                        className="post-image__wrapper"
                        ref={imageWrapper}
                        style={{
                            aspectRatio: aspectRatio,
                        }}
                    >
                        <MapInteractionCSS
                            value={imageViewerValue}
                            onChange={handleImageViewer}
                        >
                            <img
                                ref={image}
                                src={data.source}
                                className="post-image"
                                onLoad={handleResize}
                                onDoubleClick={()=>{
                                    if (imageViewerValue.scale != initialScale ||
                                        imageViewerValue.translation.x != 0 ||
                                        imageViewerValue.translation.y != 0) {
                                            setImageViewerValue({
                                                translation: {x: 0, y: 0},
                                                scale: initialScale,
                                            })
                                        }
                                }}
                            />
                        </MapInteractionCSS>
                    </div>}
                <div className="post-details__data">
                    <h3 className="post-details__title">{data.title}</h3>
                    <h5 className="post-details__views">{data.stats.views} views</h5>
                    <div className="post-details__buttons">
                        <button className="post-details__button" onClick={() => { setReaction(true) }}>
                            <span className={data.stats.liked ? "material-icons" : "material-icons-outlined"}>thumb_up</span>
                            <span>{data.stats.likes}</span>
                        </button>
                        <button className="post-details__button" onClick={() => { setReaction(false) }}>
                            <span className={data.stats.liked === false ? "material-icons" : "material-icons-outlined"}>thumb_down</span>
                            <span>{data.stats.dislikes}</span>
                        </button>
                        <button className="post-details__button" onClick={share}>
                            <span className="material-icons-outlined">share</span>
                        </button>
                    </div>
                    <div className="post-details__comments-wrapper">
                        <div className="post-details__comments">
                            <h3>Comments</h3>
                            <form className="post-details__new_comment" onSubmit={leaveComment}>
                                <TextInput
                                    placeholder={"Leave a comment..."}
                                    maxLength={500}
                                    multiline={true}
                                    required={true}
                                    value={comment}
                                    onChange={(e)=>{
                                        setComment(e.target.value)
                                    }}
                                />
                                <button type="submit">Post</button>
                            </form>
                            {comments && comments.length != 0
                                ?
                                comments.map((comment) => {
                                    return <Comment {...comment} key={comment.id}/>
                                })
                                : <Center>{comments === null ? <Loader /> : <h4>No comments yet</h4>}</Center>
                            }
                        </div>
                    </div>
                </div>
                <SnackBar message={message} />
            </div>
            : <Center>{
                isLoading ?
                    <Loader /> :
                    <form>
                        <h3>Unknown error occured</h3>
                        <button onClick={loadData}>Retry</button>
                    </form>
            }</Center>
        }
    </Scaffold>
}

export default PostDetails;