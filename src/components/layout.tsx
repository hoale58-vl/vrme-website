import React from 'react'
import { Provider } from 'react-redux'
import store from '../app/store'
import { Header, Footer } from './partials'
// import {wrapRootElement} from '../'

interface AuxProps {
  children?: React.ReactNode
}

const Layout: React.FC<AuxProps> = ({ children }: AuxProps) => {
  return (
      // <wrapRootElement>
          <Provider store={store}>
              <div className="max-w-screen-xl mx-auto">
                  <Header />
                  {children}
                  <Footer />
              </div>
          </Provider>
      
  );
}

export default Layout
