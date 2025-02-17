import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
const Loader = ({children}) => {
  let loader = useRef()
  const [loading , setloading] = useState(true)
  
  
  useEffect(()=>{
    let laoderText = "CHITSHAT"
    let currentElem = loader.current
    currentElem.innerHTML = laoderText.split('').map((item,index) => `<span class="animated-span">${item}</span>`).join("") 
    const spans = currentElem.querySelectorAll(".animated-span");

    const timeline = gsap.timeline(
      {
        onComplete:()=>{
          setloading(false)
        }
      }
    )
    timeline.from(spans , {
       x:-200,
       duration:0.4,
       opacity:0,
       stagger:0.3,
       ease: "power2.out"
    })
  },[])
  if(loading){
    return(
      <h1 ref={loader}  className='absolute top-1/2 left-1/2 trasnform -translate-x-1/2 -translate-y-1/2 text-6xl font-light font-[base-font] text-blue-700 text-center w-72  overflow-hidden'></h1>
    )
  }
  
  return (
    <>
         <div>{children}</div>
    </>
  )
}

export default Loader