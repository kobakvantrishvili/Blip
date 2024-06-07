"use client";

import { useState } from "react";
import Navbar from "@/components/nav/navbar/Navbar";
import Sidebar from "@/components/nav/sidebar/Sidebar";
import Notification from "@/components/notification/Notification";
import { AnimatePresence } from "framer-motion";
import TestComponent from "./TestComponent";

const Nav: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  return (
    <>
      <Navbar
        isMenuToggled={isMenuToggled}
        setIsMenuToggled={setIsMenuToggled}
        isCopied={isCopied}
        setIsCopied={setIsCopied}
      />
      {isMenuToggled && <Sidebar setIsCopied={setIsCopied} />}
      <AnimatePresence>{isCopied && <Notification>Copied to clipboard!</Notification>}</AnimatePresence>
      <TestComponent />
    </>
  );
};

export default Nav;
