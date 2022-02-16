import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"

import FormError from "../layout/FormError"
import config from "../../config"
import Fetcher from "../../services/Fetcher.js"

const SignUpForm = () => {
  const [userPayload, setUserPayload] = useState({
		name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  })

  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
			"/api/v1/users",
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
    <div className="grid-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
				<div>
          <label>
            Name
            <input
							type="text"
							name="name"
							value={userPayload.name}
							onChange={onInputChange}
						/>
            <FormError error={errors.name} />
          </label>
        </div>
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
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
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
        [key]: `${_.startCase(key)} already taken.`,
      }
    })

    return serializedErrors;
}

function getFormErrors(payload) {
	const { email, password, passwordConfirmation } = payload
	const emailRegexp = config.validation.email.regexp

	let errors = {}

	if (!email.match(emailRegexp)) {
		errors.email = "is invalid"
	}

	if (password.trim() == "") {
		errors.password = "is required"
	}

	if (passwordConfirmation.trim() === "") {
		errors.passwordConfirmation = "is required"
	} else if (passwordConfirmation !== password) {
			errors.passwordConfirmation = "does not match password"
	}

	return errors
}

export default SignUpForm