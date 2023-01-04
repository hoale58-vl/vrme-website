import React, { useState } from 'react';
import { Link } from 'gatsby';
import TriggerNavbar2 from '../triggered-navbar-2';
import { Modal } from 'antd';

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
                        <div className="btn btn-dark btn-medium px-[30px]">
                            <img className="w-5" src="/images/icon/rocket-launch.png" alt="" />
                            <div className="">Connect a wallet</div>
                        </div>
                    </Link>
                    <button
                        className="btn btn-dark btn-medium px-[30px]"
                        onClick={() => setModal2Open(true)}
                        hidden
                    >
                        <img className="w-5" src="/images/icon/rocket-launch.png" alt="" />
                        <div className="">Mint ViRME</div>
                    </button>
                    <Modal
                        title="Listing your token"
                        centered
                        open={modal2Open}
                        onOk={() => setModal2Open(false)}
                        onCancel={() => setModal2Open(false)}
                    >
                        <div className="modal-token-name">RME SaiGon 0001</div>
                        <img
                            className="modal-token-image"
                            src="/images/card-nft/image-card-nft-2.png"
                            alt=""
                        />
                        <div className="modal-token-price-group">
                            <img
                                className="w-5 h-5 modal-wallet-icon"
                                src="/images/icon/wallet-dark.png"
                                alt=""
                            />
                            <input
                                className="modal-token-price-input"
                                type="text"
                                placeholder="Price"
                            />
                        </div>
                    </Modal>
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
