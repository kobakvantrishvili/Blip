import Link from "@/components/shared/Link";
import { IconType } from "react-icons";

type SidebarItemProps = {
  icon: IconType;
  title: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, title }) => {
  return (
    <Link href="/" className="hover:text-text-secondary">
      <div
        className={`flex flex-row items-center justify-start gap-4 px-4 py-2 border-b border-text-tertiary cursor-pointer`}
      >
        {<Icon className={`text-text-secondary text-2xl`} />}
        {title}
      </div>
    </Link>
  );
};

export default SidebarItem;
