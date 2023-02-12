import { HeadFC, navigate } from 'gatsby';
import React, { useState } from 'react';
import { Pagination, Tooltip } from 'antd';
import Layout from 'components/layout';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import useSWR from 'swr';
import { graphqlFetcher } from 'services/fetcher';
import { toast } from 'react-toastify';
import { truncateLongHexString } from 'services/utilities';
import configs from 'config/config';
import { TokenGraphQLData } from 'components/profile/types';
import CardToken from 'components/profile/card-token';
import CardTokenSkeleton from 'components/marketplace/card-offer-skeleton';
import NotConnected from 'components/common/NotConnected';

const LIMIT = 12;

const Profile = () => {
    const { account, connected } = useWallet();

    if (!connected) {
        return NotConnected();
    }

    const [page, setPage] = useState(1);

    const query = `query OwnedTokens {
        current_token_ownerships(
            where: {
                owner_address: {_eq: "${account ? account?.address : ''}"},
                creator_address: {_eq: "${configs.smc.creator_addr}"},
                collection_name: {_eq: "${configs.smc.collection_name}"}
            }
            limit: ${LIMIT}
            offset: ${(page - 1) * LIMIT}
        ) {
            token_data_id_hash
            name
            owner_address
            current_token_data {
                metadata_uri
                description
            }
            last_transaction_timestamp
        }
    }`;

    const { data, isLoading, mutate } = useSWR(query, graphqlFetcher, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const ListTokens = () => {
        if (isLoading) {
            return (
                <div className="tabpane-content">
                    {Array.from(Array(12).keys()).map((_, index) => (
                        <CardTokenSkeleton key={index} />
                    ))}
                </div>
            );
        }
        if (data) {
            if (data.data.current_token_ownerships.length === 0) {
                return (
                    <div className="min-h-screen">
                        <div className="text-center">
                            <h4 className="text-white">
                                <p>
                                    <b>No Data!</b>
                                </p>
                                <p>Do you own any estate?</p>
                                <p>Create new NFT based on your own estate now!!</p>
                            </h4>
                            <button
                                className="btn btn-dark btn-small m-auto"
                                onClick={async () => await navigate('/token')}
                            >
                                Mint ViMRE
                            </button>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="tabpane-content">
                        {data.data.current_token_ownerships.map((token: TokenGraphQLData) => {
                            return <CardToken key={token.name} token={token} />;
                        })}
                    </div>
                );
            }
        }
        return (
            <div className="min-h-screen">
                <div className="text-center">
                    <h4 className="text-white">Loading failed! Please try again</h4>
                    <button onClick={async () => await mutate()}>Reload</button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="user-info-background-group">
                <div className="user-info-background-image"></div>
                <div className="user-info-avatar">
                    <img
                        src="/images/avatars/avatar-placeholder.png"
                        alt=""
                        className="w-[120px]"
                    />
                </div>
            </div>
            <div className="user-info-main-group">
                <div className="user-info-main-user-group">
                    <div className="user-info-main-username-group">
                        <div className="user-info-main-username">Anonymous User</div>
                        {/* <div className="user-info-main-verify-user">
                            <img className="w-8" src="/images/icon/verified.png" alt="" />
                        </div> */}
                    </div>
                    <div className="user-info-desc-info">
                        <div className="user-info-btn-group">
                            <Tooltip placement="top" color={'#a259ff'} title={'Copy to clipboard'}>
                                <div
                                    className="token-btn btn btn-medium btn-dark"
                                    onClick={async () =>
                                        await navigator.clipboard
                                            .writeText(account?.address ?? '')
                                            .then(() => {
                                                toast.success('Copied owner address to clipboard');
                                            })
                                    }
                                >
                                    <img className="w-5" src="/images/icon/copy.png" alt="" />
                                    <div className="token-btn-content">
                                        {account?.address && truncateLongHexString(account.address)}
                                    </div>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen">
                <ListTokens />
            </div>
            {data && data.total > 0 && (
                <Pagination
                    current={page}
                    pageSize={LIMIT}
                    total={data?.total ?? 0}
                    onChange={setPage}
                />
            )}
        </>
    );
};

export default function ProfilePage() {
    return (
        <Layout>
            <Profile />
        </Layout>
    );
}

export const Head: HeadFC = () => <title>User Info Page</title>;
