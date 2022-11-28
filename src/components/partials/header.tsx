import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
    return (
        <header className="px-[50px] box-border 0xl:max-md:px-8 bg-black sticky top-0 w-full xl:max-w-screen-xl m-auto">
            <nav className="flex justify-between items-center py-[25px]">
                <Link to="/">
                    <div className="flex items-center gap-3">
                        <div className="logo">
                            <img
                                className="w-[50px] h-auto 0xl:max-md:w-8 "
                                src="/images/logo/vector.png"
                                alt=""
                            />
                        </div>
                        <div className="brand text-[36px] leading-[50.4px] 0xl:max-md:text-2xl">
                            ViMRE
                        </div>
                    </div>
                </Link>
                <div className="user-group flex justify-end items-center gap-8 0xl:max-md:hidden">
                    <div className="market-place leading-[22.4px]">Marketplace</div>
                    <Link to="/connect-wallet">
                        <button className="btn btn-dark btn-medium">
                            <img className="w-5" src="/images/icon/rocket-launch.png" alt="" />
                            <div className="">Connect a wallet</div>
                        </button>
                    </Link>
                </div>
                <div className="md:hidden">
                    <img src="/images/icon/list.png" alt="" />
                </div>
            </nav>
        </header>
    );
};

export default Header;
