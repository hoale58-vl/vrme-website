import React from 'react';

const TriggerNavbar2: React.FC = () => {
    return (
        <>
            <div className="trigger-navbar-2">
                <div className="trigger-nav_mint-btn">
                    <img className="w-5 h-5" src="/images/icon/create-fff.png" alt="" />
                    <div className="trigger-nav_mint">Mint ViRME</div>
                </div>
                <div className="trigger-nav_token-btn">
                    <img className="w-5 h-5" src="/images/icon/copy.png" alt="" />
                    <div className="trigger-nav_token">0xc0E3...B79C</div>
                </div>
                <div className="trigger-nav_hline"></div>
                <div className="trigger-nav-group">
                    <div className="trigger-nav_item">
                        <img className="w-8 h-8" src="/images/icon/vector-fff.png" alt="" />
                        <div className="trigger-nav_item-content">Home</div>
                    </div>
                    <div className="trigger-nav_item">
                        <img className="w-8 h-8" src="/images/icon/storefront.png" alt="" />
                        <div className="trigger-nav_item-content">Marketplace</div>
                    </div>
                    <div className="trigger-nav_item">
                        <img className="w-8 h-8" src="/images/icon/user-fff.png" alt="" />
                        <div className="trigger-nav_item-content">Profile</div>
                    </div>
                </div>
                <div className="trigger-nav_disconnect-btn">Disconnect</div>
            </div>
        </>
    );
};

export default TriggerNavbar2;
