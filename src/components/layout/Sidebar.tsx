import { 
  Home, 
  BookOpen, 
  PlayCircle, 
  TrendingUp, 
  Phone, 
  Settings,
  AlertTriangle,
  ShieldCheck,
  Users,
  BarChart3,
  Bell
} from "lucide-react";
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
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const studentMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Disasters", url: "/disasters", icon: AlertTriangle },
  { title: "Learning Modules", url: "/modules", icon: BookOpen },
  { title: "Virtual Drills", url: "/drills", icon: PlayCircle },
  { title: "Progress", url: "/progress", icon: TrendingUp },
  { title: "Emergency Contacts", url: "/contacts", icon: Phone },
  { title: "Alerts", url: "/alerts", icon: Bell },
];

const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Manage Students", url: "/manage-students", icon: Users },
  { title: "Content Management", url: "/manage-content", icon: BookOpen },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Send Alerts", url: "/send-alerts", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  
  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";
  
  const menuItems = isAdmin ? adminMenuItems : studentMenuItems;
  
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-primary font-medium border-r-2 border-primary" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-sidebar-border`}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-safety rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-sidebar-foreground">DisasterPrep</h2>
              <p className="text-xs text-muted-foreground capitalize">{user.role || "User"}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground font-medium">
            {!collapsed && (isAdmin ? "Admin Panel" : "Student Portal")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className={getNavCls({ isActive: isActive(item.url) })}
                    >
                      <item.icon className={`${collapsed ? "mx-auto" : "mr-3"} h-5 w-5`} />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}