import { IconGridDots, IconMenu2 } from "@tabler/icons-react";
import Button from "@/components/button/Button";
import Sidebar from "@/components/header/Sidebar";
import React, { useState } from 'react';

export default function Toggle() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
    const closeSidebar = () => {
        setSidebarOpen(false);
    };
  return (
    <div className="h-full items-center flex">
        <Button variant="default" onClick={toggleSidebar}><IconGridDots/></Button>
        <Sidebar isOpen={sidebarOpen}  onClose={closeSidebar} />
    </div>
  )
}