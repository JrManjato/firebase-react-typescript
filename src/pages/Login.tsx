import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = () => {
    interface IError {
        code: string;
        message: string;
    }
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
            .then(() => {
                navigate('/homepage');
            })
            .catch(() => {
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
            .then(() => {
                navigate('/homepage');
            })
            .catch(() => {
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
            .then(() => {
                navigate('/homepage');
            })
            .catch(() => {
                setAuthing(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const logInWithEmailAndPassword = async () => {
        setLoading1(true);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navigate('/homepage');
        } catch (error: IError | any) {
            if (error.code === 'auth/wrong-password') {
                setErrorMessage('Wrong password. Please try again');
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('Please provide a valid email');
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage('The password is too weak.');
            } else if (error.code == 'auth/user-not-found') {
                setErrorMessage('This user does not exist');
            }
        } finally {
            setLoading1(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const togglePassword = (): void => {
        if (inputType === 'password') {
            setInputType('text');
            setEyeIcon('fa-eye');
        } else {
            setInputType('password');
            setEyeIcon('fa-eye-slash');
        }
    };

    const checker = (): void => {
        if (data.email.length === 0) {
            setErrorMessage('The mail field cannot be empty');
        } else if (data.password.length === 0) {
            setErrorMessage('The password field is empty');
        } else if (data.password.length < 6) {
            setErrorMessage('The password is too weak');
        } else {
            logInWithEmailAndPassword();
        }
    };

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
                        <button type="button" className="form__validate" onClick={checker}>
                            {loading1 ? <i className="fa fa-spinner fa-spin" /> : <>Log in</>}
                        </button>
                    </div>
                </form>
                <span className="text-center text-danger mt-1">{errorMessage}</span>
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
