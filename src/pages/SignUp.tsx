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
    const auth = getAuth();
    const navigate = useNavigate();

    const togglePassword = () => {
        if (inputType === 'password') {
            setInputType('text');
            setEyeIcon('fa-eye');
        } else {
            setInputType('password');
            setEyeIcon('fa-eye-slash');
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    const signUpWithEmailAndPwd = async () => {
        setLoading(true);
        
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log(user.displayName);

                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == 'email-already-in-use') {
                    alert('You already have an account with that email.');
                }
                // ..
            })
            .finally(() => {
                setLoading(false);
            });
    };
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
                        <button type="button" className="form__validate" onClick={signUpWithEmailAndPwd}>
                            {loading ? <i className="fa fa-spinner fa-spin" /> : <>Sign Up</>}
                        </button>
                        <p className="my-4 text-center">
                            <em> Already have an account?</em>
                            <a onClick={() => navigate('/login')} className="signup_link ms-2">
                                Sign In
                            </a>
                        </p>
                    </div>
                </form>
                ;
            </div>
        </div>
    );
}
