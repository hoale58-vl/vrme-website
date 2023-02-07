import React, { useContext } from 'react'
import { HeadFC, navigate } from 'gatsby'
import Layout, { UserContext } from 'components/layout'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { SIGNIN_MESSAGE } from 'services/user/types'
import { SignMessageResponse } from '@aptos-labs/wallet-adapter-core'
import { login } from 'services/user'
import { toast } from 'react-toastify'
import { truncateLongHexString } from 'services/utilities'

function UpdateProfile () {
  const nameRef = React.useRef<HTMLInputElement>(null)

  const { connected, signMessage, account } = useWallet()
  const { user, setUser } = useContext(UserContext)

  const Button = () => {
    if (!connected || !account) {
      return (
                <button
                    className="update-profile-btn"
                    onClick={async () => await navigate('/connect')}
                >
                    Connect
                </button>
      )
    }
    if (user === null) {
      return (
                <button
                    className="update-profile-btn"
                    onClick={() => {
                      signMessage({
                        address: true,
                        application: false,
                        chainId: true,
                        message: SIGNIN_MESSAGE,
                        nonce: '0'
                      }).then((signedMsg) => {
                        const publicKey = account.publicKey
                        if (publicKey) {
                          const { address, signature } = signedMsg as SignMessageResponse
                          login(address, `0x${signature}`, publicKey.toString())
                            .then((_user) => {
                              if (_user) {
                                toast.success('Login success')
                                setUser(_user)
                              }
                            })
                            .catch((error) => toast.error(error.toString()))
                        } else {
                          toast.error('Get current account public key failed')
                        }
                      })
                    }}
                >
                    Login
                </button>
      )
    }
    return (
            <button className="update-profile-btn" type="submit">
                Update
            </button>
    )
  }

  return (
        <>
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
                            {connected && account
                              ? truncateLongHexString(account.address)
                              : 'Required wallet connect'}
                        </div>
                        {connected && account && (
                            <>
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
                            </>
                        )}
                        <Button />
                    </div>
                </div>
            </div>
        </>
  )
}

export default function UpdateProfilePage () {
  return (
        <Layout>
            <UpdateProfile />
        </Layout>
  )
}

export const Head: HeadFC = () => <title>Update Profile</title>
