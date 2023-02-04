import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import NavBar from 'components/navBar';

const Header: React.FunctionComponent<{}> = () => {
    const [modal2Open, setModal2Open] = useState(false);
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
                    <Link to="/">
                        <div className="market-place">Home</div>
                    </Link>
                    <Link to="/marketplace">
                        <div className="market-place">Marketplace</div>
                    </Link>
                    <Link to="/connect-wallet">
                        <div className="btn btn-dark btn-small px-[30px] mr-2">
                            <img className="w-5" src="/images/icon/rocket-launch.png" alt="" />
                            <div className="">Connect a wallet</div>
                        </div>
                    </Link>
                    <button
                        className="btn btn-dark btn-small px-[30px] ml-2"
                        onClick={async () => await navigate('/mint-token')}
                    >
                        <img className="w-5" src="/images/icon/rocket-launch.png" alt="" />
                        <div className="">Mint ViRME</div>
                    </button>
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
                <NavBar />
            </nav>
        </header>
    );
};

export default Header;
