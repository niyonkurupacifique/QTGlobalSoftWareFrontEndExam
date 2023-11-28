import { Bounce } from 'react-swift-reveal';
import { useToast } from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Login=()=>{


    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const toast = useToast()
     const navigate=useNavigate(Navigate)
    const handleLogin = async (event) => {
      event.preventDefault();
  
   
    const userData = {
      email:email,
      password:password
    };
   console.log(userData)
   
    const loadingToastId = toast({
      title: 'login....',
      description: 'Please wait...',
      status: 'loading',
      position: 'top',
      duration: null, 
    });
    
    if (email==="") {
        toast({
          title: 'failed',
          description:"email required",
          position: 'top',
          status: 'error',
          duration: 3000,
        });
        toast.close(loadingToastId);
        return;
      }
      if (password==="") {
        toast({
          title: 'failed',
          description:"password required",
          position: 'top',
          status: 'error',
          duration: 3000, 
        });
        toast.close(loadingToastId);
        return;
        
      }
       
  else{
    try {
    
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        const result2=await response.json()
        console.log("data",[result2.token,result2.email,result2.names,result2.NationalId])
        localStorage.setItem('token',result2.token,10000);
        localStorage.setItem('email',result2.email);
        localStorage.setItem('names',result2.names);
        localStorage.setItem('nationalId',result2.NationalId);
        localStorage.setItem('userId',result2.id);
        toast({
          title:result2.successMessage,
          position: 'top',
          status: 'success',
          duration: 3000,
        });
        navigate("/")
       
      } else {
        
        const result2=await response.json()
        toast({
          title: 'login failed',
          description:result2.errorMessage,
          position: 'top',
          status: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('login error:', error);
      toast({
        title: 'login failed',
        description: 'There was an error during login. Please try again.',
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
    } finally {
     
      toast.close(loadingToastId);
    }
  };
  }
    return(
        <div className=" mt-20">
            <div className=" w-full flex justify-center absolute top-7">
           
           <Bounce>
           <span className=' flex justify-center font-txtFontFamily text-loginFontsize font-txtbodyFontWeight leading-loginLineHeight tracking-txtbodyLetterspacing text-txtecolor underline underline-offset-8'>LogIn</span>
   </Bounce>
           
          </div>


<form class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="@gmail" required/>
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>
  <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
    </div>
    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button onClick={handleLogin} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  <div className=' text-black'>don't have account? <Link to="/signup"><span className=' text-blue-500 underline underline-offset-1 ml-3'>SignUp</span></Link></div>
</form>

        </div>
    )
}
export default Login