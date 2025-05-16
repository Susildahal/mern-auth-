import {  useContext, useState } from "react";

const countercontex= useContext("")
import React from 'react'

const Countprovider= (children) => {
    const [count ,setCount] =useState(1)
  return ( 
      <countercontex.provider  vlues={{count , setCounter}} >
    {children}
    </countercontex.provider>
  )
}

export default Countprovider
