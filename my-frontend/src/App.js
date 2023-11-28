
import Signup from "./Components/signup"
import Login from "./Components/login"
import CreateTask from "./Components/createTask"
import TaskCreated from "./Components/taskcreated";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import {  Route,Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
export default function App() {
  
  return (
    <h1 className="">
     
       
      
        <PrimeReactProvider>
      
       <ChakraProvider>
       <Routes>
                <Route path="/" element={  <CreateTask></CreateTask>} />
                <Route path="/createTask" element={  <CreateTask></CreateTask>} />
                <Route path="/signup" element={ <Signup></Signup>} />
                <Route path="/login" element={ <Login></Login>} />
                <Route path="/taskcreated" element={ <TaskCreated></TaskCreated>} />
            </Routes>
       </ChakraProvider>
        </PrimeReactProvider>


    </h1>
  )
}