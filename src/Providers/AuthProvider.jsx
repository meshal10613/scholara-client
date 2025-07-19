import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
    createUserWithEmailAndPassword, 
    deleteUser, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //provider
    const provider = new GoogleAuthProvider();

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            const token = currentUser?.accessToken;
            localStorage.setItem("token", token);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    //login with google
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    };

    const signOutUser = () => {
        return signOut(auth);
    };

    const deleteCurrentUser = () => {
        return deleteUser(auth.currentUser)
    };

    const authData = {
        user,
        setUser,
        loading,
        setLoading,
        registerUser,
        updateUserProfile,
        signOutUser,
        loginUser,
        loginWithGoogle,
        deleteCurrentUser
    };

    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;