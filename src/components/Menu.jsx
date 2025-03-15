"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {Link} from "@heroui/react";
import { AuthContext } from "@/store/auth-context.jsx";

import { useContext } from "react";

import { CasesContext } from "@/store/cases-context.jsx";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/student.png",
        label: "Users",
        href: "/list/users",
        visible: ["admin"],
      },
      {
        icon: "/parent.png",
        label: "Doctors",
        href: "/list/doctors",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Case Definition",
        href: "/list/case-definitions",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/attendance.png",
        label: "Designers",
        href: "/list/designers",
        visible: ["admin", "designers"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
      
          
        
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const { logout} =useContext(AuthContext);
  const { currentUser } = useContext(CasesContext);

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.map(section => ({
    ...section,
    items: section.items.filter(item => 
      !currentUser || !currentUser.role || item.visible.includes(currentUser.role)
    )
  }));
  const pathname = usePathname(); // Get current path
  const router = useRouter();

  const handleAdminClick = () => {
    router.push("/admin");
  };
  return (
    <div className="mt-4 text-sm overflow-y-auto scrollbar-hidden">
      {filteredMenuItems.map((i) => (
        <div className="flex flex-col" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => (
            
            <Link
        
        
              href={item.href}
              key={item.label}
              onClick= {item.label=="Logout"?(e)=>{e.preventDefault();  logout()}:null}
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md "
             color="primary"
           >
              <Image src={item.icon} alt="" width={20} height={20} />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;