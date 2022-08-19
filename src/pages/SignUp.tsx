import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
    const info = {
        email: '',
        password: ''
    };

    const [data, setData] = useState(info);
    const [loading, setLoading] = useState(false);
    const [inputType, setInputType] = useState('password');
    const [eyeIcon, setEyeIcon] = useState('fa-eye-slash');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();

    const togglePassword = (): void => {
        if (inputType === 'password') {
            setInputType('text');
            setEyeIcon('fa-eye');
        } else {
            setInputType('password');
            setEyeIcon('fa-eye-slash');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const signUpWithEmailAndPwd = async () => {
        setLoading(true);

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;

                navigate('/homepage');
            })
            .catch((error) => {
                const errorCode = error.code;               
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const checker = (): void => {
        if (data.email.length === 0) {
            setErrorMessage('The mail field cannot be empty');
        } else if (data.password.length === 0) {
            setErrorMessage('The password field is empty');
        } else if (data.password.length < 6) {
            setErrorMessage('The password is too weak');
        } else {
            signUpWithEmailAndPwd();
        }
    } 

    return (
        <div className="container__all">
            <div className="container__all__type signup__container">
                <h1 className="text-center">Sign Up</h1>
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
                            {loading ? <i className="fa fa-spinner fa-spin" /> : <span className='button__text'>Sign Up</span>}
                        </button>
                        <span className="text-center text-danger mt-1 ms-5">{errorMessage}</span>
                        <p className="my-4 text-center text__bottom">
                            <em> Already have an account?</em>
                            <a onClick={() => navigate('/')} className="signup_link ms-2">
                                Sign In
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
