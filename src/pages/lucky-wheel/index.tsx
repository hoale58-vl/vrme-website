import Layout from 'components/layout';
import { SpinnerTable } from 'components/lucky-wheel/spinner-table';
import { HeadFC } from 'gatsby';
import React from 'react';
import { ILuckyWheel } from 'types/lucky-wheel';
import configs from 'config/config';

const CreateLuckyWheel = () => {
    const [prize, setPrize] = React.useState<ILuckyWheel[]>([
        {
            prize: 'No prize',
            winningRate: 0,
        },
    ]);
    const [noPrizeRate, setNoPrizeRate] = React.useState<number>(100);
    const total = React.useRef<number>(100);

    const insert = (arr: ILuckyWheel[], index: number, newItem: ILuckyWheel) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted item
        newItem,
        // part of the array after the specified index
        ...arr.slice(index),
    ];

    const handleAdd = (index: number) => {
        const temp: ILuckyWheel[] = insert(prize, index + 1, {
            prize: '',
            winningRate: 100 - Number(total.current),
        });
        total.current = 100;
        setPrize(temp);
    };

    const handleRemove = (index: number) => {
        const temp: ILuckyWheel[] = [...prize.slice(0, index), ...prize.slice(index + 1)];
        setPrize(temp);
    };

    const handlePrizeInputChange = (e: any, index: number) => {
        setPrize((prize) => {
            const items: ILuckyWheel[] = prize.map((item, i) => {
                if (i === index) {
                    return { ...item, prize: e.target.value };
                }
                return item;
            });
            return items;
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const endpoint = `${configs.api.offers.list}`;
    };
    const handleChangeNoPrizeRate = (e: any) => {
        total.current = Number(total.current) - noPrizeRate + Number(e.target.value);
        setNoPrizeRate(Number(e.target.value));
    };

    const handleWinningRateInputChange = (e: any, index: number) => {
        if (Number(e.target.value) < 0) {
            e.target.value = 0;
        }
        setPrize((prize) => {
            const winningRate = e.target.value ? parseInt(e.target.value) : 0;
            const items: ILuckyWheel[] = prize.map((item, i) => {
                if (i === index) {
                    total.current =
                        Number(total.current) - Number(item.winningRate) + Number(e.target.value);
                    return { ...item, winningRate };
                }
                return item;
            });
            return items;
        });
    };

    return (
        <div className="lucky-wheel-body">
            <div className="lucky-wheel-grid">
                <h1 className="lucky-wheel-title">ViMRE Lucky Wheel</h1>
                <div className="lucky-wheel-content">
                    Lucky wheel help you - the owner also seller earning more profit from your real
                    estate based on the value it is also attract people interested in your listing,
                    who will try their luck to purchase your MRE with the best price.
                </div>
                <div className="lucky-wheel-preview">Preview</div>
                <div className="wheel-component-group">
                    <SpinnerTable numberOfSlices={10} />
                    {/* <div className="wheel-component-cover"></div> */}
                </div>
                <div className="lucky-wheel-fee">Fee: 45000 USD (0.05% price)</div>
            </div>
            <div className="lucky-wheel-grid">
                <div className="lucky-wheel-token-info">
                    <div className="lucky-wheel-token-name-group">
                        <div className="lucky-wheel-token-name">Vin Home Q8 #1</div>
                        <img className="w-8 h-8" src="/images/icon/verified.png" alt="" />
                    </div>
                    <div className="lucky-wheel-token-listing-price-label">Listing Price</div>
                    <div className="lucky-wheel-token-price">900000000</div>
                    <div className="lucky-wheel-token-price-unit">USDT</div>
                </div>
                <div className="lucky-wheel-prize-winning-rate">Prize and Winning Rate</div>
                <div className="lucky-wheel-prize-winning-rate-group">
                    <div className="lucky-wheel-prize-winning-rate-ele">
                        <input
                            className="prize-type prize-type-default"
                            type="text"
                            placeholder="No prize"
                            value={'No prize'}
                            disabled
                        />
                        <input
                            className="prize-rate prize-rate-default"
                            type="number"
                            name="prize-rate"
                            placeholder="100"
                            value={noPrizeRate}
                            onChange={(e) => handleChangeNoPrizeRate(e)}
                            min={0}
                            max={100}
                        />
                        <img
                            className="prize-addsub-row"
                            onClick={() => handleAdd(-1)}
                            src="/images/icon/round-create.png"
                            alt=""
                        />
                        <img
                            className="prize-addsub-row"
                            src="/images/icon/round-subs.png"
                            alt=""
                        />
                    </div>
                    <form className="overflow-auto" onSubmit={handleSubmit}>
                        {prize.length > 0 ? (
                            prize.map((sub: ILuckyWheel, index: number) => {
                                return (
                                    <div className="lucky-wheel-prize-winning-rate-ele" key={index}>
                                        <input
                                            className="prize-type"
                                            type="text"
                                            placeholder=""
                                            value={sub.prize}
                                            onChange={(e) => handlePrizeInputChange(e, index)}
                                        />
                                        <input
                                            className="prize-rate"
                                            type="number"
                                            placeholder="0"
                                            value={sub.winningRate}
                                            onChange={(e) => handleWinningRateInputChange(e, index)}
                                        />
                                        <img
                                            onClick={() => handleAdd(index)}
                                            src="/images/icon/round-create.png"
                                            alt=""
                                        />
                                        <img
                                            onClick={() => handleRemove(index)}
                                            src="/images/icon/round-subs.png"
                                            alt=""
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <></>
                        )}
                        <input type="submit" value="Submit" className="lucky-wheel-submit-btn" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default function CreateLuckyWheelPage() {
    return (
        <Layout>
            <CreateLuckyWheel />
        </Layout>
    );
}

export const Head: HeadFC = () => <title>Create Lucky Wheel</title>;
