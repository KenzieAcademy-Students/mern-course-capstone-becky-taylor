import React from 'react'
import BusinessInfo from 'components/BusinessInfo'
import ProductsList from 'components/ProductsList'

export default function BusinessStore(props) {

  return (
    <div>
      Hello from store
      <BusinessInfo />
      <ProductsList />
    </div>
  )
}
