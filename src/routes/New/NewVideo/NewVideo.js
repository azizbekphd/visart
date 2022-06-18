import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import Center from "../../../components/Center/Center";
import LoadingAlert from "../../../components/LoadingAlert/LoadingAlert";
import Scaffold from "../../../components/Scaffold/Scaffold";
import TextInput from "../../../components/TextInput/TextInput";
import VideoPreview from "../../../components/VideoPreview/VideoPreview";
import UserContext from "../../../contexts/UserContext";
import apiRequest from "../../../utils/apiRequest";
import "./NewVideo.css";

function NewVideo() {
    const {getToken} = useContext(UserContext)

    const navigate = useNavigate()

    const [alertVisible, setAlertVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        "youtube_link": "",
    })

    const [preview, setPreview] = useState({
        "ok": null,
        "thumbnail": "",
        "title": ""
    })

    function handleData(e, key) {
        setData({
            ...data,
            [key]: e.target.value,
        })
        if(key==="youtube_link"){
            setPreview({})
        }
    }

    function handlePaste(e) {
        setIsLoading(true);
        apiRequest({
            path: "post/video_preview/",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            body: {
                "youtube_link": e.clipboardData.getData('Text'),
            },
        }).then(async (value)=>{
            setPreview(JSON.parse((await value.text()).replace("\\u00","%")))
        }).catch((reason)=>{
            console.log(reason)
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        apiRequest({
            path: "post/new/video/",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            body: {
                ...data,
                ...preview,
            },
        }).then((value)=>{
            if (value.ok && value.status===200){
                setAlertVisible(true);
            }
        }).catch((reason)=>{
            console.log(reason)
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    return <>
        <Scaffold title={"New video"}>
            <Center>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        type="url"
                        value={data.youtube_link}
                        onChange={(e) => { handleData(e, "youtube_link") }}
                        onPaste={handlePaste}
                        placeholder={"YouTube link"}
                        required={true}
                        // pattern={/https:\/\/((www\.youtube\.com\/watch\?v=[A-Za-z0-9_\-&=]*)|(youtu\.be\/[A-Za-z0-9_\-&=]*))/gm}
                    />
                    <VideoPreview
                        thumbnail={preview.thumbnail}
                        title={preview.title}/>
                    <button type="submit">
                        Publish
                    </button>
                </form>
            </Center>
            <Alert
                visible={alertVisible}
                setVisible={setAlertVisible}
                title={"Video has been sent"}
                message={"Video will be published after verification"}
                buttons={[{
                    title:"OK",
                    callback: ()=>{
                        navigate("/theater", {replace: true})
                    }
                }]} />
            <LoadingAlert visible={isLoading}/>
        </Scaffold>
    </>
}

export default NewVideo;