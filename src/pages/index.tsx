import * as React from 'react'
import { HeadFC, Link, PageProps } from 'gatsby'
import { Layout, CardGetStarted } from '../components/'
import { CardGetStartedData } from '../data'
import { Provider } from 'react-redux'
import store from '../app/store'

const IndexPage: React.FC<PageProps> = () => {
  return (
        <Layout>
            <main className="landing-main">
                <div className="landing-main-group">
                    <div className="landing-main-intro-block">
                        <div className="landing-main-intro">Vietnamese Metaverse Real Estate</div>
                        <div className="landing-main-intro-content">
                            ViMRE - Collect, buy and sell Vietnamese digital real estate from more
                            than 20k NFT Landlord.
                        </div>
                        <Link to="/marketplace">
                            <button className="btn-get-started btn btn-dark btn-medium">
                                <img className="icon" src="/images/icon/rocket-launch.png" alt="" />
                                <div className="">Get Started</div>
                            </button>
                        </Link>
                    </div>
                    <div className="landing-main-intro-block">
                        <img className="w-full" src="/images/introduce/introduce.png" alt="" />
                    </div>
                </div>

                <div className="how-it-work-group">
                    <div className="how-it-work-intro">
                        <div className="header-content">How It Works</div>
                        <div className="landing-content">Find Out How To Get Started</div>
                    </div>
                    <div className="how-it-work-grid">
                        {CardGetStartedData.map(
                          (
                            item: { image: string, title: string, content: string },
                            index: number
                          ) => {
                            return <CardGetStarted key={index} {...item} />
                          }
                        )}
                    </div>
                </div>
            </main>
            <div className="join-us-mobile">
                <img className="join-us-mobile-image" src="/images/introduce/joinus.png" alt="" />
                <div className="join-us-mobile-title">Join Our Weekly Digest</div>
                <div className="join-us-mobile-content">
                    Get exclusive promotions & updates straight to your inbox.
                </div>
                <div className="join-us-mobile-email-input-group">
                    <input
                        className="join-us-mobile-input"
                        type=""
                        placeholder="Enter your email here"
                    />
                    <button className="join-us-mobile-btn btn btn-small btn-dark">
                        <img className="icon" src="/images/icon/envelope-simple.png" alt="" />
                        <div className="font-semibold leading-[22.4px]">Subscribe</div>
                    </button>
                </div>
            </div>
        </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
