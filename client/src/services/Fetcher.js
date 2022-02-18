import _ from "lodash"

import translateServerErrors from "./translateServerErrors.js"

/**
 * A helper class for fetch api:
 * - static method `.get`
 * - static method `.post` 
 */
class Fetcher {
  /**
   *
   * @param {string} route The domain relative url of the post route
   * @param {object} body The date object to be stringified in the fetch request
   * @param {object=} options Options for configuring the post request:
   * - `validationStatus`: the validation errors status code, default 422
   * - `validationErrorParser`: parsing function used on `validationErrors' - defaults to parse "objection" validation errors
   * @returns A response object with properties of :
   * - `ok`: true if successfully inserted
   * - `data`: the post response body
   * - `validationErrors`: the parsed json validation errors
   */
  static async post(
    route,
    body,
    { 
      validationStatus = 422,
      validationErrorParser = translateServerErrors,
      contentType = "json"
    } = {} ) {

    const response = {
      ok: false,
      data: null,
      validationErrors: {},
    }

    try {
      const fetchOptions = {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(body),
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
          serializedErrors[key] = `${_.startCase(key)} ${error.message}`;
        });
      }
      return serializedErrors;
    }
}

export default Fetcher