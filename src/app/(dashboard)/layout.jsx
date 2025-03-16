import Menu from "./../../components/Menu";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./../../components/Navbar";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col ">
      {/* Navbar */}
      <nav className="w-full bg-[#F7F8FA] shadow-md p-4 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/stl.png" alt="Scientific Team Lab Logo" width={32} height={32} />
          <span className="hidden lg:block font-medium text-[#5FC5C1]">
            Scientific Team Lab
          </span>
        </Link>
      </nav>

      {/* Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[5%] p-4 bg-[#F7F8FA] shadow-md flex flex-col overflow-auto">
          <Menu />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#F7F8FA] overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
