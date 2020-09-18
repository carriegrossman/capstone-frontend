import React, { useState } from "react";

const ImageUpload = ({ currentShopID, setShopImages }) => {
    const [image, setImage] = useState(undefined);

    const [caption, setCaption] = useState(undefined)

    const handleChange = (evt) => {
        console.log(evt.target.files);
        console.log(typeof (evt.target.files[0]));
        setImage(evt.target.files[0]);

    };


    const handleCaptionChange = (evt) => {
        evt.preventDefault()
        setCaption(evt.target.value)
    }

    const handleUpload = (evt) => {
        evt.preventDefault()
        var reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = async function (evt) {
            console.log(evt.target.result)


            let imagefetch = await fetch("/uploadphoto", {
                method: "POST",
                body: JSON.stringify({ "base64": evt.target.result, "coffeeshop_id": Number(currentShopID), "caption": caption, "imgname": image.name }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let imagefetchAsJSON = await imagefetch.json()
            setShopImages(imagefetchAsJSON)
            // console.log(imagefetchAsJSON)
        }
    }

    console.log(currentShopID)
    return (
        <div>
            {/* {imgSRC &&  <img src={imgSRC[1].img} alt="working"/>} */}
            <form onSubmit={handleUpload}>
                <div className="field">
                    <label className="label">Select Photo to Upload</label>
                    <div className="control">
                        <input className="input" type="file" onChange={handleChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Caption</label>
                    <div className="control">
                        <input className="input" type="text" id="caption" name="caption" placeholder="Enter Caption Here" required onChange={handleCaptionChange} />
                    </div>
                </div>
                <div className="field">
                < button className="button" type="submit" onClick={handleUpload}>UPLOAD</button>
                </div>
            </form>

        </div>)

}

export default ImageUpload;
