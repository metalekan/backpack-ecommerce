import { Dropdown } from "flowbite-react";
// import { useState } from "react";
// import { FaHamburger } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div className="w-fit">
      <Dropdown color="light" label="More" outline>
        <NavLink to="/admin/dashboard">
          <Dropdown.Item>Admin Dashboard</Dropdown.Item>
        </NavLink>
        <NavLink to="/admin/categorylist">
          <Dropdown.Item>Create Category</Dropdown.Item>
        </NavLink>
        <NavLink to="/admin/productlist">
          <Dropdown.Item>Create Product</Dropdown.Item>
        </NavLink>
        <NavLink to="/admin/allproductslist">
          <Dropdown.Item>All Products</Dropdown.Item>
        </NavLink>
        <NavLink to="/admin/userlist">
          <Dropdown.Item>Manage Users</Dropdown.Item>
        </NavLink>
        <NavLink to="/admin/orderlist">
          <Dropdown.Item>Manage Orders</Dropdown.Item>
        </NavLink>
      </Dropdown>
    </div>
  );
};

export default AdminMenu;
