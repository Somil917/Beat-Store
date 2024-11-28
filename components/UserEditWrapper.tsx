import React from 'react'
import UserEdit from './UserEdit'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'

const UserEditWrapper = async () => {

    const product = await getActiveProductsWithPrices();

  return (
    <><UserEdit products={product} /></>
  )
}

export default UserEditWrapper