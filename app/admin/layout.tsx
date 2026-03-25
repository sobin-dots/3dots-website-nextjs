"use client";

import { LayoutDashboard, FileText, Briefcase, MessageSquare, Rocket, Settings, Users, Calendar, LogOut, Shield, FileBadge } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, roles: ["Admin", "Content Team", "Lead Management"] },
  { name: "Blog", href: "/admin/blog", icon: FileText, roles: ["Admin", "Content Team"] },
  { name: "Careers", href: "/admin/careers", icon: Briefcase, roles: ["Admin", "Content Team"] },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare, roles: ["Admin", "Lead Management"] },
  { name: "Launchpad", href: "/admin/launchpad", icon: Rocket, roles: ["Admin", "Lead Management"] },
  { name: "Applications", href: "/admin/applications", icon: FileBadge, roles: ["Admin", "Content Team", "Lead Management"] },
  { name: "Team", href: "/admin/team", icon: Users, roles: ["Admin", "Content Team"] },
  { name: "Users", href: "/admin/users", icon: Shield, roles: ["Admin"] },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar, roles: ["Admin", "Lead Management"] },
  { name: "Settings", href: "/admin/settings", icon: Settings, roles: ["Admin"] },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const userRole = session?.user?.role || "Content Team"; // Default to safest restricted role if unknown
  
  // Filter navigation based on roles
  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(userRole)
  );

  // Check if current path is allowed
  const currentItem = navigation.find(item => 
    pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
  );
  
  // If loading, already handled above. If authenticated but role missing, default to restricted.
  const isAllowed = !currentItem || (session?.user && currentItem.roles.includes(userRole));

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-10 text-center">
        <Shield className="w-16 h-16 text-red-500 mb-6" />
        <h1 className="text-3xl font-light text-slate-800 mb-2">Access <span className="font-medium">Denied</span></h1>
        <p className="text-slate-500 max-w-md">You do not have the required permissions to access this module. Please contact your administrator.</p>
        <Link href="/admin" className="mt-8 bg-brand text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition-all">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 shadow-sm">
        <div className="p-8 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white font-bold text-sm">
              3D
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-800">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand/5 text-brand shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-brand" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
