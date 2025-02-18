import React from 'react'
import { Footer, FooterHeader, Header, NavPrimary } from '.'

function Boilerplate({children,className = '',bgImage,varient,height}) {
  return (
   <>
    <Header bgImage={bgImage} height={height}/>
    <main className={` bg-slate-200 p-5  ${className}`}>
    {
        children
    }
    <FooterHeader />
    </main>

    <Footer />
   </>
  )
}

export default Boilerplate