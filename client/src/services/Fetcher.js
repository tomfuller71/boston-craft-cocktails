import startCase from "lodash.startcase"

/**
 * A helper class for fetch api:
 * - static method `.get`
 * - static method `.post` 
 */
class Fetcher {
  /**
   *
   * @param {string} route The domain relative url of the post route
   * @param {object} body The object to be stringified in the fetch request
   * @param {object=} options Options for configuring the post request:
   * - `method`: default `"POST"`
   * - `validationStatus`: the validation errors status code, default 422
   * - `validationErrorParser`: parsing function used on `validationErrors' - defaults to parse "objection" validation errors
   * - bodyJSON: header Content-Type - default true ("application/json")
   * - acceptImage: default false - header Accept:"image/jpeg" added if true 
   * @returns A response object with properties of :
   * - `ok`: true if successfully inserted
   * - `data`: the post response body
   * - `validationErrors`: the parsed json validation errors
   */
  static async post(
    route,
    body,
    { 
      method = "POST",
      validationStatus = 422,
      validationErrorParser = this.parseObjectionValidationErrors,
      bodyJSON = true,
      acceptImage = false,
    } = {} ) {
      
      const response = {
        ok: false,
        data: null,
        validationErrors: {},
      }

      let headers = {}
      if (bodyJSON) {
        headers["Content-Type"] = "application/json"
      }

      if (acceptImage) {
        headers["Accept"] = "image/jpeg"
      }
      
    try {
      const fetchOptions = {
        method,
        headers: new Headers(headers),
        body: bodyJSON ? JSON.stringify(body) : body,
      }
      
      const fetchResponse = await fetch(route, fetchOptions)

      if (!fetchResponse.ok) {
        if (fetchResponse.status === validationStatus) {
          const body = await fetchResponse.json()
          response.validationErrors = validationErrorParser(body.errors)
        }
        else {
          const errorMessage = `${fetchResponse.status} (${fetchResponse.statusText})`
          throw Error(errorMessage)
        }
      } else {
        response.ok = true
        response.data = await fetchResponse.json()
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
    return response
  }
  /**
   *
   * @param {string} route The domain relative url of the post route
   * @returns A response object with properties of :
   * - `ok`: true if successfully inserted
   * - `data`: the post response body
   */
  static async get(route) {
    const response = { ok: false,  data: null }

    try {
      const fetchResponse = await fetch(route)

      if (fetchResponse.ok) {
        response.ok = true
        response.data = await fetchResponse.json()
      } else {
        throw Error(`${fetchResponse.status} (${fetchResponse.statusText})`)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }

    return response
  }

    // Alt version of error parser that doesn't mutate key case - may then use for <input> specific errors rather than have all in callout in one block
    static parseObjectionValidationErrors(errors) {
      let serializedErrors = {};
      for (const key of Object.keys(errors)) {
        errors[key].forEach((error) => {
          serializedErrors[key] = `${startCase(key)} ${error.message}`;
        });
      }
      return serializedErrors;
    }
}

export default Fetcher