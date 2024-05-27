import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const Link: React.FC<Props> = ({ href, children, className }) => {
  return (
    <a className={`transition duration-200 ${className}`} href={href}>
      {children}
    </a>
  );
};

export default Link;
