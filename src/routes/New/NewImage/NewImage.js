import ImageInput from "../../../components/ImageInput/ImageInput";
import Scaffold from "../../../components/Scaffold/Scaffold";
import TextInput from "../../../components/TextInput/TextInput";
import "./NewImage.css";

function NewImage() {

    async function handleSubmit(event) {
        event.preventDefault()
        let form = event.target;
        let data = new FormData();
        data.append('file', form[0].files[0], Date.now().toString());
        data.append('title', form[1].value)

        let request = new XMLHttpRequest();
        request.open('POST', '/upload'); 

        // upload progress event
        request.upload.addEventListener('progress', function(e) {
            // upload progress as percentage
            let percent_completed = (e.loaded / e.total)*100;
            console.log(percent_completed);
        });

        // request finished event
        request.addEventListener('load', function(e) {
            // HTTP status message (200, 404 etc)
            console.log(request.status);

            // request.response holds response from the server
            console.log(request.response);
        });

        // send POST request to server
        request.send(data);
    }

    return <Scaffold title={"New image"}>
        <form onSubmit={handleSubmit}>
            <ImageInput required={true}/>
            <TextInput
                placeholder={"Caption"}
                required={true}
            />
            <button type="submit">
                Publish
            </button>
        </form>
    </Scaffold>
}

export default NewImage;