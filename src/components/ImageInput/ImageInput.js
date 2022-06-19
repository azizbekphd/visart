import { useEffect, useState } from "react";
import "./ImageInput.css"

function ImageInput({ width, img, ...props }) {
    const [image, setImage] = useState(img)

    useEffect(()=>{
        setImage(img)
    }, [img])

    return <div className="image-input-wrapper">
        <div
            className={["image-input__visual", image ? "" : "empty"].join(" ")}
            style={{
                backgroundImage: `url(${image ?? process.env.PUBLIC_URL + "/img/upload.svg"})`,
                width: width ?? "90vmin",
            }}>
            <input
                type="file"
                className="image-input"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(event) => {
                    console.log("change", event)
                    if (event.target.files && event.target.files[0]) {
                        let img = event.target.files[0];
                        setImage(URL.createObjectURL(img));
                    }
                    if (!event.target.value) {
                        setImage(null);
                    }
                }}
                onInput={(event)=>{
                    console.log("input", event)
                }}
                onReset={(event)=>{
                    console.log("reset", event)
                }}
                {...props}
            />
        </div>
    </div>
}

export default ImageInput;