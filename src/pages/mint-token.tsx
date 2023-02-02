import * as React from 'react'
import { HeadFC, PageProps } from 'gatsby'
import { Layout } from '../components'
import { FewchaWalletName, useWallet } from '@manahippo/aptos-wallet-adapter'
import { WALLET_ADDRESS } from '../constant/const'

const SubmitMintToken: React.FC = () => {
  const { connect, signAndSubmitTransaction } = useWallet()
  const handleMintToken = async () => {
    const payload = {
      arguments: [
        'Vietnamese Metaverse Real Estate',
        'Nhà lầu Q8 #169',
        'Nhà rất đẹp',
        1,
        1,
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw06NgeMR75bcseMvsEhOXI4&ust=1673975851390000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCODu3pHMzPwCFQAAAAAdAAAAABAE',
        '0x2e32173fa3128bcf0c5353b10039a7598bd40718ede961b29a0099a8abcbf213',
        100,
        2,
        [false, false, false, false, false],
        [],
        [],
        []
      ],
      function: '0x3::token::create_token_script',
      type: 'entry_function_payload',
      type_arguments: []
    }
    await signAndSubmitTransaction(payload)
  }
  return (
        <>
            <button
                onClick={() => {
                  connect(FewchaWalletName)
                }}
            >
                Connect
            </button>{' '}
            <br /> <br />
            <button onClick={handleMintToken}>HAUHSUHDAD</button>
        </>
  )
}

const MintToken: React.FC<PageProps> = () => {
  return (
        <Layout>
            <SubmitMintToken />
            <div className="mint-token-page">
                <div className="mint-token-grid">
                    <div className="mint-token-title">ViRME Token</div>
                    <div className="mint-token-grid-1_content">
                        Create your own ViRME NFT. Please be sure all below information are filled
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
                        <div className="mint-token-user-token">0xc0E3...B79C</div>
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
                            placeholder="Description Lorem ipsum dolor sit amet consectetur. Vitae aliquet cras tellus viverra non nunc odio mauris blandit. In nam tempus ornare in dolor odio maecenas ultricies pellentesque. Duis at ipsum in ut magna quis quisque vulputate. Morbi sem tristique ultricies nisl."
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
        </Layout>
  )
}

export default MintToken

export const Head: HeadFC = () => <title>Mint Token</title>
