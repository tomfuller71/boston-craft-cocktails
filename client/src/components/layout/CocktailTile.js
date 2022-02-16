import React from "react";
import { Link } from "react-router-dom";

const CocktailTile = ({ name, image, ingredients, venueName}) => {
    const ingredientsList = ingredients.map((ingredient) => {
        return (
            <li key={ingredient.id}>
                <Link
                    to={`/ingredients/${ingredient.id}`}>{ingredient.name}
                </Link>
            </li>
        )
    })

    return  (
        <div className="cocktail-tile callout cell small-6">
            <h3>{name} @ { venueName }</h3>
            <div className="grid-x grid-margin-x">
                <div className="cell small-3 cocktail-image">
                    <img src={image} />
                </div>
                <div className="cell small-3 cocktail-ingredients">
                    <ul className="vertical menu">{ingredientsList}</ul>
                </div>
            </div>
        </div>
    )
}

export default CocktailTile