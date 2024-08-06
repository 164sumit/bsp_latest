import { Analyze_Data_Sidebar } from "@/components/Analyze_Data_Sidebar";
import React from "react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-full pt-1 gap-1 overflow-auto">
      <div className="hidden md:block">
        <Analyze_Data_Sidebar/>
      </div>
      {/* <div className="md:hidden block ">
        <MobileSidebar />
      </div> */}
      <div className="flex-1 h-full overflow-auto">{children}</div>
    </div>
  );
}