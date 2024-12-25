import { Button } from "flowbite-react";
import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router";

const GoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="max-w-screen-xl p-4 w-full sticky top-0">
      <Button color="purple" onClick={goBack} outline pill className="z-[999]">
        <HiOutlineArrowLeft className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default GoBack;
