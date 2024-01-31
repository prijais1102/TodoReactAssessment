import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div >
      <div style={{ display: 'block', height:'200vh'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Task Manager
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content" >
          <CDBSidebarMenu >
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/add" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">Add Task</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/todo" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Task List</CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}>
            @2024-ReactAssignment
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
    </div>
  )
}


