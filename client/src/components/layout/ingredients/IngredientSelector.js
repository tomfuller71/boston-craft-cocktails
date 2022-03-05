import React, { useEffect, useState } from "react"
import Select, { createFilter } from "react-select"

import Fetcher from "../../../services/Fetcher.js"

const filter = createFilter({ matchFrom: "start" })

const IngredientSelector = ({ handleIngredientSelect }) => {
  const [options, setOptions] = useState([])

  const getOptions = async () => {
    const response = await Fetcher.get("/api/v1/ingredients")
    if (response.ok) {
      const data = response.data.ingredients.map((ingredient) => { 
        return { value: ingredient.id, label: ingredient.name }
      })
      setOptions(data)
    }
  }

  useEffect(() => {
    getOptions()
  }, [])

  return (
      <Select
        options={options}
        isMulti
        onChange={handleIngredientSelect}
        filterOption={filter}
      />
  )
}

export default IngredientSelector