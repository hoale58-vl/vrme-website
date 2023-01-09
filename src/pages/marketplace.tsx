import * as React from 'react'
import { HeadFC, navigate, PageProps } from 'gatsby'
import { Layout, CardNFT, Collection, CollectionSkeleton, CardNFTSkeleton } from '../components'
import { CollectionData } from '../data/'
import { Tabs, Pagination } from 'antd'
import { IToken } from '../types/token'
import { useDispatch, useSelector } from 'react-redux'
import { getList, nftSelector } from '../state/nft'
import { MARKETPLACE_ADDR_ARG, MARKETPLACE_ADDR_FUNC } from '../constant/const'
import { FewchaWalletName, useWallet } from '@manahippo/aptos-wallet-adapter'

const ListToken: React.FC = () => {
  const { signAndSubmitTransaction, connect } = useWallet()

  // const [listToken, setListToken] = useState<any>([])
  // new URLSearchParams(this.props.location.search).get('__firebase_request_key');

  // React.useEffect(() => {
  //   const listTokenQuery = `query MyQuery {
  //                                   current_token_ownerships(
  //                                   where: {amount: {_eq: 1}, owner_address: {_eq: "${WALLET_ADDRESS}"}}
  //                                   limit: 10
  //                                   offset: 0
  //                                   ) {
  //                                   collection_name
  //                                   creator_address
  //                                   name
  //                                   current_token_data {
  //                                       metadata_uri
  //                                   }
  //                                   }
  //                               }`

  //   const listToken = async () => {
  //     try {
  //       const res = await axios.post(
  //         'https://indexer-devnet.staging.gcp.aptosdev.com/v1/graphql',
  //         {
  //           query: listTokenQuery
  //         }
  //       )
  //       // setListToken(res.data.data.current_token_ownerships)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   listToken()
  // }, [])

  const handleConnect = () => {
    connect(FewchaWalletName)
  }

  const handleListToken = async () => {
    const payload = {
      arguments: [
        MARKETPLACE_ADDR_ARG,
        '0x603f483e806badfe8ebf83e59a719f1b8e2bdf14a06452910cfcf82f43ffb95',
        'Vietnamese Metaverse Real Estate',
        'Somebody Home #5',
        0,
        1,
        10
      ],
      function: `${MARKETPLACE_ADDR_FUNC}::marketplace::list_token`,
      type: 'entry_function_payload',
      type_arguments: ['0x1::aptos_coin::AptosCoin']
    }
    const result = await signAndSubmitTransaction(payload)
    if (result) {
      console.log('List Token Transaction Success')
      // await hippoWallet?.refreshStores();
    } else {
      console.log('Errrrrr')
    }
  }

  return (
        <>
            <button onClick={handleListToken}>ListToken</button> <br /> <br />
            <button onClick={handleConnect}>Connect</button> <br /> <br />
        </>
  )
}

const Marketplace: React.FC<PageProps> = () => {
  const dispatch = useDispatch<any>()
  const [tab, setTab] = React.useState<number>(1)
  const { dataNFT, isLoading } = useSelector(nftSelector)

  const cardNftList: IToken[] = dataNFT.data.map((item: any) => ({
    id: item?.id,
    name: item?.token?.name,
    image: item?.token?.uri,
    avatar: '',
    author: item?.token?.creator,
    price: item?.price,
    status: item?.status
  }))

  const handleOnChangePagination = (page: number, pageSize: number) => {
    navigate(`?page=${page}`)
    dispatch(getList({ page, perPage: 12 }))
  }

  const handleChangeTabKey = async (id: string) => {
    setTab(+id)
    navigate(`?tab=${id}`)
  }

  React.useEffect(() => {
    dispatch(getList({ page: 1, perPage: 12 }))
  }, [])

  return (
        <Layout>
            <ListToken />
            <div className="browse-marketplace">
                <div className="browse-marketplace-title">Browse Marketplace</div>
                <div className="browse-market-place-content">
                    Browse ViRME NFTs on the NFT Marketplace.
                </div>
                <div className="browse-marketplace-search-bar-group" hidden>
                    <div className="browse-marketplace-search-bar w-full">
                        <input
                            className="browse-marketplace-search-bar-input"
                            type="text"
                            placeholder="Search your favourite NFTs"
                        />
                        <img
                            className="browse-marketplace-search-bar-icon"
                            src="/images/icon/magnifying-glass.png"
                            alt=""
                        />
                    </div>
                    <div className="browse-marketplace-filter">
                        <img className="w-10 h-10" src="/images/icon/filter.png" alt="" />
                    </div>
                </div>
            </div>
            <Tabs
                defaultActiveKey="1"
                activeKey={String(tab)}
                centered={true}
                className="marketplace-tabs"
                onChange={handleChangeTabKey}
            >
                <Tabs.TabPane
                    className="tabpane"
                    tab={
                        <>
                            <span className="tabpane-title">
                                NFTs <div className="tabpane-count">{dataNFT.total}</div>
                            </span>
                        </>
                    }
                    key="1"
                >
                    {tab === 1 && (
                        <>
                            <div className="tabpane-content">
                                {!isLoading ? (
                                  cardNftList.map((token: IToken) => {
                                    return (
                                            <CardNFT
                                                key={token.id}
                                                token={token}
                                                isLoading={isLoading}
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
                            <Pagination
                                defaultCurrent={1}
                                pageSize={12}
                                total={dataNFT.total}
                                onChange={handleOnChangePagination}
                            />
                        </>
                    )}
                </Tabs.TabPane>
                <Tabs.TabPane
                    className="tabpane"
                    tab={
                        <span className="tabpane-title">
                            Collections <div className="tabpane-count">67</div>
                        </span>
                    }
                    key="2"
                >
                    {tab === 2 && (
                        <>
                            <div className="tabpane-content">
                                {CollectionData.map(
                                  (
                                    item: {
                                      name: string
                                      avatar: string
                                      author: string
                                      images: string[]
                                    },
                                    index
                                  ) => {
                                    return (
                                            <Collection onSetTab={setTab} key={index} {...item} />
                                    )
                                  }
                                )}
                                <CollectionSkeleton />
                            </div>
                            <Pagination
                                // defaultCurrent={1}
                                // total={500}
                                onChange={handleOnChangePagination}
                            />
                        </>
                    )}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
  )
}

export default Marketplace

export const Head: HeadFC = () => <title>Marketplace</title>
