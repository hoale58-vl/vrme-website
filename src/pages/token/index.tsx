import React from 'react'
import { HeadFC } from 'gatsby'
import Layout from 'components/layout'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { truncateLongHexString } from 'services/utilities'

const MintToken = () => {
  const { account } = useWallet()

  return (
        <>
            <div className="mint-token-page">
                <div className="mint-token-grid">
                    <div className="mint-token-title">ViMRE Token</div>
                    <div className="mint-token-grid-1_content">
                        Create your own ViMRE NFT. Please be sure all below information are filled
                        and correctly.
                    </div>
                    <div className="mint-token-grid-1_image-group">
                        <img
                            className="mint-token-grid-1_image-main"
                            src="/images/card-nft/card-nft-3.png"
                        />
                        <div className="mint-token-grid-1_image-child-group">
                            <img
                                className="mint-token-grid-1_image-child"
                                src="/images/card-nft/card-nft-3.png"
                                alt=""
                            ></img>
                            <img
                                className="mint-token-grid-1_image-child"
                                src="/images/card-nft/card-nft-3.png"
                            ></img>
                            <div className="mint-token-grid-1_image-child-2">1025+</div>
                            <div className="mint-token-grid-1_image-child-3">
                                <img className="w-8 h-8" src="/images/icon/create.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mint-token-grid">
                    <div className="mint-token-user-token-group w-full">
                        <img src="/images/icon/User.png" alt="" />
                        <div className="mint-token-user-token">
                            {account
                              ? truncateLongHexString(account.address)
                              : 'Required Wallet connect'}
                        </div>
                    </div>
                    <div className="update-profile-form-item-group w-full mint-token-input-username">
                        <img
                            width="25px"
                            className="absolute top-[16px] left-[20px]"
                            src="/images/icon/vector.png"
                            alt=""
                        />
                        <input
                            className="update-profile-form-item mint-token-input"
                            type="text"
                            placeholder="Estate name"
                        />
                    </div>
                    <div className="update-profile-form-item-group w-full mint-token-textarea">
                        <img
                            width="25px"
                            className="absolute top-[16px] left-[20px]"
                            src="/images/icon/escription.png"
                            alt=""
                        />
                        <textarea
                            className="update-profile-form-item update-profile-form-item-textarea"
                            placeholder="Your token description."
                        />
                    </div>
                    <div className="mint-token-maps"></div>
                    <div className="mint-token-grid-1_image-group-2">
                        <img
                            width="100%"
                            className="mint-token-grid-1_image-main"
                            src="/images/card-nft/card-nft-3.png"
                        />
                        <div className="mint-token-grid-1_image-child-group">
                            <img
                                className="mint-token-grid-1_image-child"
                                src="/images/card-nft/card-nft-3.png"
                                alt=""
                            ></img>
                            <img
                                className="mint-token-grid-1_image-child"
                                src="/images/card-nft/card-nft-3.png"
                            ></img>
                            <div className="mint-token-grid-1_image-child-2">1025+</div>
                            <div className="mint-token-grid-1_image-child-3">
                                <img className="w-8 h-8" src="/images/icon/create.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-small btn-dark mint-token-submit-btn">Submit</button>
        </>
  )
}

export default function Token () {
  return (
        <Layout>
            <MintToken />
        </Layout>
  )
}

export const Head: HeadFC = () => <title>Mint Token</title>
