import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";

const SocialButton = ({ provider, color, action }) => 
{
    const signInWithGoogle = () =>
    {
        // alert('trying login with '+ provider);
        const _provider = new GoogleAuthProvider();
        signInWithPopup(auth, _provider)
        .then(async (result) => { console.log(result)});

    }

    return(
        <button type="button" className="social-button"
            style={{ borderColor: color, color }}
            onClick={signInWithGoogle}>
            <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                {
                    provider === 'Google' ? (
                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                    ) : (
                        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                    )
                }
            </svg>
            {action}
        </button>
    );
  }

  export default SocialButton;