import React from "react";
import { Sidebar } from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-full pt-1 gap-1 overflow-auto">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="md:hidden block ">
        <MobileSidebar />
      </div>
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
}