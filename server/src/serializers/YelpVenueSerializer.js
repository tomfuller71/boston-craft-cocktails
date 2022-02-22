import allow from "./service/allow.js";

class YelpVenueSerializer {
  static getSummary(venue) {
    const serializedVenue = allow(venue, ["id", "name", "coordinates", "rating"])
    return {
      name: serializedVenue.name,
      lat: serializedVenue.coordinates.latitude,
      lng: serializedVenue.coordinates.longitude
    }
  }

  static serializeCollection(venues) {
    return venues.map(venue => this.getSummary(venue))
  }
}

export default YelpVenueSerializer