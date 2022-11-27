import React from 'react';

const Header = () => {
    return (
        <header className="px-12 box-border 0xl:max-md:px-8 bg-black fixed top-0 w-full xl:max-w-screen-xl m-auto">
            <nav className="flex justify-between items-center py-6">
                <div className="flex items-center gap-3">
                    <div className="logo">
                        <img
                            className="w-12 h-auto 0xl:max-md:w-8 "
                            src="/images/logo/vector.png"
                            alt=""
                        />
                    </div>
                    <div className="brand text-4xl leading-10 0xl:max-md:text-2xl">ViMRE</div>
                </div>
                <div className="user-group flex justify-end items-center gap-8 0xl:max-md:hidden">
                    <div className="market-place">Marketplace</div>
                    <button className="btn btn-dark btn-medium">
                        <img className="w-5" src="/images/icon/rocket-launch.png" alt="" />
                        <div className="">Connect a wallet</div>
                    </button>
                </div>
                <div className="md:hidden">
                    <img src="/images/icon/list.png" alt="" />
                </div>
            </nav>
        </header>
    );
};

export default Header;
