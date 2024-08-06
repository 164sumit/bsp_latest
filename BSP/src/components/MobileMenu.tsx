// components/MobileMenu.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProfileSelector from "./ProfileSelector";
import SignOutButton from "./SignOutButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const MobileMenu = ({
  userRole,
  session,
}: {
  userRole: string;
  session: any;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="md:hidden">
      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DrawerTrigger>
          <HamburgerMenuIcon className="text-white h-6 w-6" />
        </DrawerTrigger>
        <DrawerContent>
          {/* <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader> */}
          <DrawerClose className="text-dc3">
            <nav className="flex flex-col items-center py-4">
              <NavLinks userRole={userRole} onLinkClick={handleLinkClick} />
              {/* <ProfileSelector /> */}
              {session?.user && <SignOutButton />}
            </nav>
            <Button variant="outline" onClick={() => setMobileMenuOpen(false)}>
              Cancel
            </Button>
          </DrawerClose>
          {/* <DrawerFooter>
          <Button>Submit</Button>
        </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const NavLinks = ({
  userRole,
  onLinkClick,
}: {
  userRole: string;
  onLinkClick: () => void;
}) => (
  <>
    <Link
      href="/dashboard"
      className="text-dc3 transition-colors hover:text-dc3 hover:bg-dc2 rounded-lg px-3 py-2 m-1"
      onClick={onLinkClick}
    >
      Dashboard
    </Link>
    {userRole === "Power" && (
      <Link
        href="/signal_config"
        onClick={onLinkClick}
        className="text-dc3 transition-colors hover:text-dc3 hover:bg-dc2 rounded-lg px-3 py-2 m-1"
      >
        Signal-Config
      </Link>
    )}
    {userRole === "Admin" && (
      <Link
        href="/logs"
        onClick={onLinkClick}
        className="text-dc3 transition-colors hover:text-dc3 hover:bg-dc2 rounded-lg px-3 py-2 m-1"
      >
        Logs
      </Link>
    )}
  </>
);

export default MobileMenu;
