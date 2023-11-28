import React, { useState } from 'react';
import { useEffect } from 'react';

import { Bounce } from 'react-swift-reveal';
import { Link } from 'react-router-dom';  

const Table = () => {
 const[Data,setData]=useState([])
    const getAlldata = async () => {
        try {
          const result = await fetch("http://localhost:5000/taskDetails");
          const result2 = await result.json();
           console.log("result2 is",result2)
          if (result2.recordset.length > 0) {
            const data = result2.recordset; 
            console.log("data",data);
            if(Array.isArray(data))
            {
              setData(data)
            }
            else
            {
              setData([data])
            }
          
            
          } else {
            console.log("No records found.");
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

    const name=Data&&Data.map((item)=>item.name)

    useEffect(()=>{
        getAlldata()
       },[])
   
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
           <div className=" w-full flex justify-center absolute top-2">
           
           <Bounce>
           <span className=' flex justify-center font-txtFontFamily text-loginFontsize font-txtbodyFontWeight leading-loginLineHeight tracking-txtbodyLetterspacing text-txtecolor underline underline-offset-8'>Task Description</span>
   </Bounce>
           
          </div>
         
      <table className="w-full mt-10">
        <thead>
          <tr className="bg-gray-500 text-gray-white">
            <th className="px-4 py-3 text-left">Task Name</th>
            <th className="px-4 py-3 text-left">StartDate</th>
            <th className="px-4 py-3 text-left">EndDate</th>
            <th className="px-4 py-3 text-left">Assignee</th>
            <th className="px-4 py-3 text-left">Projects Name</th>
            <th className="px-4 py-3 text-left">Priority</th>
          </tr>
        </thead>
        <tbody>
         
           {
            Data&&Data.map((item)=>{
            return  <tr className="bg-white border-b border-gray-200">
                <td className="px-4 py-3 text-left">{item.name}</td>
                <td className="px-4 py-3 text-left">{item.startDate}</td>
                <td className="px-4 py-3 text-left">{item.endDate}</td>
                <td className="px-4 py-3 text-left">{item.assignee}</td>
                <td className="px-4 py-3 text-left">{item.projects}</td>
                <td className="px-4 py-3 text-left">{item.priority}</td>
              </tr>
            })
           }
        
        </tbody>
      </table>
      <div className=' flex justify-end'>
           <Link to="/createTask"> <button className=' text-blue-500 underline underline-offset-1'>Create Another task</button></Link>
          </div>
    </div>
  );
};

export default Table;