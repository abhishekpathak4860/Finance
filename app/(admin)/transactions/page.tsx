"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Search, Trash2, Edit3, X, 
  CheckCircle2, CreditCard, Calendar, Tag 
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
  const [toast, setToast] = useState({ message: "", visible: false });

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
    <div className="space-y-6 pb-10">
      {/* Toast */}
      {toast.visible && (
        <div className="fixed top-10 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10 z-[200] bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="text-green-400" size={18} />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Transactions</h2>
          <p className="text-sm text-gray-500 font-medium">History of your financial records</p>
        </div>
        {role === "admin" && (
          <button onClick={openAddModal} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2 active:scale-95">
            <Plus size={18} /> Add Transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" placeholder="Search category..." 
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 font-medium text-gray-700 shadow-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 font-bold text-gray-600 outline-none shadow-sm cursor-pointer"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Type</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
              {role === "admin" && <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-400">{t.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{t.category}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${t.type === 'income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{t.type}</span>
                </td>
                <td className={`px-6 py-4 text-sm font-black text-right ${t.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                  {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString()}
                </td>
                {role === "admin" && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => { setEditingTransaction(t); setFormData({ date: t.date, category: t.category, amount: t.amount.toString(), type: t.type }); setIsModalOpen(true); }} className="p-2 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={16}/></button>
                      <button onClick={() => deleteTransaction(t.id)} className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredData.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t.date}</p>
                <h4 className="font-bold text-gray-900">{t.category}</h4>
              </div>
              <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${t.type === 'income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{t.type}</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-50 pt-3">
              <p className={`text-lg font-black ${t.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                {t.type === 'income' ? '+' : '-'}${Number(t.amount).toLocaleString()}
              </p>
              {role === "admin" && (
                <div className="flex gap-2">
                  <button onClick={() => { setEditingTransaction(t); setFormData({ date: t.date, category: t.category, amount: t.amount.toString(), type: t.type }); setIsModalOpen(true); }} className="p-2 bg-gray-50 text-gray-400 rounded-xl"><Edit3 size={16}/></button>
                  <button onClick={() => deleteTransaction(t.id)} className="p-2 bg-red-50 text-red-500 rounded-xl"><Trash2 size={16}/></button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{editingTransaction ? "Edit Record" : "New Entry"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-full text-gray-400"><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl mt-1 font-semibold text-gray-900 focus:ring-2 focus:ring-green-500/20" placeholder="e.g. Shopping" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Amount</label>
                  <input required type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl mt-1 font-semibold text-gray-900 focus:ring-2 focus:ring-green-500/20" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date</label>
                  <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl mt-1 font-semibold text-gray-900 focus:ring-2 focus:ring-green-500/20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-xl">
                <button type="button" onClick={() => setFormData({...formData, type: 'income'})} className={`py-2 rounded-lg text-xs font-bold transition-all ${formData.type === 'income' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400'}`}>Income</button>
                <button type="button" onClick={() => setFormData({...formData, type: 'expense'})} className={`py-2 rounded-lg text-xs font-bold transition-all ${formData.type === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400'}`}>Expense</button>
              </div>
              <button type="submit" className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg shadow-green-100 transition-all active:scale-95">
                {editingTransaction ? "Save Changes" : "Create Transaction"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}