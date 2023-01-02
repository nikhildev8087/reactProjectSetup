import React from 'react'
import { useSelector } from 'react-redux'

const DefaultLayout = () => {
    const loginFlag = useSelector((state) => state?.auth?.loginFlag);

  return (
    <>
      
            <div className='main-wrapper'>

            </div>
            
       
    </>
  )
}

export default DefaultLayout
