import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user)
  }


  return (
    <div>
      <h2>SignIn page</h2>
      <button
        onClick={logGoogleUser}
      >
        Sign in with google (pop up)
      </button>

      <SignUpForm />
    </div>
  )
}

export default SignIn;