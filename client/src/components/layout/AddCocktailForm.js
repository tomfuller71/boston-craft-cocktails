import React, { useState } from "react"
import { Redirect, withRouter } from "react-router-dom"
import Dropzone from "react-dropzone"

import ErrorList from "./ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const AddCocktailForm = ({ user, match }) => {
  const venueId = match.params.venueId
  const userId = user.id

  const defaultInput = { userId, venueId, name: "", image: {} }

  const [formInput, setFormInput] = useState(defaultInput)
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleInput = (event) => {
    const { name, value } = event.currentTarget
    setFormInput({ ...formInput, [name]: value })
  }

  const handleImageUpload = (acceptedImage) => {
    setFileName(acceptedImage[0].name)
    setFormInput({ ...formInput, image: acceptedImage[0] })
  }

  const addCocktail = async () => {
    const formData = new FormData()
    for (const key of Object.keys(formInput)) {
      formData.append(key, formInput[key])
    }

    try {
      const response = await fetch("/api/v1/cocktails", {
        method: "POST",
        headers: {
          Accept: "image/jpeg",
        },
        body: formData
      })

      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          throw new Error(`${response.status} (${response.statusText})`)
        }
      }
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addCocktail()
  }

  const clearForm = (event) => {
    event.preventDefault()
    setFormInput(defaultInput)
  }

  if (shouldRedirect) {
    return <Redirect push to={`/cocktails/?venueId=${venueId}`} />
  }

  return (
    <div className="cocktail-add-form">
      <h1>Add a New Cocktail</h1>

      <ErrorList errors={errors} />

      <form onSubmit={handleSubmit}>
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className="drop-zone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop your cocktail image, or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>
        <h5 className="cocktail-file-name">{fileName}</h5>
        <label>
          Name:
          <input type="text" name="name" value={formInput.name} onChange={handleInput} />
        </label>
        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
          <input className="button" type="button" value="Clear Form" onClick={clearForm} />
        </div>
      </form>
    </div>
  )
}

export default withRouter(AddCocktailForm)
