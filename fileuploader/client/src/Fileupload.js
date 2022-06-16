import axios from "axios";
import { useState } from "react";
import React from "react";

const Fileupload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("avatar", file);
    // formData.append("fileName", fileName);
    try {
      const res = await axios.post("http://localhost:3000/upload", formData);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  console.log(file, fileName);
  return (
    <div className="App">
      <input type="file"  onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};
export default Fileupload;
