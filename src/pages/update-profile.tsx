import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import { Layout } from '../components/'

const UpdateProfilePage: React.FC<PageProps> = () => {
  return (
        <Layout>
            <div className="update-profile-body">
                <div className="update-profile-image"></div>
                <div className="update-profile-content-group">
                    <div className="update-profile-title">Update Profile</div>
                    <div className="update-profile-content">
                        Welcome! enter your details and start creating, collecting and selling NFTs.
                    </div>
                    <div className="update-profile-form">
                        <div className="update-profile-form-item-spec">
                            <img
                                width="20px"
                                className="absolute top-[13px] left-[20px]"
                                src="/images/icon/copy.png"
                                alt=""
                            />
                            0xc0E3...B79C
                        </div>
                        <div className="update-profile-form-item-group">
                            <img
                                width="20px"
                                className="absolute top-[13px] left-[20px]"
                                src="/images/icon/user.png"
                                alt=""
                            />
                            <input
                                className="update-profile-form-item"
                                type="text"
                                placeholder="Username"
                            />
                        </div>
                        <div className="update-profile-form-item-group">
                            <img
                                width="20px"
                                className="absolute top-[13px] left-[20px]"
                                src="/images/icon/envelope-simple.png"
                                alt=""
                            />
                            <input
                                className="update-profile-form-item"
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="update-profile-form-item-group">
                            <img
                                width="20px"
                                className="absolute top-[13px] left-[20px]"
                                src="/images/icon/phone-number.png"
                                alt=""
                            />
                            <input
                                className="update-profile-form-item"
                                type="text"
                                placeholder="Phonenumber"
                            />
                        </div>
                    </div>
                    <button className="update-profile-btn">Update</button>
                </div>
            </div>
        </Layout>
  )
}

export default UpdateProfilePage

export const Head: HeadFC = () => <title>Update Profile</title>
