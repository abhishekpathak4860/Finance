"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Search, Filter, Trash2, Edit3, X, 
  ArrowUpRight, ArrowDownLeft, CheckCircle2 
} from "lucide-react";

const initialTransactions = [
  { id: 1, date: "2024-03-25", amount: 2500, category: "Salary", type: "income" },
  { id: 2, date: "2024-03-24", amount: 150, category: "Groceries", type: "expense" },
  { id: 3, date: "2024-03-22", amount: 500, category: "Freelance", type: "income" },
  { id: 4, date: "2024-03-20", amount: 80, category: "Subscription", type: "expense" },
  { id: 5, date: "2024-03-18", amount: 120, category: "Dining", type: "expense" },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [formData, setFormData] = useState({ date: "", category: "", amount: "", type: "expense" });
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

  useEffect(() => {
    const savedData = localStorage.getItem("transactionData");
    if (savedData) {
      setTransactions(JSON.parse(savedData));
    } else {
      setTransactions(initialTransactions);
    }
    setRole(localStorage.getItem("userRole"));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("transactionData", JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  const showToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setFormData({ date: new Date().toISOString().split('T')[0], category: "", amount: "", type: "expense" });
    setIsModalOpen(true);
  };

  const openEditModal = (transaction: any) => {
    setEditingTransaction(transaction);
    setFormData({ 
      date: transaction.date, 
      category: transaction.category, 
      amount: transaction.amount.toString(), 
      type: transaction.type 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: editingTransaction ? editingTransaction.id : Date.now(),
      date: formData.date,
      category: formData.category,
      amount: parseFloat(formData.amount),
      type: formData.type
    };

    if (editingTransaction) {
      setTransactions(transactions.map(t => t.id === editingTransaction.id ? newEntry : t));
      showToast("Updated successfully!");
    } else {
      setTransactions([newEntry, ...transactions]);
      showToast("Added successfully!");
    }
    setIsModalOpen(false);
  };

  const deleteTransaction = (id: number) => {
    if (confirm("Delete permanently?")) {
      setTransactions(transactions.filter(t => t.id !== id));
      showToast("Deleted.");
    }
  };

  const filteredData = transactions.filter((t) => {
    const matchesFilter = filter === "all" || t.type === filter;
    const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!isLoaded) return null;

  return (
    <div className="space-y-6 relative pb-10 max-w-full">
      {/* --- TOAST NOTIFICATION --- */}
      {toast.visible && (
        <div className="fixed top-20 right-4 left-4 md:left-auto md:right-6 z-[200] flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-10 md:slide-in-from-right-full duration-300">
          <CheckCircle2 className="text-green-400 shrink-0" size={20} />
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-1">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <p className="text-sm text-gray-500">Manage your financial records.</p>
        </div>
        {role === "admin" && (
          <button onClick={openAddModal} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95">
            <Plus size={20} /> Add Transaction
          </button>
        )}
      </div>

      {/* --- FILTERS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-3 rounded-[24px] border border-gray-100 shadow-sm mx-1">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search category..." 
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none font-medium"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none cursor-pointer" 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* --- RESPONSIVE TABLE --- */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden mx-1">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left min-w-[750px] border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                {role === "admin" ? (
                  <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-gray-500 whitespace-nowrap">{t.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold whitespace-nowrap">{t.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                      t.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-black whitespace-nowrap ${t.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                    {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString()}
                  </td>
                  {role === "admin" ? (
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEditModal(t)} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"><Edit3 size={16} /></button>
                        <button onClick={() => deleteTransaction(t.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FORM MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-50">
              <h3 className="text-xl font-black text-gray-900">{editingTransaction ? "Edit Entry" : "New Entry"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category Name</label>
                <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none font-semibold focus:ring-2 focus:ring-green-500/20" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount ($)</label>
                  <input required type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none font-semibold focus:ring-2 focus:ring-green-500/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</label>
                  <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl outline-none font-semibold focus:ring-2 focus:ring-green-500/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</label>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-50 rounded-2xl">
                  <button type="button" onClick={() => setFormData({...formData, type: 'income'})} className={`py-3 rounded-xl text-[10px] font-black transition-all ${formData.type === 'income' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400'}`}>INCOME</button>
                  <button type="button" onClick={() => setFormData({...formData, type: 'expense'})} className={`py-3 rounded-xl text-[10px] font-black transition-all ${formData.type === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400'}`}>EXPENSE</button>
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-green-600 hover:bg-green-700 text-white font-black rounded-[20px] shadow-xl shadow-green-100 transition-all active:scale-95">
                {editingTransaction ? "SAVE CHANGES" : "ADD TRANSACTION"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}