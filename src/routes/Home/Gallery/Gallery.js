import { useContext, useEffect, useState } from "react";
import Center from "../../../components/Center/Center";
import ImageItem from "../../../components/ImageItem/ImageItem";
import Loader from "../../../components/Loader/Loader";
import UserContext from "../../../contexts/UserContext";
import apiRequest from "../../../utils/apiRequest";
import getTimezone from "../../../utils/getTimezone";
import "./Gallery.css";

function Gallery() {
    
    const { getToken } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([])

    async function loadImages() {
        setIsLoading(true)
        await apiRequest({
            path: "post/gallery/",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getToken()}`
            },
            body: {
                timezone: getTimezone(),
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((value) => {
                    setImages(value)
                })
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        loadImages();
    }, [])

    return <div className="gallery-wrapper">
        {images
            ? <>
                {images.map((item, index) => {
                    return <ImageItem data={item} key={item.id} />
                })}
            </> :
            <Center style={{ height: "100%" }}>
                {
                    isLoading
                        ? <Loader />
                        : <form>
                            <h3>Unknown error occured</h3>
                            <button onClick={loadImages}>Retry</button>
                        </form>}
            </Center>
        }
    </div>
}

export default Gallery;