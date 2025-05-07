
import { Home, Users, Phone, FolderKanban, ClipboardList, HardHat, BarChart3, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    to: "/",
  },
  {
    title: "Leads",
    icon: Users,
    to: "/leads",
  },
  {
    title: "Activities",
    icon: Phone,
    to: "/activities",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    to: "/projects",
  },
  {
    title: "Tasks",
    icon: ClipboardList,
    to: "/tasks",
  },
  {
    title: "Workers",
    icon: HardHat,
    to: "/workers",
  },
  {
    title: "Reports",
    icon: BarChart3,
    to: "/reports",
  },
  {
    title: "Knowledge Base",
    icon: BookOpen,
    to: "/knowledge",
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-6 py-4 h-16">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-subcon-primary flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="text-lg font-semibold text-white">SubCon360</span>
        </div>
        <SidebarTrigger className="ml-auto lg:hidden text-sidebar-foreground hover:text-white" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.to} className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-6 py-4">
        <div className="flex flex-col space-y-2">
          <div className="text-xs text-sidebar-foreground/70">
            SubCon360 v1.0
          </div>
          <Button variant="secondary" size="sm" className="w-full">
            Help & Support
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
