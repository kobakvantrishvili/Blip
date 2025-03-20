"use client";

import { useState } from "react";
import Navbar from "@/components/nav/navbar/Navbar";
import Sidebar from "@/components/nav/sidebar/Sidebar";
import Notification from "@/components/notification/Notification";
import { AnimatePresence } from "framer-motion";
import TestComponent from "./TestComponent";
import useMediaQuery from "@/hooks/useMediaQuery";

interface NavProps {
  onSearchSubmit: (query: string) => void; // Receive function from Page.tsx
}

const Nav: React.FC<NavProps> = ({ onSearchSubmit }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <Navbar
        isMenuToggled={isMenuToggled}
        setIsMenuToggled={setIsMenuToggled}
        isCopied={isCopied}
        setIsCopied={setIsCopied}
        onSearchSubmit={onSearchSubmit}
      />
      {isMenuToggled && <Sidebar setIsCopied={setIsCopied} />}
      {!isAboveMediumScreens && <AnimatePresence>{isCopied && <Notification>Copied to clipboard!</Notification>}</AnimatePresence>}

      {/* <TestComponent /> */}
    </>
  );
};

export default Nav;
