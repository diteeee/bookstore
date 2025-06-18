// pages/dashboard.tsx
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  ChartBarIcon,
  HomeIcon,
  UserIcon,
  CogIcon,
  LogoutIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

export default function Dashboard() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar collapsed on mobile by default

  const navigation = [
    { name: "Home", icon: HomeIcon, href: "/" },
    { name: "Stats", icon: ChartBarIcon, href: "#" },
    { name: "Profile", icon: UserIcon, href: "/profile" },
    { name: "Cart", icon: ShoppingCartIcon, href: "/cart" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col transition-width duration-300 fixed z-10 ${
          sidebarOpen ? "w-64" : "w-20"
        } sm:relative sm:w-64`}
      >
        {/* Logo */}
        <div className="flex items-center mb-8 p-4">
          <span className="text-2xl font-bold text-blue-600">
            {sidebarOpen ? "Dashboard" : "D"}
          </span>
          <button
            className="ml-auto text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-4 px-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg p-2"
            >
              <item.icon className="w-6 h-6" />
              <span className={`${sidebarOpen ? "ml-3" : "hidden"} sm:block`}>
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={() => signOut()}
          className="mt-auto flex items-center text-red-600 hover:text-red-800 hover:bg-gray-100 rounded-lg p-2 px-4"
        >
          <LogoutIcon className="w-6 h-6" />
          <span className={`${sidebarOpen ? "ml-3" : "hidden"} sm:block`}>
            Logout
          </span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col sm:ml-64 ml-20">
        {/* Navbar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <button
            className="sm:hidden text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg shadow flex items-center">
              <div className="bg-blue-600 text-white p-4 rounded-full mr-4">
                <ChartBarIcon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">120</h2>
                <p className="text-gray-600">New Users</p>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-lg shadow flex items-center">
              <div className="bg-green-600 text-white p-4 rounded-full mr-4">
                <UserIcon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">45</h2>
                <p className="text-gray-600">Active Sessions</p>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg shadow flex items-center">
              <div className="bg-yellow-600 text-white p-4 rounded-full mr-4">
                <CogIcon className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">12</h2>
                <p className="text-gray-600">Pending Issues</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">No recent activity to show.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
