import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // console.log(res)
    createUserDocumentFromAuth(user)
  } 

  return (
    <div>
      <h2>SignIn page</h2>
      <button
        onClick={logGoogleUser}
      >
        Sign in with google
      </button>
    </div>
  )
}

export default SignIn;