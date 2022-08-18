import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface IAuthRouteProps {}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
                console.log(user.photoURL);
            } else {
                console.log('unauthorized: Forcing url');
                navigate('/login');
            }
        });

        return () => AuthCheck();
    }, [auth]);

    if (loading) {
        return <>loading ...</>;
    } else {
        return <>{children}</>;
    }
};

export default AuthRoute;
