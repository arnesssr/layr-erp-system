import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { menuItems } from "./sidebar/SidebarMenuItems";

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="fixed group w-sidebar-collapsed hover:w-sidebar-expanded transition-all duration-300">
      <SidebarContent>
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ERP System
          </h1>
          <div className="text-xl font-bold text-white opacity-100 group-hover:opacity-0 absolute top-4 left-4 transition-opacity duration-300">
            ERP
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      ${location.pathname === item.path ? "bg-blue-600 text-white" : "hover:bg-gray-800"}
                      transition-all duration-300
                      overflow-hidden
                    `}
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 min-w-5" />
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                  {item.subItems && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={location.pathname === subItem.path}
                          >
                            <Link to={subItem.path}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}