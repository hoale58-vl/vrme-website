import * as React from 'react'
import { HeadFC, Link, navigate, PageProps } from 'gatsby'
import { CardNFT, CardNFTSkeleton, Layout } from '../components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { IToken } from '../types/token'
import { useDispatch, useSelector } from 'react-redux'
import { getList, nftSelector } from '../state/nft'

const NFTDetail: React.FC<PageProps> = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  const dispatch = useDispatch<any>()
  const { dataNFT, isLoading } = useSelector(nftSelector)
  // const { dataNFTDetail, isLoading } = useSelector(nftDetail);
  const cardNftList: IToken[] = dataNFT.data.map((item: any) => ({
    id: item?.id,
    name: item?.token?.name,
    image: item?.token?.uri,
    avatar: '',
    author: item?.token?.creator,
    price: item?.price,
    status: item?.status
  }))

  React.useEffect(() => {
    dispatch(getList({ page: 1, perPage: 3 }))
  }, [])

  // React.useEffect(() => {
  //     dispatch(getNFTDetail(id));
  // });
  // const tokenDetail: ITokenDetail;

  return (
        <Layout>
            <div className="nft-detail-background-image"></div>
            <div className="nft-detail-main">
                <div className="ntf-detail-name-group">
                    <div className="nft-detail-name">Vin Home Q8 #1</div>
                    <img className="w-8 h-8" src="/images/icon/verified.png" alt="" />
                </div>
                <div className="nft-detail-release-date">Minted on Sep 30, 2022</div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Collection</div>
                    <div className="nft-detail-collection-name">ViMRE SaiGon</div>
                </div>
                <div className="nft-detail-price-group">
                    <div className="nft-detail-onsalenow-title">On sale now!</div>
                    <div className="nft-detail-price">900000000</div>
                    <div className="nft-detail-price-unit">USDT</div>
                    <div className="nft-detail-buynow-btn-group btn">
                        <img className="w-5 h-5" src="/images/icon/wallet.png" alt="" />
                        <div className="nft-detail-buynow-btn">Buy now</div>
                    </div>
                </div>
                <div className="nft-detail-createby-group">
                    <div className="nft-detail-main-component nft-detail-main-component-1">
                        <div className="nft-detail-collection-title">Created By</div>
                        <div className="nft-detail-collection-name">HoaLe</div>
                    </div>
                    <div className="nft-detail-main-component nft-detail-main-component-1">
                        <div className="nft-detail-collection-title">Owned By</div>
                        <div className="nft-detail-collection-name">HoaLe</div>
                    </div>
                </div>
                <div className="nft-detail-main-component">
                    <div className="nft-detail-collection-title">Description</div>
                    <div className="nft-detail-collection-name">
                        Lorem ipsum dolor sit amet consectetur. Vitae aliquet cras tellus viverra
                        non nunc odio mauris blandit. In nam tempus ornare in dolor odio maecenas
                        ultricies pellentesque. Duis at ipsum in ut magna quis quisque vulputate.
                        Morbi sem tristique ultricies nisl.{' '}
                    </div>
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
                        <div className="nft-detail-tags-button">Q8</div>
                        <div className="nft-detail-tags-button">SAIGON</div>
                        <div className="nft-detail-tags-button">BUILDING</div>
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
                            <div className="nft-detail-image">
                                <img
                                    width="100%"
                                    src="/images/nft-detail-image/image-1.png"
                                    alt=""
                                />
                            </div>
                            <div className="nft-detail-image">
                                <img
                                    width="100%"
                                    src="/images/nft-detail-image/image-1.png"
                                    alt=""
                                />
                            </div>
                            <div className="nft-detail-image">
                                <img
                                    width="100%"
                                    src="/images/nft-detail-image/image-1.png"
                                    alt=""
                                />
                            </div>
                            <div className="nft-detail-image">
                                <img
                                    width="100%"
                                    src="/images/nft-detail-image/image-1.png"
                                    alt=""
                                />
                            </div>
                            <div className="nft-detail-image">
                                <img
                                    width="100%"
                                    src="/images/nft-detail-image/image-1.png"
                                    alt=""
                                />
                            </div>
                            <div className="nft-detail-image">
                                <img
                                    width="100%"
                                    src="/images/nft-detail-image/image-1.png"
                                    alt=""
                                />
                            </div>
                        </Slider>
                    </div>
                    <div className="nft-detail-more-group">
                        <div className="nft-detail-more">
                            <div className="nft-detail-more-title">More from this Collection</div>
                        </div>
                        <div className="nft-detail-more-grid">
                            {!isLoading ? (
                              cardNftList.map((token: IToken) => {
                                return (
                                        <CardNFT
                                            key={token.id}
                                            token={token}
                                            isLoading={isLoading}
                                            attribute={'card-nft-dark'}
                                        />
                                )
                              })
                            ) : (
                                <>
                                    <CardNFTSkeleton />
                                    <CardNFTSkeleton />
                                    <CardNFTSkeleton />
                                </>
                            )}
                        </div>
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
        </Layout>
  )
}

export default NFTDetail

export const Head: HeadFC = () => <title>NFT Detail</title>
