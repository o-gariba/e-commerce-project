import { useState } from "react";
import { createAuthUserFromEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {

  const [signUpForm, setSignUpForm] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = signUpForm

  const resetFormFields = () => {
    setSignUpForm(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setSignUpForm({ ...signUpForm, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      console.log('passwords do not match')
      return
    }

    try {
      const { user } = await createAuthUserFromEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use')
        alert('cannot create an account for an email already being used!')
      else {
        console.log('user creation encountered an error', error)
      }
    }
  }

  return (
    <div
      className="sign-up-form-container"
    >
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Display Name'}
          type="text"
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput
          label={'E-mail'}
          type="email"
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label={'Password'}
          type="password"
          required
          onChange={handleChange}
          name='password'
          minLength={6}
          value={password}
        />

        <FormInput
          label={'Confirm Password'}
          type="password"
          required
          onChange={handleChange}
          name='confirmPassword'
          minLength={6}
          value={confirmPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;