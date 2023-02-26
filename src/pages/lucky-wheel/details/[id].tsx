import React from 'react';
import { HeadFC } from 'gatsby';
import Layout from 'components/layout';
import { TokenDetailProps } from 'components/token/types';
import { SpinnerTable } from 'components/lucky-wheel/spinner-table';
import configs from 'config/config';
import { fetcher } from 'services/fetcher';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { ethers } from 'ethers';
import { LuckyWheelPrize } from 'types/lucky-wheel';
import { darkenColor, toColor } from 'components/lucky-wheel/utils';
import { WheelColorHex } from 'components/lucky-wheel/types';

const LuckyWheel = ({ tokenDataIdHash }: { tokenDataIdHash: string }) => {
    const endpoint = `${configs.api.token.details}/${tokenDataIdHash}`;

    const { data, mutate } = useSWR(endpoint, fetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const getFee = () => {
        if (data && data.price) {
            return ethers
                .formatUnits((data.price * 5) / 10000, configs.smc.marketplace_coin_decimals)
                .toString();
        }
        return '-';
    };

    const prizes =
        data && data.lucky_wheel_data
            ? (JSON.parse(data.lucky_wheel_data) as LuckyWheelPrize[])
            : null;

    return (
        <div className="lucky-wheel-body">
            <div className="lucky-wheel-grid">
                <h1 className="lucky-wheel-title">ViMRE Lucky Wheel</h1>
                <div className="lucky-wheel-content">
                    Lucky wheel help you - who interest in this MRE try your luck to purchase this
                    MRE with the best price.
                </div>
                <div className="lucky-wheel-preview">Preview</div>
                <div className="wheel-component-group">
                    {prizes && <SpinnerTable slices={prizes} />}
                </div>
                <div className="lucky-wheel-fee">
                    Fee: {getFee()} {configs.smc.marketplace_coin_symbol} USD (0.05% price)
                </div>
            </div>
            <div className="lucky-wheel-grid">
                {data && data.price && (
                    <div className="lucky-wheel-token-info text-right">
                        <div className="lucky-wheel-token-name-group justify-end">
                            <div className="lucky-wheel-token-name">{data.name}</div>
                            <img className="w-8 h-8" src="/images/icon/unverified.png" alt="" />
                        </div>
                        <div className="lucky-wheel-token-listing-price-label">Listing Price</div>
                        <div className="lucky-wheel-token-price">
                            {ethers
                                .formatUnits(data.price, configs.smc.marketplace_coin_decimals)
                                .toString()}
                        </div>
                        <div className="lucky-wheel-token-price-unit">
                            {' '}
                            {configs.smc.marketplace_coin_symbol}
                        </div>
                    </div>
                )}
                <div className="lucky-wheel-prize-winning-rate">Prize and Winning Rate</div>
                {prizes && (
                    <div className="lucky-wheel-prize-winning-rate-group">
                        {prizes.map((prize, index) => {
                            const darkenPercentage = (prizes.length - index / 3) / prizes.length;
                            const sliceColor = toColor(
                                darkenColor(WheelColorHex, index, darkenPercentage)
                            );
                            return (
                                <div key={index} className="lucky-wheel-prize-winning-rate-ele">
                                    <div className="lucky-wheel-prize-color">{sliceColor}</div>
                                    <input
                                        className="prize-type prize-type-default"
                                        type="text"
                                        value={prize.name}
                                        disabled
                                    />
                                    <input
                                        className="prize-rate prize-rate-default"
                                        type="number"
                                        value={prize.winningRate}
                                        disabled
                                    />
                                </div>
                            );
                        })}

                        <div className="overflow-auto"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function LuckyWheelPage({ id: tokenDataIdHash }: TokenDetailProps) {
    return (
        <Layout>
            <LuckyWheel tokenDataIdHash={tokenDataIdHash} />
        </Layout>
    );
}

export const Head: HeadFC = () => <title>Lucky Wheel</title>;
