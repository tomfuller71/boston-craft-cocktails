import React, { useEffect, useState } from "react"
import { Redirect, withRouter } from "react-router-dom"

import ErrorList from "./ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"
import DropAndPreviewImage from "./DropAndPreviewImage.js"
import Fetcher from "../../services/Fetcher.js"

const AddCocktailForm = ({ user, match }) => {
  const venueId = match.params.venueId
  const userId = user.id

  const defaultInput = { userId, venueId, name: "", image: {} }

  const [formInput, setFormInput] = useState(defaultInput)
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [previewURL, setPreviewURL] = useState(null)

  const [ingredientsList, setIngredientsList] = useState([])
  const [matchingIngredients, setMatchingIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [ingredientId, setIngredientId] = useState("")

  const getIngredients = async () => {
    const response = await Fetcher.get("/api/v1/ingredients")
    if (response.ok) {
      setIngredientsList(response.data.ingredients)
    }
  }

  useEffect(() => {
    getIngredients()
  }, [])

  const handleSearchInput = (event) => {
    const input = event.target.value
    setSearchInput(input)

    const matching = ingredientsList.filter(ingredient => {
      const regex = RegExp(`^${input}`,"i")
      return regex.test(ingredient.name.toLowerCase())
    })
    setMatchingIngredients(matching)
  }

  const handleSelectIngredient = (event) => {
    setIngredientId(event.target.value)
  }

  const handleAddIngredient = (event) => {
    event.preventDefault()

    const selected = ingredientsList.find((ingredient) => {
      return ingredient.id === ingredientId
    })

    const alreadyAdded = selectedIngredients.some((ingredient) => {
      return ingredient.id === selected.id
    })

    if (!alreadyAdded) {
      setSelectedIngredients([ ...selectedIngredients, selected])
      setSearchInput("")
      setMatchingIngredients([])
    }
  }

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

  const addCocktail = async () => {
    let ingredientIds = []
    if (selectedIngredients) {
      ingredientIds = selectedIngredients.map(e => e.id)
    }

    const data = {
      ...formInput,
       ingredientIds: ingredientIds
    }
    console.log(data)

    const formData = new FormData()
    for (const key of Object.keys(data)) {
      formData.append(key, data[key])
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
    setPreviewURL(null)
  }

  const ingredientOptions = matchingIngredients.map((ingredient) => {
    return (
      <option key={ingredient.id} value={ingredient.id}>
        {ingredient.name}
      </option>
    )
  })

  const userAddedIngredients = selectedIngredients.map((addedIng) => {
    return <li key={addedIng.id}>{addedIng.name}</li>
  })

  if (shouldRedirect) {
    return <Redirect push to={`/cocktails/?venueId=${venueId}`} />
  }

  return (
    <div>
      <h1>Add a New Cocktail</h1>
      <form onSubmit={handleSubmit}>
        <DropAndPreviewImage
          previewURL={previewURL}
          handleDrop={handleImageUpload}
          zoneText={"Drag and drop your cocktail image, or click to upload"}
        />
        <ul>
          {userAddedIngredients}
        </ul>
        <ErrorList errors={errors} />
        <label>
          Name:
          <input type="text" name="name" value={formInput.name} onChange={handleInput} />
        </label>
        <label>
          Select Cocktail Ingredients:
          <input type="text" name="search" value={searchInput} onChange={handleSearchInput} placeholder="Start typing to get suggestions"/>
        </label>
        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
          <input className="button" type="button" value="Clear Form" onClick={clearForm} />
        </div>
      </form>
      <form onSubmit={handleAddIngredient}>
        <label>
          <select value={ingredientId} onChange={handleSelectIngredient}>
            <option key="emptyValue" value={""}>
              Select from available matching ingredients
            </option>
            {ingredientOptions}
          </select>
        </label>
        <input className = "button" type="submit" value="Add" />
      </form>
    </div>
  )
}

export default withRouter(AddCocktailForm)
