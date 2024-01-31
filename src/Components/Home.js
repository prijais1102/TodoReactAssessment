import React from 'react'
import Image from 'react-bootstrap/Image';
import Header from './Header';
import Footer from './Footer';
import TodoList from './TodoList';

export default function Home() {
  return (
    <>
    {/* <Header /> */}
       {/* <div style={{display:'flex',float:'center',height:"500px",width:"600px" , marginLeft:"400px"}} >
        <Image src="https://info.cegedim-healthcare.co.uk/hubfs/CHS_Tasks%20logo.png" fluid />
    </div> */}
    {/* <Footer /> */}

    <TodoList/>
    </>
 
  )
}
