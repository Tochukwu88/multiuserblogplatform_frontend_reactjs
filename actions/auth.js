import fetch from 'isomorphic-fetch'
import {API} from '../config'
import cookie from 'js-cookie'
import { Router } from 'next/router'


export const handleResponse = response =>{
    if(response.status === 401){
      signout(()=>{
        Router.push({
            pathname:'/signin',
            query:{
                message:'your session is expired. please signin'
            }
        })

      })
       
    }else{
        return;
    }
}


export const signup = (user)=>{
    return(
        fetch (`${API}/signup`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const preSignup = (user)=>{
    return(
        fetch (`${API}/pre-signup`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const signin = (user)=>{
    return(
        fetch (`${API}/signin`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const signout = (next)=>{
    removeCookie('token')
    removelocalStorage('user')
    next()
    return(
        fetch(`${API}/signout`,{
            method:'GET'
        }).then(response=>{
            console.log('signout ok')
        })
        .catch(err => console.log(err))
    )
}

export const setCookie=(key,value)=>{
    if(process.browser){
        cookie.set(key,value,{
            expires:1
        })
    }
}
export const removeCookie=(key)=>{
    if(process.browser){
        cookie.remove(key,{
            expires:1
        })
    }
}
export const getCookie=(key)=>{
    if(process.browser){
       return  cookie.get(key)
    }
}
export const setlocalStorage=(key,value)=>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
    }
}
export const removelocalStorage=(key)=>{
    if(process.browser){
        localStorage.removeItem(key)
    }
}
export const authenticate = (data, next) =>{
    setCookie('token',data.token)
    setlocalStorage('user',data.user)
    next()
}
export const isAuth=()=>{
    if(process.browser){
        const cookiecheck =getCookie('token')
        if(cookiecheck){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false
            }
        }
    }
}
export const  updateUser  = (user, next) =>{
    if(process.browser){
        if(localStorage.getItem('user')){
            let auth = JSON.parse(localStorage.getItem('user'))
            auth  = user
            localStorage.setItem('user', JSON.stringify(auth))
            next()
        }
    }

}
export const forgotPassword = (email)=>{
    return(
        fetch (`${API}/forgot-password`,{
            method:'PUT',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(email)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const resetPassword = (resetInfo)=>{
    return(
        fetch (`${API}/reset-password`,{
            method:'PUT',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(resetInfo)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
export const loginWithGoogle = (user)=>{
    return(
        fetch (`${API}/google-login`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(response =>{
            return response.json()
        })
        .catch(err=>console.log(err))
    )
}
