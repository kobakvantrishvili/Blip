"use client";

import { useState } from "react";
import Navbar from "@/components/navigationLayout/navbar/Navbar";
import Sidebar from "@/components/navigationLayout/sidebar/Sidebar";
import Notificationbar from "@/components/notificationBar/NotificationBar";
import { AnimatePresence } from "framer-motion";

const NavigationLayout: React.FC = () => {
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
      {/* {isMenuToggled && <Sidebar setIsCopied={setIsCopied} />}

      <AnimatePresence mode="wait">
        {isCopied && <Notificationbar>Copied to clipboard!</Notificationbar>}
      </AnimatePresence> */}
    </>
  );
};

export default NavigationLayout;
