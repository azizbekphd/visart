import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Center from "../../components/Center/Center";
import Comment from "../../components/Comment/Comment";
import Loader from "../../components/Loader/Loader";
import Scaffold from "../../components/Scaffold/Scaffold";
import SnackBar from "../../components/SnackBar/SnackBar";
import TextInput from "../../components/TextInput/TextInput";
import UserContext from "../../contexts/UserContext";
import apiRequest from "../../utils/apiRequest";
import "./PostDetails.css"

function PostDetails(props) {
    const { id } = useParams()
    const { getToken } = useContext(UserContext)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState()
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
            path: `post/details/${id}`,
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
                timezone: (new Date()).getTimezoneOffset() / 60,
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
                timezone: (new Date()).getTimezoneOffset() / 60,
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

    return <Scaffold
        title={data.author.username}
        titleAction={() => {
            navigate(`u/${data.author.username}`)
        }} >
        {data.type
            ? <div className="post-details-content">
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
                    webkitallowfullscreen="webkitallowfullscreen"></iframe>
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