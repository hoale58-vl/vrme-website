import * as React from 'react'
import { HeadFC, navigate, PageProps } from 'gatsby'
import { Layout } from '../components/'
import { FewchaWalletName, useWallet } from '@manahippo/aptos-wallet-adapter'
import axios from 'axios'
import { UPDATE_PROFILE } from '../services/consts'

const ListWallet: React.FC = () => {
  const { connect } = useWallet()

  return <button onClick={async () => await connect(FewchaWalletName)}>Connect</button>
}

const UpdateProfilePage: React.FC<PageProps> = () => {
  // const [dataSubmit, setDataSubmit] = React.useState<string>();
  const nameRef = React.useRef<HTMLInputElement>(null)
  let accessToken: string = ''
  const handleUpdateProfile = async () => {
    if (typeof window !== 'undefined') {
      accessToken = localStorage.getItem('accessToken') ?? ''
    }

    if (nameRef.current) {
      const res = await axios.put(
        UPDATE_PROFILE,
        { name: nameRef.current.value },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )
      console.log(res)
    }
    navigate('/marketplace')
  }

  return (
        <Layout>
            <ListWallet />
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
                                name="username"
                                // onChange={(e) => setDataSubmit(e.target.value)}
                                ref={nameRef}
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
                        <button
                            type="submit"
                            className="update-profile-btn"
                            style={{ marginTop: '20px' }}
                            onClick={handleUpdateProfile}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default UpdateProfilePage

export const Head: HeadFC = () => <title>Update Profile</title>
