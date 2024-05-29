import React from "react";
import { motion } from "framer-motion";

type NotificationbarProps = {
  children: React.ReactNode;
};

const Notification: React.FC<NotificationbarProps> = ({ children }) => {
  return (
    <motion.div
      key={1}
      className="z-40 fixed bottom-0 left-0 right-0 bg-secondary-accent text-white text-center py-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Notification;
