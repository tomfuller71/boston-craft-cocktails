import React, { useEffect, useState } from "react"
import { Redirect, withRouter, Link } from "react-router-dom"
import startCase from "lodash.startcase"

import ErrorList from "../ErrorList.js"
import Fetcher from "../../../services/Fetcher.js"
import DropAndPreviewImage from "../DropAndPreviewImage.js"
import IngredientSelector from "../ingredients/IngredientSelector.js"

const AddCocktailForm = ({ user, match }) => {
  const venueId = match.params.venueId
  const userId = user.id

  const defaultInput = { userId, venueId, name: "", image: {} }

  const [formInput, setFormInput] = useState(defaultInput)
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [previewURL, setPreviewURL] = useState(null)

  const [selectedComponentOptions, setSelectedComponentOptions] = useState([])

  const handleInput = (event) => {
    const { name, value } = event.currentTarget
    setFormInput({ ...formInput, [name]: value })
  }

  const handleImageUpload = (acceptedFiles) => {
    const image = acceptedFiles[0]
    const previewURL = URL.createObjectURL(image)
    setPreviewURL(previewURL)
    setFormInput({ ...formInput, image })
  }

  const handleIngredientSelect = (options) => {
    setSelectedComponentOptions(options)
  }


  const addCocktail = async () => {
    const cocktailComponents = selectedComponentOptions.map((option) => { 
      return { ingredientId: option.value }
    })

    const data = {
      ...formInput,
      name: startCase(formInput.name),
      cocktailComponents: JSON.stringify(cocktailComponents)
    }
    
    const formData = new FormData()
    for (const key of Object.keys(data)) {
      formData.append(key, data[key])
    }

    const response = await Fetcher.post(
      "/api/v1/cocktails",
      formData,
      { bodyJSON: false, acceptImage: true }  
    )

    if (response.ok) {
      return setShouldRedirect(true)
    }
    setErrors(response.validationErrors)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addCocktail()
  }

  const clearForm = (event) => {
    event.preventDefault()
    setFormInput(defaultInput)
    setPreviewURL(null)
    setErrors([])
  }

  const userAddedIngredients = selectedComponentOptions.map((option) => {
    return (
      <li key={option.value}>
        <Link to={`/ingredients/${option.value}`}>{option.label}</Link>
      </li>
    )
  })

  if (shouldRedirect) {
    return <Redirect push to={`/cocktails/?venueId=${venueId}`} />
  }

  return (
    <div className="grid-x grid-margin-x">
      <div className="cell">
        <h1>Add a New Cocktail</h1>
      </div>
      <div className="cell shrink">
        <DropAndPreviewImage
          previewURL={previewURL}
          handleDrop={handleImageUpload}
          zoneText={"Drag and drop your cocktail image, or click to upload"}
        />
      </div>
      
      <div className="cell small-4 medium-shrink callout">
          <h5>Ingredients:</h5>
          <ul className="ingredient-list vertical menu">
            {userAddedIngredients}
          </ul>
      </div>

      <div className="add-cocktail-form cell callout">
        <form onSubmit={handleSubmit}>
          <ErrorList errors={errors} />
          <label>
            Name:
            <input type="text" name="name" value={formInput.name} onChange={handleInput} />
          </label>
            Select Cocktail Ingredients:
            <IngredientSelector handleIngredientSelect={handleIngredientSelect} />
          <div className="button-group">
            <input className="button" type="submit" value="Submit" />
            <input className="button" type="button" value="Clear Form" onClick={clearForm} />
          </div>
        </form>
      </div>
    </div>
  )
}


export default withRouter(AddCocktailForm)
