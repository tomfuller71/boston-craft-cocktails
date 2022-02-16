/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import VenueSeeder from "./seeders/VenueSeeder.js"
import IngredientSeeder from "./seeders/IngredientSeeder.js"
import CocktailSeeder from "./seeders/CocktailSeeder.js"

import dotenv from "dotenv"
dotenv.config()

class Seeder {
  static async seed() {
    await UserSeeder.seed()
    console.log("Seeded users!")

    await VenueSeeder.seed()
    console.log("Seeded venues!")

    await IngredientSeeder.seed()
    console.log("Seeded ingredients!")

    await CocktailSeeder.seed()
    console.log("Seeded cocktails!")

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder