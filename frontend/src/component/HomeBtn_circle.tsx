import React from 'react'
interface Btnprops {
    position: any
}


const HomeBtn_circle:React.FC<Btnprops> = ({position}) => {
  return (
    <div>
      <div className={position}>
      <div className=' size-5 rounded-3xl bg-[#7BFFEF]'></div>
    </div>
    <div className={position}>
      <div className='size-10 rounded-3xl bg-[#C5FFF8]'></div>
    </div>
    </div>
  )
}

export default HomeBtn_circle
