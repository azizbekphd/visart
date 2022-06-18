import { useContext, useEffect, useState } from "react";
import Center from "../../../components/Center/Center";
import Loader from "../../../components/Loader/Loader";
import VideoItem from "../../../components/VideoItem/VideoItem";
import UserContext from "../../../contexts/UserContext";
import apiRequest from "../../../utils/apiRequest";
import "./Theater.css";

function Theater() {

    const { getToken } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [videos, setVideos] = useState([])

    async function loadVideos() {
        setIsLoading(true)
        await apiRequest({
            path: "/post/theater/",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            body: {

            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((value) => {
                    setVideos(value)
                })
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        loadVideos();
    }, [])

    return <div className="theater-wrapper">
        {videos
            ? <>
                {videos.map((item, index) => {
                    return <VideoItem data={item} key={item.id} />
                })}
            </> :
            <Center style={{ height: "100%" }}>
                {
                    isLoading
                        ? <Loader />
                        : <form>
                            <h3>Unknown error occured</h3>
                            <button onClick={loadVideos}>Retry</button>
                        </form>}
            </Center>
        }
    </div>
}

export default Theater;