import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {  NavLink, useNavigate, useParams } from "react-router-dom";
import {registeruser , loginuser , forgotpassword, resetpassword} from '../../API/RouteHandlers'
import gsap from 'gsap'
const Form = ({type}) => {
  const container = useRef(null)   
  const content = useRef(null)   
  const text = useRef(null)   
  const navigate = useNavigate()
  const {token} = useParams()

  
  useGSAP(
    ()=>{
       const timeline = gsap.timeline()

       timeline.from(container.current ,{
        y:-200,
        duration:0.5
       }),
       timeline.from(text.current , {
        opacity:0,
        duration:0.4
       })
       timeline.from(content.current , {
        opacity:0,
        duration:0.7
       })
    }
  )  
    
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit =  async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        if (key === "image") {
            formData.append(key, data[key][0]); 
        } else {
            formData.append(key, data[key]);
        }
    });
    switch(type){
      case 'signup':
        try{
             const response = await registeruser('/auth/registeruser' , formData , navigate)

        }catch(err){
          console.log(err.message)
        }
        break
      case 'signin':
        try{
           
             const response = await loginuser('/auth/loginuser' , data , navigate)
        }catch(err){
          console.log(err.message)
        }
        break
      case 'forgot':
        try{
             await forgotpassword('/auth/forgotpassword' , data , navigate)
             
        }catch(err){
          console.log(err.message)
        }
        break
      case 'reset':
        try{
           
             await resetpassword(`/auth/resetpassword/${token}` , data , navigate)
             
        }catch(err){
          console.log(err.message)
        }
        break
    }
    reset()
     };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div ref={container} className="w-96 bg-white flex flex-col justify-center p-8">
          {
            type === 'signup' || type=== 'signin'?(
              <>
           <h1 ref={text}  className="text-3xl w-80 font-light text-[#635DFF] text-center"><span  className="text-4xl font-bold text-[#635DFF] ">Welcome!</span> <br /> {type === 'signup' ? 'Create Account' : 'Login Account'}</h1> 
              </>
            ):
              
           <h1 ref={text}  className="text-3xl w-80 font-light text-[#635DFF] text-center"> Reset Password</h1> 
              
            
          }
          <form ref={content} onSubmit={handleSubmit(onSubmit)} method="post" encType="multipart/form-data" className='flex flex-col items-center justify-center gap-6 '>
           
           {
           ( type === 'signin' || type === 'signup' || type === 'forgot') &&(
              <>
          <fieldset className={`border  border-gray-400 ${errors.email ? 'border border-red-600' : ''}`}>
          <legend className="ml-2 p-2 text-xl font-light">Email</legend>
          <input type="email"  className={`w-80 h-8 outline-none p-4 !bg-white font-light text-lg`} placeholder="Enter Your Email" {...register("email" , {required:true})} />
            </fieldset> 
              </>
            )  
          }
          {
           ( type === 'signin' || type === 'signup' || type === 'reset') &&(
              <>
            <fieldset className={`border border-gray-400 ${errors.password ? 'border border-red-600' : ''}`}>
          <legend className="ml-2 p-2 text-xl font-light">Password</legend>
          <input type="password" className={`w-80 h-8 outline-none !bg-white p-4 font-light text-lg `} placeholder="Enter Your Password"  {...register("password" , {required:true})} />
            </fieldset> 
              </>
            )
          }
            {
                (type === 'signup') &&(
                    <>
          <fieldset className={`border border-gray-400 ${errors.username ? 'border border-red-600' : ''}`}>
          <legend className="ml-2 p-2 text-xl font-light">Username</legend>
          <input type="text" className={`w-80 h-8 outline-none !bg-white p-4 font-light text-lg`} placeholder="Enter Your Username" {...register("username" , {required:true})} />
            </fieldset> 

            <fieldset className={`border border-gray-400 ${errors.phone ? 'border border-red-600' : ''}`}>
          <legend className="ml-2 p-2 text-xl font-light">Phone</legend>
          <input  className={`w-80 h-8 outline-none p-4 !bg-white font-light text-lg `} placeholder="Enter Your Phone Number" type="phone" {...register("phone" , {required:true})} />
            </fieldset> 
            <fieldset className={`border border-gray-400 ${errors.image ? 'border border-red-600' : ''}`}>
          <legend className="ml-2 p-2 text-xl font-light">Image</legend>
          <input name="image" className={`w-80 h-8 outline-none  !bg-white font-light text-lg `}  type="file" {...register("image" , {required:true})} />
            </fieldset> 
                    </>
                )
            }
         
           {
            type === 'signin' && (
                <>
                <NavLink to={'/auth/forgotpassword'} className="text-lg font-semilight text-purple-500 visited:text-purple-500 hover:scale-105 hover:text-purple-600 duration-200">Forgot Password??</NavLink>        
                </>
            )
           }
          <input  type="submit" className="w-72 h-12 bg-[#635DFF] cursor-pointer hover:scale-110 duration-200" />
         {
         ( type === 'signup' || type === 'signin' )&&(
            <>
             <NavLink to={type === 'signin' ? '/auth/signup' : '/'} className="text-lg text-black hover:scale-105 duration-200">{type === 'signin' ? 'Dont Have An Account' :'Already Have An Account'}<span className="font-semilight text-purple-500 visited:text-purple-500">{type === 'signin' ? 'SignUp' : 'SignIn'}</span></NavLink>
            </>
          )
         } 
                 
    </form>
        </div>
      </div>
    </>
  );
};

export default Form;
