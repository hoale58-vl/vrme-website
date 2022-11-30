import React from 'react';
import { Link } from 'gatsby';

interface Props {}

const Header: React.FunctionComponent<Props> = () => {
    return (
        <header className="header-main">
            <nav className="header-main-nav">
                <Link to="/">
                    <div className="header-logo-group">
                        <div className="">
                            <img
                                className="logo"
                                src="/images/logo/vector.png"
                                alt=""
                            />
                        </div>
                        <div className="brand">
                            ViMRE
                        </div>
                    </div>
                </Link>
                <div className="header-connect-wallet">
                    <div className="market-place">Marketplace</div>
                    <Link to="/connect-wallet">
                        <button className="btn btn-dark btn-medium">
                            <img className="w-5" src="/images/icon/rocket-launch.png" alt="" />
                            <div className="">Connect a wallet</div>
                        </button>
                    </Link>
                </div>
                <div className="header-icon-list">
                    <img src="/images/icon/list.png" alt="" />
                </div>
            </nav>
        </header>
    );
};

export default Header;
