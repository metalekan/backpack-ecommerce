import { Button, Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img
          src="https://img.icons8.com/sf-regular/48/school-backpack.png"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-lg font-semibold">
          Backpack
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link to="login">
          <Button className="mr-3" color="purple" outline>
            Login
          </Button>
        </Link>
        <Link to="register">
          <Button className="mr-3" color="purple">
            Register
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Homepage;
