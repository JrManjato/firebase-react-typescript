import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = () => {
    const info = {
        email: '',
        password: ''
    };

    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [data, setData] = useState(info);
    const [inputType, setInputType] = useState('password');
    const [eyeIcon, setEyeIcon] = useState('fa-eye-slash');
    const [errorMessage, setErrorMessage] = useState('');

    const signInWithGoogle = async () => {
        setAuthing(true);
        setLoading(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const signInWithFacebook = async () => {
        setAuthing(true);
        setLoading(true);

        signInWithPopup(auth, new FacebookAuthProvider())
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;
                console.log(accessToken);

                console.log('done');
                navigate('/');
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
                setAuthing(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const signInWithGithub = async () => {
        setAuthing(true);
        setLoading(true);

        signInWithPopup(auth, new GithubAuthProvider())
            .then((result) => {
                navigate('/');
                console.log(result.user);

                console.log('done !');
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // const email = "hei.judicael@gmail.com";
    // const pwd = "jojo2121";

    const logInWithEmailAndPassword = async () => {
        setLoading1(true);
        console.log('Sign In function is running ...');
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/');
        } catch (error: any) {
           if (error.code === 'auth/wrong-password') {
               setErrorMessage('Wrong password. Please try again');
           } else if (error.code === 'auth/invalid-email') {
               setErrorMessage('Please provide a valid email');
           } else if (error.code === 'auth/weak-password') {
               setErrorMessage('The password is too weak.');
           } 
        } finally {
            setLoading1(false);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const togglePassword = () =>{
        if (inputType === 'password') {
          setInputType('text');
          setEyeIcon('fa-eye');   
        } else {
             setInputType('password');
             setEyeIcon('fa-eye-slash');   
        }
    }
    return (
        <div className="container__all">
            <div className="container__all__type">
                <h1 className="text-center mt-4">Sign In</h1>
                <form className="forms">
                    <div className="floating-form">
                        <div className="floating-label">
                            <input className="floating-input" type="email" placeholder=" " name="email" onChange={handleChange} required />
                            <span className="input__label">Email</span>
                        </div>
                        <div className="floating-label">
                            <input className="floating-input" type={inputType} placeholder=" " name="password" onChange={handleChange} required />
                            <span className="input__label">Password</span>
                            <i className={`fa ${eyeIcon}`} onClick={togglePassword} />
                        </div>
                        <button type="button" className="form__validate" onClick={logInWithEmailAndPassword}>
                            {loading1 ? <i className="fa fa-spinner fa-spin" /> : <>Log in</>}
                        </button>
                    </div>
                </form>
                <span className='text-center text-danger mt-1'>{errorMessage}</span>
                <p className="text-center my-3">
                    <i className="bi bi-dash mx-4" />
                    {loading ? <i className="fa fa-spinner fa-spin" /> : <span className="transition__text">Or continue with</span>}
                    <i className="bi bi-dash mx-4" />
                </p>
                <div className="icon__groups">
                    <button onClick={() => signInWithGoogle()} disabled={authing} className="icon__button mx-4">
                        <i className="fab fa-google fa-2x" />
                    </button>
                    <button onClick={() => signInWithFacebook()} disabled={authing} className="icon__button mx-4">
                        <i className="fab fa-facebook fa-2x" />
                    </button>
                    <button onClick={() => signInWithGithub()} disabled={authing} className="icon__button mx-4">
                        <i className="fab fa-github fa-2x" />
                    </button>
                </div>
                <p className="my-4 text-center">
                    <em>Don't have any account yet?</em>
                    <a onClick={() => navigate('/signup')} className="signup_link ms-1">
                        Sign Up here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
