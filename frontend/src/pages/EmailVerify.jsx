import React,{useContext} from "react";
 import {AppContent} from '../context/AppContext';
import { assets } from "../assets/assets";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios' ;
// in order to stop the form to autosubmit we use e.preventDefault();
const EmailVerify = () => {
  axios.defaults.withCredentials = true ;
  const  {backendUrl , setIsLoggedIn , getUserData} = useContext(AppContent);
  const navigate = useNavigate();
  const inputRefs = React.useRef([]);
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      // this index + 1 is responsible for moving focus further in 6 boxes 
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e,index) =>{
    if(e.key=== 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus();
    }
  }
   const onSubmitHandler = async(e)=>{
    try{
     e.preventDefault();
     const otpArray = inputRefs.current.map(e =>e.value);
     const otp = otpArray.join('');
     const {data} = await axios.post(backendUrl + '/api/auth/verify-account',{otp});
     if(data.success){
       toast.success(data.message);
       await getUserData();
       navigate('/');
     }
     else {
      toast.error(data.message);
     }
    } 
    catch(error){
      toast.error(error.message);
    }
    }
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to bg-purple-400">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        />
        <form onSubmit={onSubmitHandler} 
        className="bg-slate-900 p-8 rounded-lg shadow-1g w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Email Verify Otp
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your Email
          </p>
          <div className="flex justify-between mb-8">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e)=>handleKeyDown(e,index)}
                />
              ))}
          </div> 
          <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer">
            {" "}
            verify Email
          </button>
        </form>
      </div>
    </div>
  );
};
export default EmailVerify;
