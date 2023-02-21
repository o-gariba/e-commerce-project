import { useState } from "react";
import { createUserDocumentFromAuth, signInAuthWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {

  const [signUpForm, setSignUpForm] = useState(defaultFormFields)
  const { email, password } = signUpForm

  const resetFormFields = () => {
    setSignUpForm(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setSignUpForm({ ...signUpForm, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthWithEmailAndPassword(email, password)
      console.log(response)
      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for this e-mail')
          break;

        case 'auth/user-not-found':
          alert('no user associated with this email')
          break;

        default:
          console.log('error trying to sing in', error)
          break;
      }
    }
  }

  const signInWithGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user)
  }

  return (
    <div
      className="sign-up-form-container"
    >
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

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

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button
            type='button'
            buttonType={'google'}
            onClick={signInWithGoogleUser}
          >
            Google sign in
          </Button>
        </div>

      </form>
    </div>
  )
}

export default SignInForm;