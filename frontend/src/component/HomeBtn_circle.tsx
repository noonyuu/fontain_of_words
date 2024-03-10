import React from 'react'
interface Btnprops {
    position: string
}


const HomeBtn_circle:React.FC<Btnprops> = ({position}) => {
  return (
    <div className={`${position} absolute rounded-full`}></div>
  )
}

export default HomeBtn_circle
