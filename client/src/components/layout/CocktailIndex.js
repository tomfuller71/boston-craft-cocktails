import React, { useState, useEffect } from "react"

import CocktailTile from "./CocktailTile.js"
import Fetcher from "../../services/Fetcher.js"


const CocktailIndex = (props) => {
    const [cocktails, setCocktails] = useState([])

    const getCocktails = async () => {
        const response = await Fetcher.get("/api/v1/cocktails")
        if (response.ok) {
            return setCocktails(response.data.cocktails)
        }
    }
        
    useEffect(() => { getCocktails() }, [])

    const cocktailList = cocktails.map((cocktail) => {
        return <CocktailTile key={cocktail.id} {...cocktail} />
    })

    return (
        <div className="cocktail-index">
            {cocktailList}
        </div>
    )
}

export default CocktailIndex