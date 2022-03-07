import React, { useEffect, useState } from "react"
import Select, { createFilter } from "react-select"

import Fetcher from "../../../services/Fetcher.js"

const filter = createFilter({ matchFrom: "start" })

const CocktailSearchSelector = ({ handleCocktailSelect }) => {
  const [options, setOptions] = useState([])
  const [input, setInput] = useState("")

  const getOptions = async () => {
    const response = await Fetcher.get("/api/v1/cocktails/options")
    if (response.ok) {
      setOptions(response.data.options)
    }
  }

  const handleInput = (input) => {
    setInput(input)
  }

  const handleChange = (option) => {
    setInput("")
    handleCocktailSelect(option.value)
  }

  useEffect(() => {
    getOptions()
  }, [])

  return (
    <div>
      <h5>Search for cocktails</h5>
      <Select
        options={options}
        value={null}
        onInputChange={handleInput}
        inputValue={input}
        onChange={handleChange}
        filterOption={filter}
        placeholder="Input to filter suggestions ..."
        isClearable={true}
        escapeClearsValue={true}
      />
    </div>
  )
}

export default CocktailSearchSelector