import { Venue } from "../../models/index.js"

class VenueSeeder {
  static async seed() {
    const venues = [
        { name: "Wood's Hill Farm" },
        { name: "Nautilus" },
        { name: "Drink" },
    ]

    for (const venue of venues) {
      await Venue.query().insert(venue)
    }
  }
}

export default VenueSeeder
