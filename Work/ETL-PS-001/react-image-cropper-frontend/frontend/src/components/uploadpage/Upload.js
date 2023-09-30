import React, { useState } from "react";
import ImageCropper from "../ImageCropper/index";
import Axios from 'axios';
import test from '../ImageCropper/test.png';
import "../uploadpage/upload.css"
import Header from '../NavBar';
function Upload() {
  const [imageToCrop, setImageToCrop] = useState('');
  const [croppedImage, setCroppedImage] = useState();
  const[name,setName]=useState('');

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;

        setImageToCrop(image);
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const addImage=()=>{
    Axios.post('http://localhost:6969/add',{name,croppedImage});
    setTimeout("location.reload(true);",5000);
    alert('uploaded refreshing in 5 secs...');
  };
  return (
    <div class="container">
    <div>
      <Header/>
      </div>
      <div class="class2">
      <div class="row">
        <div class="col-md-12">
             
            <div class="dropzone-wrapper">
              <div class="dropzone-desc">
                <p>Choose an image file or drag it here.</p>
              </div>
      <input type="file" name="img_logo" class="dropzone" accept="image/*" onChange={onUploadFile} />
     </div>
     </div>
     </div>
     </div>
     <div class="class3">
      <div className="container1" >
        <h2>Original Image</h2>
        <div id="img1">
        <ImageCropper 
          imageToCrop={imageToCrop}
          onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
        /></div></div>
        <div className="container2">
      {croppedImage  (
        <div>
          <h2>Cropped Image</h2>
          <img alt="Cropped Img" src={croppedImage} className="img2"/><br/>
          <label className="label1">Name </label>
          <div>
        <input type='text' onChange={(e)=>{setName(e.target.value)}}/><br/><br/>
        <button className="btn" onClick={addImage} >Submit</button>
        </div></div>
      )}
      </div>
      </div>
   </div>
    
  )
      }

export default Upload;

//praveen,vikas
