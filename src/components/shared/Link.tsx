import React from "react";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const Link: React.FC<LinkProps> = ({ href, children, className }) => {
  return (
    <a className={`transition duration-200 ${className}`} href={href}>
      {children}
    </a>
  );
};

export default Link;
