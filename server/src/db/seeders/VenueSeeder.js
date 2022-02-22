import { Venue } from "../../models/index.js"

class VenueSeeder {
  static async seed() {
    const venues = [
      { 
        name: "Wood's Hill Farm",
        lat: 42.352719596552625, 
        lng: -71.0423035444137,
      },
      { 
        name: "Nautilus",
        lat: 42.35278302638716, 
        lng: -71.04222844256546,
      },
      { 
        name: "Drink",
        lat: 42.35137860666245, 
        lng: -71.04859067322005,
      },

      { 
        name: "Carrie Nation Cocktail Club",
        lat: 42.35838001446493, 
        lng: -71.06163111091274,
      },
      {
        name: "Parla",
        lat: 42.363583242869886,
        lng: -71.05516098760734
      }
    ]

    for (const venue of venues) {
      await Venue.query().insert(venue)
    }
  }
}

export default VenueSeeder
