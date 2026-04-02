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
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="relative flex flex-col items-start p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 rounded-xl bg-green-50 p-3">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
