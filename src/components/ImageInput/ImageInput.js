import { useEffect, useState } from "react";
import "./ImageInput.css"

function ImageInput({ width, ...props }) {
    const [image, setImage] = useState()

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
                    if (event.target.files && event.target.files[0]) {
                        let img = event.target.files[0];
                        setImage(URL.createObjectURL(img));
                    }
                }}
                {...props}
            />
        </div>
    </div>
}

export default ImageInput;