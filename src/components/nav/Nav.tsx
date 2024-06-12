"use client";

import { useState } from "react";
import Navbar from "@/components/nav/navbar/Navbar";
import Sidebar from "@/components/nav/sidebar/Sidebar";
import Notification from "@/components/notification/Notification";
import { AnimatePresence } from "framer-motion";
import TestComponent from "./TestComponent";
import useMediaQuery from "@/hooks/useMediaQuery";

const Nav: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Navbar isMenuToggled={isMenuToggled} setIsMenuToggled={setIsMenuToggled} isCopied={isCopied} setIsCopied={setIsCopied} />
      {isMenuToggled && <Sidebar setIsCopied={setIsCopied} />}
      {!isAboveMediumScreens && <AnimatePresence>{isCopied && <Notification>Copied to clipboard!</Notification>}</AnimatePresence>}

      {/* <TestComponent /> */}
    </>
  );
};

export default Nav;
