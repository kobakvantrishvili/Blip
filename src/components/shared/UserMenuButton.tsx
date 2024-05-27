import { FiUser } from "react-icons/fi";

type UserMenuButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const UserMenuButton: React.FC<UserMenuButtonProps> = ({ className, children, onClick }) => {
  return (
    <button
      className={`text-text-secondary hover:text-primary-accent hover:bg-dark-hover focus:outline-none 
        flex items-center justify-start border border-dark-border  ${className}`}
      onClick={onClick}
    >
      <FiUser className={`text-tertiary-accent text-2xl`} />
      {children}
    </button>
  );
};

export default UserMenuButton;
