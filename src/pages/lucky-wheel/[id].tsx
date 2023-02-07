import React from 'react'
import { HeadFC } from 'gatsby'
import Layout from 'components/layout'
import { TokenDetailProps } from 'components/token/types'
import { SpinnerTable } from 'components/lucky-wheel/spinner-table'

const LuckyWheel = () => {
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
                        <div className="lucky-wheel-prize-color"></div>
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
                            min={0}
                            max={100}
                            disabled
                        />
                    </div>
                    <div
                        className="overflow-auto"
                    ></div>
                </div>
            </div>
        </div>
  )
}

export default function LuckyWheelPage (props: TokenDetailProps) {
  return (
        <Layout>
            <LuckyWheel />
        </Layout>
  )
}

export const Head: HeadFC = () => <title>Lucky Wheel</title>
