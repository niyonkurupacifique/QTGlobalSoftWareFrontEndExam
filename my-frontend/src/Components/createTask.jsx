import React, { useEffect } from "react";
import { RiDraftFill } from "react-icons/ri";
import  { useState } from "react";
import DatePicker from "react-datepicker";

import { MultiSelect } from 'primereact/multiselect';
import "react-datepicker/dist/react-datepicker.css";
import { color } from "framer-motion";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { IoIosAttach } from "react-icons/io";
import { Button, Modal } from 'flowbite-react';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const CreateTask=()=>{
    const toast = useToast()
const navigate=useNavigate(Navigate)
  const token=localStorage.getItem('token')
  const names=localStorage.getItem('names')
  console.log("Authorization",token);
    const [startdate, setStartDate] = useState(new Date());
   const[Enddate,setEndDate]=useState(new Date());
   const[lowPrioritySelected,setlowPrioritySelected]=useState(false)
   const[MiddlePrioritySelected,setmiddlePrioritySelected]=useState(false)
   const[highPrioritySelected,setHighPrioritySelected]=useState(false)
   const[projects,setProjects]=useState([])
   const [selectedusers, setSelectedusers] = useState(null);
   const[selectedProjects,setSelectedProjects]=useState("")
   const[priorityToStore,setpriorityToStore]=useState("")
   const[createAccount,setCreateAccount]=useState(false)
   const [data,setdata]=useState([])
   const getUsers = async () => {
    try {
      const result = await fetch("http://localhost:5000/getallusers");
      const result2 = await result.json();
      console.log("Data from APIii:", result2); 
      setdata(result2.ages);
    } catch (error) {
      console.error("Error fetching age data:", error);
    }
  };
  const getProjects = async () => {
    try {
      const result = await fetch("http://localhost:5000/getallprojects");
      const result2 = await result.json();
      console.log("Data from APIii:", result2); 
      setProjects(result2.projects);
    } catch (error) {
      console.error("Error fetching age data:", error);
    }
  };
useEffect(()=>{
   getUsers();
   getProjects();
},[])

   const namess = [
       { name: 'niyonkuru pacifique' },
       { name: 'nkezuwimye davide' },
       { name: 'iragena fabrice' },
       { name: 'tumukunde aloys'},
       { name: 'niyitegeka maurice' }
   ];

   const[taskName,setTaskname]=useState("")
   const[projectName,setProjectName]=useState("")
   const[description,setDescription]=useState("")
   const[priority,setPriority]=useState("")


  
   const GetProjects = async () => {
    const result = await fetch("http://localhost:5000/getProjects");
    const result2 = await result.json();
   if(Array.isArray(result2))
   {
    setProjects(result2.recordsets);
   }
   else{
    setProjects([result2.recordsets]);
   }
    console.log(result2);
  };
useEffect(()=>{
  GetProjects()
},[])


const Names =selectedusers&&selectedusers.map(name => name.name); 
const assignee =Names&&Names.join();




const handleSubmit = async (event) => {
    event.preventDefault();
    

    console.log("handlesubmit clicked")
 
    const data= {   "name":taskName,
    "startDate":startdate,
    "endDate":Enddate,
    "assignee":assignee,
    "projects":selectedProjects,
    "description":description,
    "priority":priorityToStore,
    "attach":"file"
    }
  console.log("my data is",data)
  const loadingToastId = toast({
    title: 'Signing up',
    description: 'Please wait...',
    status: 'loading',
    position: 'top',
    duration: null, 
  });
  const nameRegex = /^[A-Za-z\-']{2,}(?:\s[A-Za-z\-']{2,})*$/;
  if (!nameRegex.test(taskName)) {
      toast({
        title: 'failed to create task',
        description:"Invalid task name",
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
    const response = await fetch('http://localhost:5000/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
     
     
      toast({
        title: 'task created successfully! ',
        position: 'top',
        status: 'success',
        duration: 10000, 
      });
     navigate("/taskcreated")
      

    } else {
    
      const result2=await response.json()
      if(result2.errorMessage==="signin required")
      {
    setCreateAccount(true)
      }
      toast({
        title: 'failled to create task',
        description:result2.errorMessage,
        position: 'top',
        status: 'error',
        duration: 3000, 
      });
    }
  } catch (error) {
    console.error('task creation error:', error);
    toast({
      title: 'task creation failed',
      description: 'There was an error during task creation. Please try again.',
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
        <div className=" mx-40 mt-10">
           <div className=" flex justify-between">
            <div className=" text-lg font-bold">Create Task</div>
         {
            createAccount===true?(  <button onClick={()=>{navigate("/signup")}} className=" text-lg font-bold  ">Create Account</button>):(<div>{names}</div>)
         }
           <div>
           <div className=" flex  space-x-2 border">
                <div className="flex py-3 px-2 space-x-3">
                <div className=" mt-1"><RiDraftFill /></div>
                <div className=" font-bold">Save Draft</div>
                
                </div>
            </div>
           </div>
           </div>
           <div>
           <form class="">
  <div class="mb-5">
      <label for="large-input" class="block mb-2 text-sm  text-gray-900 dark:text-white font-bold">Name</label>
      <input onChange={(e)=>{setTaskname(e.target.value)}} type="text" placeholder="Task Name" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  </div>
  <div className=" flex space-x-4">
    <div  style={{width:"50%"}} className=" z-30">
    <div class="mb-5">
      <label for="large-input" class="block font-bold mb-2 text-sm  text-gray-900 dark:text-white">Start Date</label>
      <input  type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    
  </div>
  <DatePicker className="" wrapperClassName="datePicker" selected={startdate} onChange={(date) => setStartDate(date)} />
 
    </div>
    <div style={{width:"50%"}} className="">
     
    <div class="mb-5">
      <label for="large-input" class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">End Date</label>
      <input type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    
  </div>
  <DatePicker wrapperClassName="datePicker" selected={Enddate} onChange={(date) => setEndDate(date)} />
    </div>
   


  </div>
  <div className=" mt-6">
        <span className=" text-xl font-bold">Assignee</span>
    </div>
    <div className=" mt-2">
    <div className="card flex text-black justify-content-center">
          
                <MultiSelect   value={selectedusers} onChange={(e) => setSelectedusers(e.value)}  options={namess} optionLabel="name" 
                filter placeholder="Select users" maxSelectedLabels={3} className="w-full z-30 text-black md:w-20rem" >
                  <options className=" bg-blue-400">{namess} </options>
                </MultiSelect>
    </div> 
    </div>
    <div className=" mt-6">
        <span className=" text-xl font-bold mt-8 ">Add collaborators</span>
    </div>
    <div   className="">
    <div class="mb-5">
      <label for="large-input" class="block font-bold mb-2 text-sm  text-gray-900 dark:text-white">Projects</label>
    

 <select onChange={(e)=>{setSelectedProjects(e.target.value)}}  type="text" placeholder="Projects Name" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" >
                 
 {
                    projects&&projects.map((item)=>{
                   return  <option value={item}>{item}</option>
                    })
                  }             
                    
 </select>
  </div>
  
 
    </div>
    <div class="">
  <label for="message" class="block font-bold mb-2 text-sm text-gray-900 dark:text-white">Description</label>
  <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add more details to this task"></textarea>
</div>
 <div>
 <label for="message" class="block mt-3 font-bold mb-2 text-sm text-gray-900 dark:text-white">Priority</label>
 </div>
  <div className=" flex space-x-6">
    <div onClick={()=>{setlowPrioritySelected(!lowPrioritySelected);setpriorityToStore("Low");setHighPrioritySelected(false);setmiddlePrioritySelected(false)}}  className=" flex space-x-2">
        <div className=" mt-1" >
        {
    lowPrioritySelected===true?( <MdOutlineRadioButtonChecked  />):(<MdRadioButtonUnchecked   />)
   }

        </div>
        <div className=" text-black ">Low</div>
    </div>
    <div onClick={()=>{setmiddlePrioritySelected(!MiddlePrioritySelected);setpriorityToStore("Normal");setHighPrioritySelected(false);setlowPrioritySelected(false)}}  className=" flex space-x-2">
        <div className=" mt-1" >
        {
    MiddlePrioritySelected===true?( <MdOutlineRadioButtonChecked  />):(<MdRadioButtonUnchecked   />)
   }
        </div>
        <div className=" text-black">Normal</div>
    </div>
    <div onClick={()=>{ setHighPrioritySelected(!highPrioritySelected);setpriorityToStore("High");setlowPrioritySelected(false);setmiddlePrioritySelected(false)}}  className=" flex space-x-2">
        <div className=" mt-1" >
        {
    highPrioritySelected===true?( <MdOutlineRadioButtonChecked  />):(<MdRadioButtonUnchecked   />)
   }
        </div>
        <div className=" text-black">High</div>
    </div>
  </div>
   <div className=" flex justify-between mt-3">
    <div className=" flex">
        <div className=" mt-1"><IoIosAttach className=" text-black" /></div>
        <div className=" text-black">Attach</div>
    </div>
    <div className=" flex space-x-2 rounded-md">
        <div className=" bg-white">
        <button
       class="inline-flex items-center px-4  rounded-lg mt-2 font-semibold text-lg tracking-tighter bg-white text-black"
       href="/">
       Cancel
</button>
        </div>
        <div className=" bg-white">
        <button onClick={handleSubmit}
       class="inline-flex items-center px-4  py-2 rounded-lg mt-2 font-semibold text-lg tracking-tighter bg-blue-500 text-white"
       href="/">
       Submit
</button>
        </div>
    </div>
   </div>
</form>
           </div>
        </div>
    )
}
export default CreateTask