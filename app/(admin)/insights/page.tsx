"use client";

import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target, 
  AlertTriangle, 
  CheckCircle2,
  PieChart as PieIcon,
  ArrowRight
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";

export default function InsightsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("transactionData");
    if (savedData) setTransactions(JSON.parse(savedData));
    setIsLoaded(true);
  }, []);

  // --- 1. CALCULATIONS LOGIC ---
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const savingsRate = totalIncome > 0 
    ? ((totalIncome - totalExpenses) / totalIncome) * 100 
    : 0;

  // Group by category for the Pie Chart
  const categoryDataObj = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.keys(categoryDataObj).map(key => ({
    name: key,
    value: categoryDataObj[key]
  }));

  // Find Winner/Loser Categories
  const highestCategory = pieData.length > 0 
    ? pieData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name 
    : "N/A";

  const COLORS = ['#16a34a', '#2563eb', '#dc2626', '#ca8a04', '#7c3aed', '#db2777'];

  if (!isLoaded) return null;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Smart Insights</h2>
        <p className="text-gray-500">AI-powered analysis of your financial behavior.</p>
      </div>

      {/* --- 1. THE BIG THREE METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Savings Rate */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-xl text-green-600"><Target size={20} /></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Savings Rate</span>
          </div>
          <h3 className="text-4xl font-black text-gray-900">{savingsRate.toFixed(1)}%</h3>
          <p className="text-xs text-gray-500 mt-2">of your income is being saved.</p>
        </div>

        {/* Burn Rate (Est. Daily) */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><Zap size={20} /></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Daily Burn Rate</span>
          </div>
          <h3 className="text-4xl font-black text-gray-900">${(totalExpenses / 30).toFixed(2)}</h3>
          <p className="text-xs text-gray-500 mt-2">Average spending per day this month.</p>
        </div>

        {/* Income vs Expense Ratio */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-xl text-purple-600"><PieIcon size={20} /></div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Budget Usage</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2">
            <div 
              className={`h-full transition-all duration-1000 ${totalExpenses > totalIncome ? 'bg-red-500' : 'bg-green-500'}`} 
              style={{ width: `${Math.min((totalExpenses/totalIncome)*100, 100)}%` }} 
            />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            {totalExpenses > totalIncome ? "Over Budget" : `${((totalExpenses/totalIncome)*100).toFixed(0)}% Consumed`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- 2. CATEGORICAL VISUALIZATION --- */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h4 className="text-xl font-black text-gray-900 mb-6">Spending Breakdown</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} 
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- 3. WINNER & LOSER CATEGORIES + COMPARISON --- */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[40px] text-white shadow-xl">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingDown className="text-red-400" /> Key Observations
            </h4>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Highest Spending</p>
                  <p className="text-xl font-bold">{highestCategory}</p>
                </div>
                <p className="text-2xl font-black text-red-400">${categoryDataObj[highestCategory] || 0}</p>
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Monthly Comparison</p>
                  <p className="text-sm font-medium text-white/80">You spent 12% more on <span className="text-white font-bold">{highestCategory}</span> than last month.</p>
                </div>
                <div className="text-red-400"><TrendingUp size={24} /></div>
              </div>
            </div>
          </div>

          {/* --- 4. SMART OBSERVATIONS (The AI Box) --- */}
          <div className="bg-green-50 p-8 rounded-[40px] border border-green-100">
            <h4 className="text-green-900 font-black mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} /> Smart Advice
            </h4>
            <ul className="space-y-4">
              {totalExpenses > totalIncome ? (
                <li className="flex gap-3 text-sm text-red-700 font-medium bg-white p-4 rounded-2xl border border-red-100">
                  <AlertTriangle className="shrink-0" />
                  Warning: You are spending more than you earn. Consider cutting down on {highestCategory}.
                </li>
              ) : (
                <li className="flex gap-3 text-sm text-green-700 font-medium bg-white p-4 rounded-2xl border border-green-100">
                  <CheckCircle2 className="shrink-0" />
                  Great job! You have reached your savings goal this month.
                </li>
              )}
              
              <li className="flex gap-3 text-sm text-gray-700 font-medium bg-white p-4 rounded-2xl border border-gray-100">
                <ArrowRight className="shrink-0 text-green-600" />
                You spent ${categoryDataObj[highestCategory] || 0} on {highestCategory}. Try a "No-Spend Week" to save roughly $40.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}