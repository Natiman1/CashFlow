import Link from "next/link";
// import { ChevronRight } from "lucide-react";

const linkBtn = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={`text-primary-500 hover:text-primary-600 font-medium gap-1 flex  justify-center items-center ${className}`}
    >
      {children}
    </Link>
  );
};

export default linkBtn;
