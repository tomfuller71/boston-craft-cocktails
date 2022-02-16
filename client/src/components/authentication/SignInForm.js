import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import config from "../../config"
import FormError from "../layout/FormError.js"
import Fetcher from "../../services/Fetcher.js"

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})

  const validInput = (payload) => {
    const errors = getFormErrors(payload)
		if (Object.keys(errors).length > 0) {
			setErrors(errors)
			return false
		}
		return true
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (!validInput(userPayload)) return

    const response = await Fetcher.post(
			"/api/v1/user-sessions",
			 userPayload,
			{ validationErrorParser: serializeValidationErrors }
		)

    if (response.ok) {
        setShouldRedirect(true)
    } else {
        setErrors(response.validationErrors)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/"
  }

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <form>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Sign In" />
        </div>
      </form>
    </div>
  )
}

function serializeValidationErrors(errors) {
  let serializedErrors = {}

  Object.keys(errors).forEach((key) => {
    serializedErrors = {
      ...serializedErrors,
      [key]: errors[key],
    }
  })

  return serializedErrors;
}

function getFormErrors(payload) {
  const { email, password } = payload
  const emailRegexp = config.validation.email.regexp

  let errors = {}

  if (!email.match(emailRegexp)) {
    errors.email = "is invalid"
  }

  if (password.trim() == "") {
    errors.password = "is required"
  }

  return errors
}

export default SignInForm