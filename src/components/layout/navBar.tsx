import { Link, navigate } from 'gatsby';
import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const NavBar: React.FC = () => {
    const { account } = useWallet();

    return (
        <>
            <div className="trigger-navbar-2">
                <button
                    className="trigger-nav_mint-btn"
                    onClick={async () => await navigate('/token')}
                >
                    <img className="w-5 h-5" src="/images/icon/create-fff.png" alt="" />
                    <div className="trigger-nav_mint">Mint ViMRE</div>
                </button>
                <div className="trigger-nav_token-btn">
                    <img className="w-5 h-5" src="/images/icon/copy.png" alt="" />
                    <div className="trigger-nav_token">{account?.address}</div>
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

export default NavBar;
