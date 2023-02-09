import React from 'react'
import { Link, navigate } from 'gatsby'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { IToken } from 'types/token'
import { toast } from 'react-toastify'
import configs from 'config/config'
import { fetcher } from 'services/fetcher'
import useSWR, { mutate } from 'swr'
import CardToken from 'components/marketplace/card-token'
import CardTokenSkeleton from 'components/marketplace/card-token-skeleton'
import TokenDetailSkeleton from 'components/token/tokenDetailSkeleton'
import { TokenData } from 'components/profile/types'
import { truncateLongHexString } from 'services/utilities'

// interface IBuyBtn {
//     id: number;
// }

// const BuyBtn: React.FC<IBuyBtn> = ({ id }) => {
//     const { signAndSubmitTransaction, connected } = useWallet();
//     const handleBuyBtn = async (id: number) => {
//         if (!connected) {
//             navigate('/connect');
//             toast('Please connect a wallet');
//         }
//         const payload = {
//             arguments: [MARKETPLACE_ADDR_ARG, id],
//             function: `${MARKETPLACE_ADDR_FUNC}::marketplace::buy_token`,
//             type: 'entry_function_payload',
//             type_arguments: ['0x1::aptos_coin::AptosCoin'],
//         };
//         const result = await signAndSubmitTransaction(payload);
//         if (result) {
//         } else {
//         }
//     };
//     return (
//         <div className="nft-detail-buynow-btn-group btn">
//             <img className="w-5 h-5" src="/images/icon/wallet.png" alt="" />
//             <div
//                 className="nft-detail-buynow-btn"
//                 onClick={async () => {
//                     await handleBuyBtn(id);
//                 }}
//             >
//                 Buy now
//             </div>
//         </div>
//     );
// };

function ListTokens () {
  const search = new URLSearchParams({
    page: '1',
    limit: '4'
  }).toString()
  const endpoint = `${configs.api.offers.list}?${search}`

  const { data, isLoading } = useSWR(endpoint, fetcher, {
    onError: (error) => {
      toast.error(error)
    }
  })

  if (isLoading) {
    return (
            <div className="nft-detail-more-grid">
                {Array.from(Array(3).keys()).map((_, index) => (
                    <CardTokenSkeleton key={index} />
                ))}
            </div>
    )
  }
  if (data) {
    if (data.total === 0) {
      return (
                <div className="text-center">
                    <h4 className="text-white">No data</h4>
                    <button
                        className="btn btn-dark btn-small m-auto"
                        onClick={async () => await mutate(endpoint)}
                    >
                        Reload
                    </button>
                </div>
      )
    } else {
      return (
                <div className="nft-detail-more-grid">
                    {data.data.map((token: IToken) => {
                      return <CardToken key={token.id} tokenInfo={token} />
                    })}
                </div>
      )
    }
  }
  return (
        <div className="text-center">
            <h4 className="text-white">Loading failed! Please try again</h4>
            <button onClick={async () => await mutate(endpoint)}>Reload</button>
        </div>
  )
}

export function TokenDetail ({ id: tokenDataIdHash }: { id: string }) {
  const search = new URLSearchParams({
    tokenDataIdHash: 'ee9ac24cb7a85b114609ca30572e604584dbf35e92f14f09bfa19af98bdf5f3e'
  })
  const endpoint = `${configs.api.offers.list}?${search.toString()}`
  console.log(endpoint)

  const { data, isLoading, mutate } = useSWR(endpoint, fetcher, {
    onError: (error) => {
      toast.error(error)
    }
  })

  if (isLoading) {
    return <TokenDetailSkeleton />
  }
  if (data) {
    if (data.data?.length === 0) {
      return (
                <div className="min-h-screen">
                    <div className="text-center">
                        <h4 className="text-white">No data</h4>
                        <button
                            className="btn btn-dark btn-small m-auto"
                            onClick={async () => await mutate()}
                        >
                            Reload
                        </button>
                    </div>
                </div>
      )
    } else {
      const token = data.data[0] as TokenData
      console.log(token)

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }

      console.log(configs)

      return (
                <>
                    <div className="nft-detail-background-image">
                        <img
                            className="nft-detail-background"
                            src={token.token.uri}
                            alt="tokenUrl"
                        />
                    </div>
                    <div className="nft-detail-main">
                        <div className="ntf-detail-name-group">
                            <div className="nft-detail-name">{token.token.name}</div>
                            {token.token.verified ? (
                                <img className="w-8 h-8" src="/images/icon/verified.png" alt="" />
                            ) : (
                                <img className="w-8 h-8" src="/images/icon/unverified.png" alt="" />
                            )}
                        </div>
                        <div className="nft-detail-release-date">
                            Last transaction at {token.last_transaction_timestamp}
                        </div>
                        <div className="nft-detail-main-component">
                            <div className="nft-detail-collection-title">Collection</div>
                            <div className="nft-detail-collection-name">
                                {configs.smc.collection_name}
                            </div>
                        </div>
                        <div className="nft-detail-price-group">
                            <div className="nft-detail-onsalenow-title">On sale now!</div>
                            <div className="nft-detail-price">Price</div>
                            <div className="nft-detail-price-reality">{token.price}</div>
                            <div className="nft-detail-price-unit">
                                {configs.smc.marketplace_coin_symbol}
                            </div>
                            {/* <BuyBtn id={location.state?.id} /> */}
                        </div>
                        <div className="nft-detail-createby-group">
                            <div className="nft-detail-main-component nft-detail-main-component-1">
                                <div className="nft-detail-collection-title">Created By</div>
                                <div
                                    className="nft-detail-collection-name"
                                    onClick={async () =>
                                      await navigator.clipboard
                                        .writeText(token.owner_address)
                                        .then(() => {
                                          toast.success('Copied owner address to clipboard')
                                        })
                                    }
                                >
                                    {truncateLongHexString(token.token.creator)}
                                </div>
                            </div>
                            <div className="nft-detail-main-component nft-detail-main-component-1">
                                <div className="nft-detail-collection-title">Owned By</div>
                                <div
                                    className="nft-detail-collection-name"
                                    onClick={async () =>
                                      await navigator.clipboard.writeText('Seller').then(() => {
                                        toast.success('Copied owner address to clipboard')
                                      })
                                    }
                                >
                                    Seller
                                </div>
                            </div>
                        </div>
                        <div className="nft-detail-main-component">
                            <div className="nft-detail-collection-title">Description</div>
                            <div className="nft-detail-collection-name">{token.name}</div>
                        </div>
                        <div className="nft-detail-main-component">
                            <div className="nft-detail-collection-title">Details</div>
                            <div className="nft-detail-detail-group">
                                <div className="nft-detail-detail-component">
                                    <img
                                        className="nft-detail-detail-icon"
                                        src="/images/social-media-logo/globe.png"
                                        alt=""
                                    />
                                    <div
                                        className="nft-detail-detail-title"
                                        onClick={() => {
                                          navigate('https://explorer.aptoslabs.com/')
                                        }}
                                    >
                                        View on Explore
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nft-detail-main-component">
                            <div className="nft-detail-collection-title nft-detail-collection-title-2">
                                Tags
                            </div>
                            <div className="nft-detail-tags-group">
                                {token?.token.metadata ? (
                                  JSON.parse(token?.token.metadata).tags.map((item: any) => {
                                    return (
                                            <div className="nft-detail-tags-button" key={item}>
                                                {item}
                                            </div>
                                    )
                                  })
                                ) : (
                                    <div className="nft-detail-collection-name">No Tag</div>
                                )}
                            </div>
                        </div>
                        <div className="nft-detail-main-component">
                            <div className="nft-detail-collection-title">Properties</div>
                            <div className="nft-detail-location-group">
                                <img src="/images/icon/location.png" alt="" />
                                <div className="nft-detail-location">Location</div>
                            </div>
                            <div className="nft-detail-google-maps"></div>
                            <div className="nft-detail-location-group">
                                <img src="/images/icon/images.png" alt="" />
                                <div className="nft-detail-location">Images</div>
                            </div>
                            <div className="nft-detail-slide-image">
                                <Slider {...settings}>
                                    {token.token.metadata ? (
                                      JSON.parse(token.token.metadata).images.map((item: any) => {
                                        console.log(item)
                                        return (
                                                <div className="nft-detail-image" key={item}>
                                                    <img width="100%" src={item} alt="" />
                                                </div>
                                        )
                                      })
                                    ) : (
                                        <div className="nft-detail-image text-center text-2xl">
                                            No Image
                                        </div>
                                    )}
                                </Slider>
                            </div>
                            <div className="nft-detail-more-group">
                                <div className="nft-detail-more">
                                    <div className="nft-detail-more-title">Check More</div>
                                </div>
                                <ListTokens />
                                <Link to="/marketplace">
                                    <div className="nft-detail-go-to-marketplace-btn-group">
                                        <img
                                            className="w-5 h-5"
                                            src="/images/icon/arrow-right.png"
                                            alt=""
                                        />
                                        <div className="nft-detail-go-to-marketplace-btn">
                                            Go To Marketplace
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
      )
    }
  }
  return (
        <div className="min-h-screen">
            <div className="text-center">
                <h4 className="text-white">Loading failed! Please try again</h4>
                <button onClick={async () => await mutate()}>Reload</button>
            </div>
        </div>
  )
}
