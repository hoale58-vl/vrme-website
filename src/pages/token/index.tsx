import React, { ChangeEvent, useRef } from 'react';
import { HeadFC } from 'gatsby';
import Layout from 'components/layout';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { truncateLongHexString } from 'services/utilities';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import NotConnected from 'components/common/NotConnected';
import { uploadIpfs, uploadIpfsFile } from 'services/ipfs';
import configs from 'config/config';
import { toast } from 'react-toastify';

const MintToken = () => {
    const { account, connected, signAndSubmitTransaction } = useWallet();

    if (!connected) {
        return <NotConnected />;
    }

    const mainImageInputRef = useRef<HTMLInputElement>(null);
    const subImageInputRef1 = useRef<HTMLInputElement>(null);
    const subImageInputRef2 = useRef<HTMLInputElement>(null);
    const subImageInputRef3 = useRef<HTMLInputElement>(null);
    const subImageInputRef4 = useRef<HTMLInputElement>(null);

    async function onUpload(
        event: ChangeEvent<HTMLInputElement>,
        handleChange: (url: string) => void
    ) {
        if (event.target.files) {
            uploadIpfsFile(event.target.files[0]).then((path: string) => handleChange(path));
        }
    }

    return (
        <Formik
            initialValues={{
                name: '',
                desc: '',
                location: '',
                mainImage: undefined,
                subImage1: undefined,
                subImage2: undefined,
                subImage3: undefined,
                subImage4: undefined,
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required(),
                desc: Yup.string().required(),
                location: Yup.string().required(),
                mainImage: Yup.string().required(),
                subImage1: Yup.string().required(),
                subImage2: Yup.string().required(),
                subImage3: Yup.string().required(),
                subImage4: Yup.string().required(),
            })}
            onSubmit={(values, { resetForm }) => {
                const metadata = {
                    tags: ['ViRME'],
                    location: values.location,
                    images: [
                        values.subImage1,
                        values.subImage2,
                        values.subImage3,
                        values.subImage4,
                    ],
                };

                uploadIpfs(JSON.stringify(metadata, null, 2)).then((metadataUrl: string) => {
                    const payload = {
                        arguments: [values.name, values.desc, values.mainImage, metadataUrl],
                        function: `${configs.smc.vmre_minting}::vmre_token::mint_nft`,
                        type: 'entry_function_payload',
                        type_arguments: [],
                    };

                    signAndSubmitTransaction(payload).then(() => {
                        resetForm();
                        toast.success('Submit transaction success!');
                    });
                });
            }}
        >
            {(e) => {
                const {
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    values,
                    setFieldValue,
                    handleSubmit,
                } = e;
                return (
                    <>
                        <div className="mint-token-page">
                            <div className="mint-token-grid">
                                <div className="mint-token-title">ViMRE Token</div>
                                <div className="mint-token-grid-1_content">
                                    Create your own ViMRE NFT. Please be sure all below information
                                    are filled and correctly.
                                </div>

                                <div className="mint-token-grid-1_image-group mt-4">
                                    <div className="my-4">
                                        <p>
                                            Please upload 1 main image represent for your assets
                                            "Your NFT".
                                        </p>
                                        <p>
                                            <i>
                                                It must be attractive so that people easily to
                                                interest in it.
                                            </i>
                                        </p>
                                    </div>
                                    <div
                                        className="mint-token-grid-1_image-main cursor-pointer"
                                        onClick={() => mainImageInputRef.current?.click()}
                                    >
                                        {values.mainImage ? (
                                            <img
                                                className="w-full h-full"
                                                src={values.mainImage}
                                            ></img>
                                        ) : (
                                            <img src="/images/icon/create.png" alt="" />
                                        )}
                                    </div>
                                    <div className="my-4">
                                        <p>
                                            Please upload <b>exactly</b> 3 images about your assets.
                                        </p>
                                    </div>
                                    <div className="mint-token-grid-1_image-child-group">
                                        <div
                                            className="mint-token-grid-1_image-child-3 cursor-pointer"
                                            onClick={() => subImageInputRef1.current?.click()}
                                        >
                                            {values.subImage1 ? (
                                                <img
                                                    className="w-full h-full"
                                                    src={values.subImage1}
                                                ></img>
                                            ) : (
                                                <img
                                                    className="w-8 h-8"
                                                    src="/images/icon/create.png"
                                                    alt=""
                                                />
                                            )}
                                        </div>
                                        <div
                                            className="mint-token-grid-1_image-child-3 cursor-pointer"
                                            onClick={() => subImageInputRef2.current?.click()}
                                        >
                                            {values.subImage2 ? (
                                                <img
                                                    className="w-full h-full"
                                                    src={values.subImage2}
                                                ></img>
                                            ) : (
                                                <img
                                                    className="w-8 h-8"
                                                    src="/images/icon/create.png"
                                                    alt=""
                                                />
                                            )}
                                        </div>
                                        <div
                                            className="mint-token-grid-1_image-child-3 cursor-pointer"
                                            onClick={() => subImageInputRef3.current?.click()}
                                        >
                                            {values.subImage3 ? (
                                                <img
                                                    className="w-full h-full"
                                                    src={values.subImage3}
                                                ></img>
                                            ) : (
                                                <img
                                                    className="w-8 h-8"
                                                    src="/images/icon/create.png"
                                                    alt=""
                                                />
                                            )}
                                        </div>
                                        <div
                                            className="mint-token-grid-1_image-child-3 cursor-pointer"
                                            onClick={() => subImageInputRef4.current?.click()}
                                        >
                                            {values.subImage4 ? (
                                                <img
                                                    className="w-full h-full"
                                                    src={values.subImage4}
                                                ></img>
                                            ) : (
                                                <img
                                                    className="w-8 h-8"
                                                    src="/images/icon/create.png"
                                                    alt=""
                                                />
                                            )}
                                        </div>

                                        <input
                                            className="invisible"
                                            name="mainImage"
                                            ref={mainImageInputRef}
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(event) =>
                                                onUpload(event, (url: string) => {
                                                    setFieldValue(event.target.name, url);
                                                })
                                            }
                                        />
                                        <input
                                            className="invisible"
                                            name="subImage1"
                                            ref={subImageInputRef1}
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(event) =>
                                                onUpload(event, (url: string) => {
                                                    setFieldValue(event.target.name, url);
                                                })
                                            }
                                        />
                                        <input
                                            className="invisible"
                                            name="subImage2"
                                            ref={subImageInputRef2}
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(event) =>
                                                onUpload(event, (url: string) => {
                                                    setFieldValue(event.target.name, url);
                                                })
                                            }
                                        />
                                        <input
                                            className="invisible"
                                            name="subImage3"
                                            ref={subImageInputRef3}
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(event) =>
                                                onUpload(event, (url: string) => {
                                                    setFieldValue(event.target.name, url);
                                                })
                                            }
                                        />
                                        <input
                                            className="invisible"
                                            name="subImage4"
                                            ref={subImageInputRef4}
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(event) =>
                                                onUpload(event, (url: string) => {
                                                    setFieldValue(event.target.name, url);
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <Form onSubmit={e.handleSubmit}>
                                <div>
                                    <div className="my-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Creator (You can't edit this field)
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                account && account.address
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
                                        {errors.name !== undefined && touched.name && (
                                            <p className="text-red-500 text-xs italic">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="my-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            required
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.location}
                                            className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        {errors.location !== undefined && touched.location && (
                                            <p className="text-red-500 text-xs italic">
                                                {errors.location}
                                            </p>
                                        )}
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
                                        {errors.desc !== undefined && touched.desc && (
                                            <p className="text-red-500 text-xs italic">
                                                {errors.desc}
                                            </p>
                                        )}
                                    </div>
                                    <div className="my-4">
                                        <iframe
                                            width="600"
                                            height="500"
                                            src={`https://maps.google.com/maps?q=${values.location}&t=&ie=UTF8&iwloc=&output=embed`}
                                        ></iframe>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <button
                            onClick={() => handleSubmit()}
                            className="btn btn-small btn-dark mint-token-submit-btn"
                        >
                            Submit
                        </button>
                    </>
                );
            }}
        </Formik>
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
