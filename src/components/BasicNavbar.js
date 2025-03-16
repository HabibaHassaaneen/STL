"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Divider,
  Image,
  cn,
} from "@heroui/react";

const menuItems = [
  "About",
  "Blog",
  "Customers",
  "Pricing",
  "Enterprise",
  "Changelog",
  "Documentation",
  "Contact Us",
];

const BasicNavbar = React.forwardRef(
  ({ classNames = {}, user, logout, ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname(); // Get current path
    const router = useRouter();

    // Function to handle admin navigation
    const handleAdminClick = () => {
      router.push("/admin");
    };

    return (
      <Navbar
        ref={ref}
        {...props}
        classNames={{
          base: cn("border-default-100 bg-transparent", {
            "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
          }),
          wrapper: "w-full justify-center",
          item: "hidden md:flex",
          ...classNames,
        }}
        height="60px"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Left Content */}
        <NavbarBrand className="flex items-center space-x-4">
          <Image src="/stl.png" alt="STL Logo" width={64} height={64} />
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-medium" style={{ color: "#5FC5C1" }}>
              Scientific Team Lab
            </span>
          </div>
        </NavbarBrand>

        {/* Center Content */}
        <NavbarContent justify="center">
          {[
            // { name: "Doctors", path: "/doctors" },
            // { name: "Designers", path: "/designers" },
            // { name: "Case Definition", path: "/case-definition" },
            // { name: "About Us", path: "#" },
          ].map((item) => (
            <NavbarItem key={item.path} isActive={pathname === item.path}>
              <Link
                className={
                  pathname === item.path
                    ? "text-primary font-medium"
                    : "text-default-500"
                }
                href={item.path}
                size="sm"
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Content */}
        <NavbarContent className="hidden md:flex" justify="end">
          {user ? (
            <NavbarItem>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500">
                  {user.username}
                </span>
                
                {/* Admin Button - Only shown for admin users */}
                {user && (
                  <Button
                    className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-400 text-white rounded-full"
                    radius="full"
                    variant="flat"
                    onClick={handleAdminClick}
                  >
                    Track Cases
                  </Button>
                )}
                
                {/* Logout Button */}
                {logout && (
                  <Button 
                    radius="full" 
                    variant="flat"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                )}
              </div>
            </NavbarItem>
          ) : (
            <NavbarItem className="ml-2 !flex gap-2">
              <Link href="/signin">
                <Button radius="full" variant="flat">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-400 text-white rounded-full"
                  radius="full"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenuToggle className="text-default-400 md:hidden" />

        {/* Mobile Menu */}
        <NavbarMenu className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
          {/* Mobile Admin Button - Only shown for logged-in admin users */}
          {user?.role === 'admin' && (
            <NavbarMenuItem className="mb-4">
              <Button
                fullWidth
                className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-400 text-white"
                onClick={handleAdminClick}
              >
                Track Cases
              </Button>
            </NavbarMenuItem>
          )}

          {/* Login/Signup buttons for non-logged in users */}
          {!user && (
            <>
              <NavbarMenuItem>
                <Button fullWidth as={Link} href="/signin" variant="faded">
                  Sign In
                </Button>
              </NavbarMenuItem>
              <NavbarMenuItem className="mb-4">
                <Button
                  fullWidth
                  as={Link}
                  className="bg-foreground text-background"
                  href="/signup"
                >
                  Get Started
                </Button>
              </NavbarMenuItem>
            </>
          )}

          {/* Logout button for logged in users */}
          {user && logout && (
            <NavbarMenuItem className="mb-4">
              <Button
                fullWidth
                variant="faded"
                onClick={logout}
              >
                Logout
              </Button>
            </NavbarMenuItem>
          )}

          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="mb-2 w-full text-default-500"
                href="#"
                size="md"
              >
                {item}
              </Link>
              {index < menuItems.length - 1 && <Divider className="opacity-50" />}
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    );
  }
);

BasicNavbar.displayName = "BasicNavbar";

export default BasicNavbar;