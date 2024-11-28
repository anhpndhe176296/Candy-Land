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

const MenuBar = () => {
  return (
    
    <div style={{ display: 'flex',  overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            MenuBar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {/* <NavLink exact to="/userlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Category</CDBSidebarMenuItem>
            </NavLink> */}
            
            <NavLink exact to="/manager/bloglist" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Blog</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/manager/bloglist/addblog" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Add new blog</CDBSidebarMenuItem>
            </NavLink>

            {/* <NavLink exact to="/userlist" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">FeedBack</CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          {/* <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div> */}
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    
  );
};
export default MenuBar;