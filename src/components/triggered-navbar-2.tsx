import { Link } from 'gatsby';
import React, { useState } from 'react';
import { Modal } from 'antd';

const TriggerNavbar2: React.FC = () => {
    const [modal2Open, setModal2Open] = useState(false);
    return (
        <>
            <div className="trigger-navbar-2">
                <button className="trigger-nav_mint-btn" onClick={() => setModal2Open(true)}>
                    <img className="w-5 h-5" src="/images/icon/create-fff.png" alt="" />
                    <div className="trigger-nav_mint">Mint ViRME</div>
                </button>
                <Modal
                    title="Listing your token"
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                    footer={[
                        <div key={1} className="modal-footer">
                            <button className="btn btn-dark btn-small">Submit</button>
                            <button className="btn btn-light btn-small">Cancel</button>
                        </div>,
                    ]}
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
                <div className="trigger-nav_token-btn">
                    <img className="w-5 h-5" src="/images/icon/copy.png" alt="" />
                    <div className="trigger-nav_token">0xc0E3...B79C</div>
                </div>
                <div className="trigger-nav_hline"></div>
                <div className="trigger-nav-group">
                    <Link to="/">
                        <div className="trigger-nav_item">
                            <img className="w-8 h-8" src="/images/icon/vector-fff.png" alt="" />
                            <div className="trigger-nav_item-content">Home</div>
                        </div>
                    </Link>
                    <Link to="/marketplace">
                        <div className="trigger-nav_item">
                            <img className="w-8 h-8" src="/images/icon/storefront.png" alt="" />
                            <div className="trigger-nav_item-content">Marketplace</div>
                        </div>
                    </Link>
                    <Link to="/user-info">
                        <div className="trigger-nav_item">
                            <img className="w-8 h-8" src="/images/icon/user-fff.png" alt="" />
                            <div className="trigger-nav_item-content">Profile</div>
                        </div>
                    </Link>
                </div>
                <div className="trigger-nav_disconnect-btn">Disconnect</div>
            </div>
        </>
    );
};

export default TriggerNavbar2;
