import React from 'react'
import { Boilerplate,Category,Products, Testimonial } from "../../components";

function Home() {
  return (
    <Boilerplate height={'500px'} bgImage={'hero-texture'}>
      <Category/>
          <Products/>
          <Testimonial/>
    </Boilerplate>
  )
}
export default Home