import React from 'react'
import { Header, Footer } from './partials'

interface AuxProps {
  children?: React.ReactNode
}

const Layout: React.FC<AuxProps> = ({ children }: AuxProps) => {
  return (
        <div className="max-w-screen-xl mx-auto">
            <Header />
            {children}
            <Footer />
        </div>
  )
}

export default Layout
