import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import './Home.css';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
    const auth = getAuth();

    return (
        <div className="container__all home_page">
            <div className="home_page__container">
                <h2 className="welcome__message reveal-2 my-5">You are connected !</h2>
                <button onClick={() => signOut(auth)} className="button__logout reveal-3">
                    Log out
                </button>
            </div>
        </div>
    );
};

export default HomePage;
