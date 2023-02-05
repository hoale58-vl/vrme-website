import React from 'react'
import { ToastContainer } from 'react-toastify'
import Footer from './footer'
import Header from './header'
import Favicon from 'react-favicon'

interface AuxProps {
  children?: React.ReactNode
}

const Body = ({ children }: AuxProps) => {
  return (
        <>
            <Favicon url="/images/logo/vector.png" />
            <ToastContainer />
            <div className="max-w-screen-xl mx-auto">
                <Header />
                {children}
                <Footer />
            </div>
        </>
  )
}

export default Body
