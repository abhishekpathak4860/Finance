export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Modern Badge */}
        <div className="mx-auto mb-6 flex max-w-fit items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700">
          <span className="flex h-2 w-2 rounded-full bg-green-600 animate-pulse" />
          New: AI-powered spending insights
        </div>

        <h2 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
          Manage your finances <br />
          <span className="text-green-600">without the headache.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
          The all-in-one dashboard to track income, monitor expenses, and
          visualize your wealth. Built for teams and individuals who value
          clarity.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button className="rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-green-700 transition-all hover:scale-105">
            Start for free
          </button>
          <button className="text-lg font-semibold leading-6 text-gray-900 flex items-center gap-2 hover:text-green-600 transition">
            View Live Demo <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
