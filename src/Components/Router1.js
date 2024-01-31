import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import TodoList from "./TodoList";
import Home from "./Home";
import Add from "./Add";

export default function Router1() {
  return (
    <div  className="text-center" >
     <BrowserRouter>
     <div style={{display:'flex',float:"left",height:"100vh"}}>
        <Sidebar/>
      </div>
      <div>
        <Routes>
            <Route path="/" element={<Home/>  } />
            {/* <Route path="/add" element={<Add/>} />
            <Route path="/todo" element={<TodoList/>} /> */}
          
        </Routes>
        </div>
        </BrowserRouter>
      
    </div>
  );
}
