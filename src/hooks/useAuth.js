"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebase';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
const AuthContext = createContext({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    signInWithGitHub: async () => { },
    signInWithGoogle: async () => { },
    logout: async () => { },
    error: null,
    loading: false,
});

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false); // Do not set loading to true for unauthenticated users
            }
            setInitialLoading(false);
        });
    }, [auth]);

    const signUp = async (email, password, username) => {
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Check if the user with the same email already exists in Firestore
            const userDocRef = doc(db, 'users', email);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                username: username,
                // Add more fields as needed
            });

            await updateProfile(userCredential.user, { displayName: username });
            setUser(userCredential.user);
            toast.success(`Welcome`, {});
            router.push('/');
        } catch (error) {
            toast.error(`${error.message}`, {});
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            setUser(userCredential.user);
            toast.success(`Welcome `, {
            });
            router.push('/');
        } catch (error) {
            toast.error(`${error.message}`, {
            })
        } finally {
            setLoading(false);
        }
    };

    const signInWithGitHub = async () => {
        setLoading(true);

        const provider = new GithubAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const userDocRef = doc(db, 'users', userCredential.user.email);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                providerId: 'github',
                username: userCredential.user.displayName,
                // Add more fields as needed
            });
            setUser(userCredential.user);
            toast.success(`Welcome`, {});
            router.push('/');
        } catch (error) {
            toast.error(`${error.message}`, {});
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);

        const provider = new GoogleAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const userDocRef = doc(db, 'users', userCredential.user.email);
            await setDoc(userDocRef, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                providerId: 'google',
                username: userCredential.user.displayName,
                // Add more fields as needed
            });
            setUser(userCredential.user);
            router.push('/');
            toast.success(`Welcome`, {});
        } catch (error) {
            toast.error(`${error.message}`, {});
        } finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        setLoading(true);

        try {
            toast.success(`logout successfull! ,Thanks for visiting the site ${user.displayName}`, {
            });
            await signOut(auth);
            setUser(null);
        } catch (error) {
            toast.error(`${error.message}`, {
            });
        } finally {
            setLoading(false);
        }
    };

    const navigateToLogin = () => {
        router.push('/login'); // Use the router to navigate
    };

    const memoedValue = useMemo(() => ({
        user,
        signUp,
        signIn,
        signInWithGitHub,
        signInWithGoogle,
        navigateToLogin,
        loading,
        logout,
        error,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [user, loading]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}