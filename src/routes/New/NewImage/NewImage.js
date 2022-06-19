import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import ImageInput from "../../../components/ImageInput/ImageInput";
import LoadingAlert from "../../../components/LoadingAlert/LoadingAlert";
import Scaffold from "../../../components/Scaffold/Scaffold";
import TextInput from "../../../components/TextInput/TextInput";
import UserContext from "../../../contexts/UserContext";
import { api } from "../../../utils/apiRequest";
import "./NewImage.css";

function NewImage() {
    const {getToken} = useContext(UserContext)
    const resetButton = useRef()

    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const navigate = useNavigate()
    const [img, setImg] = useState()

    var xhr = new XMLHttpRequest();

    async function handleSubmit(event) {
        event.preventDefault()
        let form = event.target
        var data = new FormData();
        data.append("file", form[0].files[0], `${Date.now()}.${form[0].value.split(".")[form[0].value.split(".").length-1]}`);
        data.append("title", form[1].value);

        xhr.withCredentials = true;

        xhr.upload.addEventListener("progress", (e)=>{
            setProgress((e.loaded/e.total)*100)
        })

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                setIsLoading(false);
                setAlertVisible(true);
            }
        });

        xhr.open("POST", api + "post/new/image/");
        xhr.setRequestHeader("Authorization", `Bearer ${getToken()}`);
        setIsLoading(true);
        xhr.send(data);
    }

    return <Scaffold title={"New image"}>
        <form onSubmit={handleSubmit}>
            <ImageInput required={true} img={img}/>
            <TextInput
                placeholder={"Caption"}
                required={true}
            />
            <button type="submit">
                Publish
            </button>
            <button type="reset" hidden={true} ref={resetButton}></button>
        </form>
        <LoadingAlert visible={isLoading} progress={progress} cancelAction={()=>{
            xhr.abort()
            setProgress(null)
            setIsLoading(false)
        }}/>
        <Alert
            title={"Image sent"}
            message={"The image will be published after verification"}
            visible={alertVisible}
            setVisible={setAlertVisible}
            buttons={[
                {
                    title: "Upload more",
                    callback: ()=>{
                        resetButton.current.click()
                        setImg(null)
                    },
                },
                {
                    title: "OK",
                    callback: ()=>{
                        navigate("/gallery", {replace: true})
                    },
                },
            ]}
        />
    </Scaffold>
}

export default NewImage;