import React from "react";
import Dropzone from "react-dropzone"

const DropAndPreviewImage =({ previewURL, handleDrop, zoneText }) => { 
  return (
    <div className="dropped-image cell callout">
      {
        !previewURL && 
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className="drop-zone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>{zoneText}</p>
                </div>
              </section>
            )}
          </Dropzone>
      }
      {
      previewURL &&
        <div>
            <img src={previewURL} alt="uploaded image"/>  
        </div>
      }
    </div>
  )
}

export default DropAndPreviewImage