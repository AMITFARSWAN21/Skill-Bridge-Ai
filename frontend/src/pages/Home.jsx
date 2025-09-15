import React from 'react'
import { Banner } from '../components/Banner'
import { Feature } from '../components/Feature'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { FAQ } from './FAQ'


export const Home = () => {
  return (
   <>
    <Banner/>
    <Feature/>
    <WhyChooseUs/>
    <FAQ/>
   </>
  
  )
}
