import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react"
import { cookies } from "next/headers";
import { ToastContainer, toast } from 'react-toastify';
export default  function DashboardLayout({ children }) {
  // const token = (await cookies()).get("auth-token") || null;// Await cookies() before using it
  
  return (

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/6 md:w-1/12 lg:w-1/5 xl:w-1/6 p-4 bg-[#F7F8FA] shadow-md flex flex-col overflow-auto">
          <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
            <Image src="/stl.png" alt="Scientific Team Lab Logo" width={32} height={32} />
            <span className="hidden lg:block font-medium text-[#5FC5C1]">
              Scientific Team Lab
            </span>
          </Link>
          <Menu />
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#F7F8FA] overflow-hidden flex flex-col">
          <Navbar />
          {children}
        </main>
        <ToastContainer />
      </div>

  );
}
