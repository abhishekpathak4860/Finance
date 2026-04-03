import { LineChart, ShieldCheck, Wallet } from "lucide-react";

const features = [
  {
    title: "Track Transactions",
    desc: "Real-time sync with your bank accounts to monitor every penny.",
    icon: <Wallet className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Visual Insights",
    desc: "Beautifully rendered charts that break down your spending habits.",
    icon: <LineChart className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Role Based Access",
    desc: "Securely share data with accountants or family with custom permissions.",
    icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
  },
];

export default function Features() {
  return (
    <section className="bg-gray-50 dark:bg-zinc-900/50 py-24 transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-start p-8 bg-white dark:bg-zinc-900 rounded-[32px] border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-4 rounded-2xl bg-green-50 dark:bg-green-900/20 p-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}