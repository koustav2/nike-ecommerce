'use client'
import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { BsPersonCircle } from "react-icons/bs";
import Wrapper from "./Wrapper";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import { useSelector } from 'react-redux';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    const { user, logout, navigateToLogin } = useAuth();
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showCatMenu, setShowCatMenu] = useState(false);
    const [show, setShow] = useState("translate-y-0");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [categories, setCategories] = useState(null);
    const { cartItems } = { cartItems: 0 };
    return (
        <header
            className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
        >
            <Wrapper className="h-[60px] flex justify-between items-center">
                <Link href="/">
                    <Image
                        height={60}
                        width={60}
                        src="/logo.svg"
                        alt="logo"
                        className="w-[40px] md:w-[60px]"
                    />
                </Link>
                <Menu
                    showCatMenu={showCatMenu}
                    setShowCatMenu={setShowCatMenu}
                    categories={categories}
                />

                {mobileMenu && (
                    <MenuMobile
                        showCatMenu={showCatMenu}
                        setShowCatMenu={setShowCatMenu}
                        setMobileMenu={setMobileMenu}
                        categories={categories}
                    />
                )}
                <div className="flex items-center gap-2 text-black">
                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                        <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
                        <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                            0
                        </div>
                    </div>
                    <Link href="/cart">
                        <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                            <BsCart className="text-[15px] md:text-[20px]" />
                            {cartItems.length > 0 && (
                                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                                    {cartItems.length}
                                </div>
                            )}
                        </div>
                    </Link>
                    <div class="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
                        <div class="flex items-center justify-center p-12">
                            <div className=" relative inline-block text-left dropdown">
                                <span className="rounded-md shadow-sm"
                                ><button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                                    type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                                        <span>Profile</span>
                                        <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button
                                    ></span>
                                <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                                    <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                        <div className="px-4 py-3">
                                            {
                                                user ? (
                                                    <>
                                                        <p className="text-sm leading-5">Signed in as</p>
                                                        <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                                                            {user?.email}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <p className="text-sm leading-5">Not signed in</p>
                                                )
                                            }
                                        </div>
                                        <div className="py-1">
                                            <a tabindex="0"
                                                onClick={user ? () => router.push('/profile') : null}
                                                className={`text-gray-700 flex justify-between w-full
                                            ${user ? "border-b border-gray-200 cursor-pointer" : "opacity-50 cursor-not-allowed"}
                                             px-4 py-2 text-sm leading-5 text-left`} role="menuitem" >
                                                Account settings
                                            </a>
                                        </div>
                                        {
                                            user ? (
                                                <div className="py-1"
                                                    onClick={() => logout()}
                                                >
                                                    <a href="javascript:void(0)" tabindex="3" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >
                                                        Sign out
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="py-1"
                                                    onClick={() => navigateToLogin()}
                                                >
                                                    <a href="javascript:void(0)" tabindex="3" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >
                                                        Sign In
                                                    </a>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
                        {mobileMenu ? (
                            <VscChromeClose
                                className="text-[16px]"
                                onClick={() => setMobileMenu(false)}
                            />
                        ) : (
                            <BiMenuAltRight
                                className="text-[20px]"
                                onClick={() => setMobileMenu(true)}
                            />
                        )}
                    </div>
                </div>
            </Wrapper>

        </header>
    )
}

export default Header
