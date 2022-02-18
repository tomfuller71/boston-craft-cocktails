import React, { useEffect, useState } from "react"

import Fetcher from "../../services/Fetcher.js"

const IngredientShow = (props) => {
		const { id } = props.match.params

    const [ingredient, setIngredient] = useState({
      name: "",
      description: "",
      type: "",
      imageUrl: "",
    })

    const getIngredient = async () => {
      const response = await Fetcher.get(`/api/v1/ingredients/${id}`)
      if (response.ok) {
        return setIngredient(response.data.ingredient)
      }
    }

    useEffect(() => {
      getIngredient()
    }, [])

    return (
      <div className="ingredient-tile callout cell small-6">
        <h3>
          {ingredient.name} {ingredient.type}
        </h3>
        <div className="grid-x grid-margin-x">
          <div className="cell small-3 cocktail-image">
            <img src={ingredient.imageUrl} />
          </div>
          <div className="cell small-6 cocktail-ingredients">
            <p>{ingredient.description}</p>
          </div>
        </div>
      </div>
    )
}

export default IngredientShow