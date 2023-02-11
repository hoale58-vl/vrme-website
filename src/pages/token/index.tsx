import React from 'react';
import { HeadFC } from 'gatsby';
import Layout from 'components/layout';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { truncateLongHexString } from 'services/utilities';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import NotConnected from 'components/common/NotConnected';

const MintToken = () => {
    const { account, connected } = useWallet();

    if (!connected) {
        return <NotConnected />;
    }

    return (
        <>
            <div className="mint-token-page">
                <div className="mint-token-grid">
                    <div className="mint-token-title">ViMRE Token</div>
                    <div className="mint-token-grid-1_content">
                        Create your own ViMRE NFT. Please be sure all below information are filled
                        and correctly.
                    </div>

                    <div className="mint-token-grid-1_image-group mt-4">
                        <div className="my-4">
                            <p>Please upload 1 main image represent for your assets "Your NFT".</p>
                            <p>
                                <i>
                                    It must be attractive so that people easily to interest in it.
                                </i>
                            </p>
                        </div>
                        <div className="mint-token-grid-1_image-main cursor-pointer">
                            <img src="/images/icon/create.png" alt="" />
                        </div>
                        <div className="my-4">
                            <p>
                                Please upload <b>exactly</b> 3 images about your assets.
                            </p>
                        </div>
                        <div className="mint-token-grid-1_image-child-group">
                            <div className="mint-token-grid-1_image-child-3 cursor-pointer">
                                <img className="w-8 h-8" src="/images/icon/create.png" alt="" />
                            </div>
                            <div className="mint-token-grid-1_image-child-3 cursor-pointer">
                                <img className="w-8 h-8" src="/images/icon/create.png" alt="" />
                            </div>
                            <div className="mint-token-grid-1_image-child-3 cursor-pointer">
                                <img className="w-8 h-8" src="/images/icon/create.png" alt="" />
                            </div>
                            <div className="mint-token-grid-1_image-child-3 cursor-pointer">
                                <img className="w-8 h-8" src="/images/icon/create.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        desc: '',
                        address: '',
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required(),
                        desc: Yup.string().required(),
                        address: Yup.string().required(),
                    })}
                    onSubmit={(values) => {}}
                >
                    {(e) => {
                        const { errors, touched, handleBlur, handleChange, values } = e;
                        return (
                            <>
                                <Form onSubmit={e.handleSubmit}>
                                    <div>
                                        <div className="my-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Creator (You can't edit this field)
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    account
                                                        ? truncateLongHexString(account.address)
                                                        : 'Required Wallet connect'
                                                }
                                                className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                disabled
                                            />
                                        </div>

                                        <div className="my-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Estate name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="my-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                required
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.address}
                                                className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="my-4">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Descrition
                                            </label>
                                            <textarea
                                                name="desc"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.desc}
                                                className="text-black block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            ></textarea>
                                        </div>
                                        <div className="my-4">
                                            <iframe
                                                width="600"
                                                height="500"
                                                src={`https://maps.google.com/maps?q=${values.address}&t=&ie=UTF8&iwloc=&output=embed`}
                                            ></iframe>
                                        </div>
                                    </div>
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </div>
            <button className="btn btn-small btn-dark mint-token-submit-btn">Submit</button>
        </>
    );
};

export default function Token() {
    return (
        <Layout>
            <MintToken />
        </Layout>
    );
}

export const Head: HeadFC = () => <title>Mint Token</title>;
