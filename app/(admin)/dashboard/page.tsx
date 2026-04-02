"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock Data for the Chart
const data = [
  { name: "Jan", balance: 4000 },
  { name: "Feb", balance: 3000 },
  { name: "Mar", balance: 5000 },
  { name: "Apr", balance: 4500 },
  { name: "May", balance: 6000 },
  { name: "Jun", balance: 5500 },
];

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Sync the role from local storage for UI logic
    setRole(localStorage.getItem("userRole"));
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. Welcome Header & Role Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Financial Overview
          </h2>
          <p className="text-gray-500 text-sm">
            Welcome back! Here is what's happening with your money.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-2xl shadow-sm">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Access Level:
          </span>
          <span
            className={`text-xs font-bold px-2 py-1 rounded-md ${role === "admin" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
          >
            {role?.toUpperCase() || "LOADING..."}
          </span>
        </div>
      </div>

      {/* 2. Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card: Total Balance */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-2xl text-green-600">
              <Wallet size={24} />
            </div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-lg">
              <TrendingUp size={14} /> +2.5%
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">Total Balance</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">$12,450.00</h3>
        </div>

        {/* Card: Monthly Income */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <ArrowUpCircle size={24} />
            </div>
            <span className="text-gray-400 text-xs font-medium italic">
              vs last month
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">Monthly Income</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">$3,200.00</h3>
        </div>

        {/* Card: Monthly Expenses */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-2xl text-red-600">
              <ArrowDownCircle size={24} />
            </div>
            <span className="flex items-center gap-1 text-red-600 text-sm font-medium bg-red-50 px-2 py-1 rounded-lg">
              <TrendingDown size={14} /> -12%
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">Monthly Expenses</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">$1,150.00</h3>
        </div>
      </div>

      {/* 3. Visualization Section (Balance Trend) */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Balance Trend</h3>
            <p className="text-sm text-gray-500">
              Your wealth growth over the last 6 months.
            </p>
          </div>
          <select className="bg-gray-50 border border-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-500/20">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#16a34a"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorBalance)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
