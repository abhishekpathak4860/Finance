"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  ChevronDown,
  Menu,
  X,
  LogOut,
  LineChart,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

// --- Sub-Component: Fixed Admin Header ---
function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <button onClick={onMenuClick} className="lg:hidden text-gray-500 p-2">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>

        <div className="flex items-center gap-2 border border-gray-100 rounded-full p-1 px-3 bg-white shadow-sm">
          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xs uppercase">
            {user.name ? user.name.charAt(0) : "U"}
          </div>
          <div className="hidden sm:flex flex-col text-right">
            <p className="text-[11px] font-black text-gray-900 leading-tight uppercase tracking-tighter">
              {user.name || "Guest User"}
            </p>
            <p className="text-[9px] text-gray-400 leading-tight font-bold">
              {user.email || "no-email@dash.io"}
            </p>
          </div>
          <ChevronDown className="text-gray-300" size={14} />
        </div>
      </div>
    </header>
  );
}

// --- Sub-Component: Admin Sidebar ---
function AdminSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useUser(); // Added setUser to clear context on logout

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Transactions", icon: ArrowLeftRight, href: "/transactions" },
    { name: "Insights", icon: LineChart, href: "/insights" },
  ];

  // --- UPDATED LOGOUT HANDLER ---
  const handleLogout = () => {
    // 1. Clear all user-related data from localStorage
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    // 2. Reset the Global Context State
    setUser({ name: "", email: "", role: "" });

    // 3. Redirect to login
    router.push("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-[100] w-64 transform bg-white border-r transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col
      `}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <Link href="/dashboard" className="text-xl font-extrabold text-gray-900">
            Finance<span className="text-green-600">Dash</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-colors group ${
                  isActive
                    ? "bg-green-50 text-green-700 shadow-inner border border-green-100"
                    : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                }`}
              >
                <item.icon
                  className={isActive ? "text-green-600" : "text-gray-400 group-hover:text-green-600"}
                  size={22}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* --- Sticky Bottom: Logout --- */}
        <div className="p-6 border-t mt-auto">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors active:scale-95 shadow-sm shadow-red-50"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}

// --- Main Layout Component ---
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col lg:pl-64">
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}