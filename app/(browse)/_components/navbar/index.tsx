import React from "react";
import Logo from "./logo";

const Navbar = () => {
  return (
    <nav
      className="
        fixed
        top-0
        flex h-20
        w-full
        items-center
        justify-between
        bg-[##242731]
        px-2
        shadow-sm
        lg:px-4
      "
    >
      <Logo />
    </nav>
  );
};

export default Navbar;
