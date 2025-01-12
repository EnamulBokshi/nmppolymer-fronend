import React from 'react'
import { Footer, Header, NavPrimary } from '.'

function Boilerplate({children}) {
  return (
   <>
    <Header />
    <main>
    {
        children
    }
    </main>
    <Footer />
   </>
  )
}

export default Boilerplate