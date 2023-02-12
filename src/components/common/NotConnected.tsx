import { navigate } from 'gatsby';
import React from 'react';

export default function NotConnected() {
    return (
        <div className="mt-4 min-h-screen">
            <div className="text-center">
                <h4 className="text-white">
                    <p>
                        <b>Not connected!</b>
                    </p>
                    <p>This page require you an Aptos account connect to...</p>
                    <p>Please connect to Aptos wallet to continue!</p>
                </h4>
                <button
                    className="btn btn-dark btn-small m-auto"
                    onClick={async () => await navigate('/connect')}
                >
                    Connect to Wallet
                </button>
            </div>
        </div>
    );
}
