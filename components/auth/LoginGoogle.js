import {useState} from 'react'
import {loginWithGoogle,authenticate,isAuth} from '../../actions/auth'
import { GOOGLE_CLIENT_ID} from '../../config'
import GoogleLogin from 'react-google-login'
import Router from 'next/router'



const LoginGoogle = () =>{
    const responseGoogle = (response) =>{
       const tokenId = response.tokenId
       const user = {tokenId} 
       loginWithGoogle(user).then(data =>{
           if(data.error){
               console.log(data.error)
           }else{
            authenticate(data,()=>{
                if(isAuth() && isAuth().role===1){
                 Router.push('/admin')
                }else{
                 Router.push('/user')
                }
             })
           }
       })
    }
    return(
        <>
        <GoogleLogin
    clientId={`${GOOGLE_CLIENT_ID}`}
    buttonText="Login with google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    theme={'dark'}
  />
    </>
    )
}
export default LoginGoogle