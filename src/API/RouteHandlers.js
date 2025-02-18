import toast from "react-hot-toast";
import ApiInstance from "./ApiInstance";


export const registeruser = async (endpoint , credentials , navigator) => {
    try{
        const response = await ApiInstance.post(endpoint , credentials ,{
            headers:{
                "Content-Type" : "multipart/form-data"
            }
        })
        if(response.status === 201){
            toast.success('Signup Successfully')
             const token = response.data.token
                localStorage.setItem('token' , token)
            setTimeout(() => {
                navigator('/')
            }, 2000);
        }else{
            toast.error('Something went wrong')
        }
     return response   
    }catch(error){
        toast.error(error.response.data.message)
    }
}
export const loginuser = async (endpoint , credentials , navigator) => {
    try{
        const response = await ApiInstance.post(endpoint , credentials)
        if(response.status === 200){
            toast.success('SignIn Successfully')
            setTimeout(() => {
                navigator('/home')
            }, 2000);
        }else{
            toast.error('Something went wrong')
        }
     return response   
    }catch(error){
        toast.error(error.response.data.message)
    }
}
export const forgotpassword = async (endpoint , credentials ,navigator) => {
    try{

        const response = await ApiInstance.post(endpoint,credentials)
        if(response.status === 200){
            toast.success('Reset Token Generated! You Will be Redirect in a moment')
            setTimeout(() => {
                navigator(`/auth/resetpassword/${response?.data?.resettoken}`)
            }, 3000);
        }
           
    }catch(err){
        toast.error(err.response.data.message)
    }
}
export const resetpassword = async (endpoint , credentials ,navigator) => {
    try{

        const response = await ApiInstance.patch(endpoint,credentials)
        if(response.status === 200){
            toast.success(response?.data?.message)
            setTimeout(() => {
                navigator('/auth/signin')
            }, 3000);
        }
           
    }catch(err){
        toast.error(err.response.data.message)
    }
}
///////////////////////////////////////// USER DETAILS APIS
export const getAllUserData =async (endpoint) => {
     try{
        const response = await ApiInstance.get(endpoint)

        const data = await response?.data?.Allusers
        return data
     }catch(err){
        toast.error(err.response.data.message)
     }
}
export const getUserDetailsById = async (endpoint) => {
    try{
        const response = await ApiInstance.get(endpoint)
        const data = await response?.data?.user
        return data
     }catch(err){
        toast.error(err.response.data.message)
     }
}
// -------------------------Chats APIS 

export const StartChat = async (endpoint , members) => {
    try{
        const response = await ApiInstance.post(endpoint , members)
    
           const data = await response?.data?.chat
           return data
    }catch(err){
        toast.error(err.response.data.message)
    }
}

export const getAllChats =async (endpoint) => {

    try{
       const response = await ApiInstance.get(endpoint)
       const data = await response?.data?.Allchat
       return data
    }catch(err){
       toast.error(err.response.data.message)
    }
}

export const sendMessage = async (endpoint , message) => {
    try{
     
          const response = await ApiInstance.post(endpoint , message)
          const data = await response?.data?.message
          return data
    }catch(err){
        toast.error(err.response.data.message)
    }
}
export const getAllmessages = async (endpoint) => {
    try{
        const response = await ApiInstance.get(endpoint)
        return response
    }catch(err){
        toast.error(err.response.data.message)
    }
}
