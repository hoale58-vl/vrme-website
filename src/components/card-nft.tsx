import { Link, navigate } from 'gatsby'
import React, { useState } from 'react'
import { IToken } from '../types/token'
import CardNFTSkeleton from './card-nft-skeleton'
import { Tooltip, Modal } from 'antd'
import { useWallet } from '@manahippo/aptos-wallet-adapter'
import { MARKETPLACE_ADDR_ARG, MARKETPLACE_ADDR_FUNC } from '../constant/const'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

interface CardProps {
  tokenInfo: IToken
  isLoading: boolean
  attribute?: string | undefined
}

const CardNFT: React.FC<CardProps> = ({ tokenInfo, attribute }) => {
  const { id, price, status, token, seller } = tokenInfo
  const { name, uri, verified, creator } = token
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const copied: boolean = false
  // const [copied, setCopied] = useState<boolean>(false);

  const avatar = Math.ceil(Math.random() * 20)

  const { signAndSubmitTransaction, connected } = useWallet()

  const handleBuyBtn = async (id: number) => {
    if (!connected) {
      navigate('/connect-wallet')
      toast('Please connect a wallet')
    }
    const payload = {
      arguments: [MARKETPLACE_ADDR_ARG, id],
      function: `${MARKETPLACE_ADDR_FUNC}::marketplace::buy_token`,
      type: 'entry_function_payload',
      type_arguments: ['0x1::aptos_coin::AptosCoin']
    }
    console.log(payload)
    const result = await signAndSubmitTransaction(payload)
    if (result) {
      console.log('Transaction Success')
      // await hippoWallet?.refreshStores();
    } else {
      console.log('Errrrrr')
    }
  }

  return (
        <>
            {uri ? (
                <Link to={'/nft-detail'} state={{ id, price, status, token, seller }}>
                    <div className={`card-nft ${attribute ?? ''}`}>
                        <div className="card-nft-img">
                            <img style={{ width: '100%' }} src={uri} alt="image" />
                        </div>

                        <div className="card-nft-info">
                            <div className="card-nft-name-group">
                                <Tooltip placement="top" color={'#a259ff'} title={name}>
                                    <div className="card-nft-name">{name}</div>
                                </Tooltip>
                                <img
                                    className="w-5 h-5"
                                    src={
                                        !verified
                                          ? '/images/icon/unverified.png'
                                          : '/images/icon/verified.png'
                                    }
                                    alt={
                                        !verified
                                          ? 'This token has been unverified'
                                          : 'This token has been verifed'
                                    }
                                />
                            </div>

                            <div className="card-nft-author-group">
                                <div className="card-nft-author-avatar">
                                    <img
                                        className="w-6 h-6"
                                        src={`/images/avatars/avatar-${avatar}.png`}
                                        alt=""
                                    />
                                </div>
                                <CopyToClipboard text={creator}>
                                    <Tooltip
                                        placement="top"
                                        color={'#a259ff'}
                                        title={!copied ? 'Copy to clipboard' : 'Copied'}
                                    >
                                        <div
                                            className="card-nft-author-name"
                                            onClick={(e) => {
                                              e.preventDefault()
                                              toast('Copied')
                                            }}
                                        >
                                            {creator?.slice(0, 6) + '..' + creator?.slice(-4)}
                                        </div>
                                    </Tooltip>
                                </CopyToClipboard>
                            </div>

                            <div className="card-nft-price-group">
                                <div className="price-label">Price</div>
                                <div className="card-nft-price gap-1">
                                    {Number(Number(price) / 100000000).toFixed(2)} USDT
                                </div>
                            </div>
                            <button
                                className="btn btn-dark card-nft-btn"
                                onClick={async (e) => {
                                  e.preventDefault()
                                  setModalOpen(true)
                                }}
                            >
                                <img
                                    className="w-5 h-5"
                                    src="/images/icon/rocket-launch.png"
                                    alt=""
                                />
                                Buy
                            </button>
                            <Modal
                                title="Are you sure about this?"
                                centered
                                open={modalOpen}
                                onOk={(e) => {
                                  e.preventDefault()
                                  setModalOpen(false)
                                }}
                                onCancel={(e) => {
                                  e.preventDefault()
                                  setModalOpen(false)
                                }}
                                footer={[
                                    <div key={1} className="modal-footer">
                                        <button
                                            className="btn btn-dark btn-small btn-modal-buy"
                                            onClick={async (e) => {
                                              e.preventDefault()
                                              await handleBuyBtn(id)
                                            }}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            className="btn btn-light btn-small btn-modal-buy"
                                            onClick={(e) => {
                                              e.preventDefault()
                                              setModalOpen(false)
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ]}
                            >
                                You will pay ${Number(Number(price) / 100000000).toFixed(2)} for
                                this token
                            </Modal>
                        </div>
                    </div>
                </Link>
            ) : (
                <CardNFTSkeleton />
            )}
        </>
  )
}

export default CardNFT
