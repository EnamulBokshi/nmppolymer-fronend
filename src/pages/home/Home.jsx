import React from 'react'
import { Boilerplate,Category,NewsHome,Products, Testimonial } from "../../components";

function Home() {
  return (
    <Boilerplate height={'500px'} bgImage={'hero-texture'}>
      <Category/>
          <Products/>
          <NewsHome/>
          <Testimonial/>
    </Boilerplate>
  )
}
export default Home