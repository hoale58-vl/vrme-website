import React from 'react';
import { Link } from 'gatsby';
import TriggerNavbar2 from '../triggered-navbar-2';

const Header: React.FunctionComponent<{}> = () => {
    return (
        <header className="header-main">
            <nav className="header-main-nav">
                <Link to="/">
                    <div className="header-logo-group">
                        <div className="">
                            <img className="logo" src="/images/logo/vector.png" alt="" />
                        </div>
                        <div className="brand">ViMRE</div>
                    </div>
                </Link>
                <div className="header-connect-wallet">
                    <Link to="/marketplace">
                        <div className="market-place">Marketplace</div>
                    </Link>
                    <Link to="/connect-wallet">
                        <div className="btn btn-dark btn-medium px-[30px]">
                            <img className="w-5" src="/images/icon/rocket-launch.png" alt="" />
                            <div className="">Connect a wallet</div>
                        </div>
                    </Link>
                </div>
                <input
                    type="checkbox"
                    id="nav-mobile-input"
                    className="nav-mobile-input-checkbox"
                    hidden
                />
                <label className="header-icon-list" htmlFor="nav-mobile-input">
                    <img src="/images/icon/list.png" alt="" />
                </label>
                <label htmlFor="nav-mobile-input" className="nav-overlay"></label>
                <TriggerNavbar2 />
            </nav>
        </header>
    );
};

export default Header;
