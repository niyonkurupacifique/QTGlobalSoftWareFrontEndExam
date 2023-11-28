import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Bounce } from 'react-swift-reveal';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Signup=()=>{
const[yourFullNames,setYourfullNames]=useState("")
const[username,setUserName]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const[confirmPassword,setConfirmpassword]=useState("")
const [IsImageUploaded2, setIsImageUploaded2] = useState(false);
const [imageURL2, setImageURL2] = useState("");
const toast = useToast()
const navigate=useNavigate(Navigate)

const handleImageUpload2 = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ww2ueyt4");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dhtyvcwxo/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          setIsImageUploaded2(true);
          setImageURL2(imageUrl);
          console.log("link yifoto", imageUrl);
        } else {
          console.error("Image upload failed");
          setIsImageUploaded2(false);
        }
      } catch (error) {
        console.error("An error occurred while uploading the image:", error);
        setIsImageUploaded2(false);
      }
    } else {
      console.error("No files selected.");
      setIsImageUploaded2(false);
    }
  };


   const handleSubmit = async (event) => {
    event.preventDefault();

   


    console.log("handlesubmit clicked")
 
  const user={  
    "name":yourFullNames,
    "UserName":username,
    "password":password,
    "email":email,
  
}

  
  const loadingToastId = toast({
    title: 'Signing up',
    description: 'Please wait...',
    status: 'loading',
    position: 'top',
    duration: null, 
  });
  const nameRegex = /^[A-Za-z\-']{2,}(?:\s[A-Za-z\-']{2,})*$/;

  const usernameRegex = /^[A-Za-z0-9_\-]{4,20}$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!nameRegex.test(yourFullNames)) {
      toast({
        title: 'Sign up failed',
        description:"Invalid name",
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
      toast.close(loadingToastId);
      return;
    }
    if (!usernameRegex.test(username)) {
      toast({
        title: 'Sign up failed',
        description:"Invalid username",
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
      toast.close(loadingToastId);
      return;
      
    }
    if (!emailRegex.test(email)) {
      toast({
        title: 'Sign up failed',
        description:"Invalid email",
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
      toast.close(loadingToastId);
      return;
    }
    if (password.length < 8) {
      toast({
        title: 'Sign up failed',
        description:"Password must be at least 8 characters",
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
      toast.close(loadingToastId);
      return;
    } 
    else if(password !==confirmPassword)
    {
      toast({
        title: 'Sign up failed',
        description:"password mismatch",
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
      toast.close(loadingToastId);
       return;
       
    }   
else{
  try {
    // Make a POST request to the registration API
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      localStorage.setItem('email',email);
     
      toast({
        title: 'Thank you for registering! ',
        position: 'top',
        status: 'success',
        duration: 10000, 
      });
     
      navigate("/login")

    } else {
    
      const result2=await response.json()
      toast({
        title: 'Sign up failed',
        description:result2.errorMessage,
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    toast({
      title: 'Sign up failed',
      description: 'There was an error during registration. Please try again.',
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
        <div>
           <div className=" w-full flex justify-center absolute top-7">
           
            <Bounce>
            <span className=' flex justify-center font-txtFontFamily text-loginFontsize font-txtbodyFontWeight leading-loginLineHeight tracking-txtbodyLetterspacing text-txtecolor underline underline-offset-8'>SignUp</span>
    </Bounce>
            
           </div>

<form  class="max-w-sm mx-auto mt-20">
  <div class="mb-5">
    <label for="names" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full names</label>
    <input onChange={(e)=>{setYourfullNames(e.target.value)}} type="names" id="names" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="full names" required/>
  </div>
  <div class="mb-5">
    <label for="names" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">userName</label>
    <input onChange={(e)=>{setUserName(e.target.value)}} type="names" id="names" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="username" required/>
  </div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail" required/>
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div class="mb-5">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
    <input onChange={(e)=>{setConfirmpassword(e.target.value)}} type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
    </div>
    <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
   <Link to="/login"> <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">Already have account? signin</a></Link>
  </div>
  <button onClick={handleSubmit} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
</form>

        </div>
    )
}
export default Signup