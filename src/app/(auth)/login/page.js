/* eslint-disable react-hooks/rules-of-hooks */
'use client'

// /* eslint-disable @next/next/no-sync-scripts */
import Wrapper from '@/components/Wrapper'
import useAuth from '@/hooks/useAuth'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ClipLoader from "react-spinners/ClipLoader";
import('react').CSSProperties
const page = () => {
    const [login, setLogin] = useState(false);
    const { signIn, signUp, signInWithGitHub, signInWithGoogle,loading } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async ({ email, password, username }) => {
        if (login) {
            await signIn(email, password);
        } else {
            await signUp(email, password, username);
        }
    };

    return (
        <Wrapper>
            <Head>
                <title>Auth</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div>
                <div className="flex justify-center">
                    <div

                        className="flex flex-col w-full 
                         justify-center border-t-red-700 border-b-green-500  border-l-blue-700 border-r-yellow-700 
                    items-center md:flex-row shadow rounded-xl max-w-7xl md:w-[50%]  
                    border-4 border-transparent p-8 text-center
                    
                    m-2">
                        <form className=" w-full md:w-3/4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="text-xl cursor-poinflex-col justify-center items-center mt-5 md:mt-0 py-4">

                                <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">Login to your account</h1>

                            </div>
                            <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
                                {!login && (
                                    <div className="">
                                        <div className="m-1 text-lg text-gray-500 text-semibold">Username</div>
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            {...register('username', { required: !login })} // Only required for sign up
                                            className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                                        />
                                        {errors.username && (
                                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                                Please enter a username.
                                            </p>
                                        )}
                                    </div>
                                )}
                                <div className="">
                                    <div className="m-1 text-lg text-gray-500 text-semibold">Email</div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        {...register('email', { required: true })}
                                        className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                                    />
                                    {errors.email && (
                                        <p className="p-1 text-[13px] font-light  text-orange-500">
                                            Please enter a valid email.
                                        </p>
                                    )}

                                </div>
                                <div className="">
                                    <div className="m-1 text-lg text-gray-500 text-semibold">Password</div>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...register('password', { required: true })}
                                        className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                                    />
                                    {errors.password && (
                                        <p className="p-1 text-[13px] font-light  text-orange-500">
                                            Your password must contain between 4 and 60 characters.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="text-center mt-7 flex flex-col gap-4">
                                <button
                                    onClick={() => setLogin(true)}
                                    className={`px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white ${login ? 'bg-yellow-400 hover:bg-stone-500' : 'bg-stone-500 hover:bg-stone-400'
                                        } font-medium m-2 mb-6`}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="submit"
                                    className={`px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white  ${!login ? 'bg-stone-600 hover:bg-stone-500' : 'bg-stone-500 hover:bg-yellow-400'
                                        } font-medium m-2 mb-6`}
                                    onClick={() => setLogin(false)}
                                >
                                    Sign up
                                </button>
                            </div>

                        </form>
                        <div className="h-[100%] w-full md:w-1/2 items-center flex justify-center">

                            <div className="text-stone-700 text-base font-semibold my-10 space-y-2 m-2 cursor-pointer">
                                <div
                                    className="btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all rounded flex items-center justify-center mb-4"
                                    onClick={signInWithGoogle} // Call signInWithGoogle when clicked
                                >
                                    <ion-icon name="logo-google" className="m-1 text-xl md:text-xl  text-red-500"></ion-icon>
                                </div>
                                <div
                                    className="flex justify-between rounded-sm hover:bg-blue-300 hover:text-yellow-600 bg-blue-800 text-yellow-300 border-stone-700 px-6 py-2"
                                    onClick={signInWithGitHub} // Call signInWithGitHub when clicked
                                >
                                    <ion-icon name="logo-github" className="m-1 text-sm md:text-xl text-blue-500"></ion-icon>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
            <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
        </Wrapper>
    )
}

export default page
