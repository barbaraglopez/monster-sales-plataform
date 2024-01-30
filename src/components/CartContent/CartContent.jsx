import React from 'react'
import {CartElements} from './CartElements'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export const CartContent = () => {
  return (
    <div className="">
      <Navbar />
      <CartElements/>
      <Footer />
    </div>
  );
}

