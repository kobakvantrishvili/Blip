import React from "react";

type LinkProps = {
  href: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Link: React.FC<LinkProps> = ({ href, target, children, className, onClick }) => {
  return (
    <a className={`transition duration-200 ${className}`} href={href} target={target} onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;
