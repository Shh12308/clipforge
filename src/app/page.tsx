import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Camera,
  MessageSquareText,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Start with a real job",
    description:
      "Describe a completed project and turn it into marketing content in seconds.",
  },
  {
    icon: MessageSquareText,
    title: "Ready-to-use posts",
    description:
      "Generate captions, calls to action and short-video scripts.",
  },
  {
    icon: CalendarDays,
    title: "Stay consistent",
    description:
      "Build a repeatable habit of showing customers your work.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-2xl font-black">
          <span className="mr-2 text-emerald-700">✳</span>
          clipforge
        </Link>

        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <Link
          href="/dashboard/create"
          className="rounded-full bg-[#14211d] px-5 py-3 text-sm font-bold text-white"
        >
          Try it free <ArrowRight className="ml-1 inline" size={16} />
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-lime-100 px-4 py-2 text-sm font-semibold">
            <Sparkles size={16} /> Built for independent trades
          </div>

          <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl">
            Your work is good.
            <span className="block text-emerald-700">
              Show the world.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Turn completed jobs into professional social posts,
            promotional ideas and video scripts without spending
            your evenings writing marketing.
          </p>

          <Link
            href="/dashboard/create"
            className="mt-8 inline-flex rounded-full bg-[#14211d] px-7 py-4 font-bold text-white"
          >
            Create your first post
            <ArrowRight className="ml-2" size={18} />
          </Link>

          <p className="mt-5 text-sm text-gray-500">
            <Check className="mr-1 inline text-emerald-700" size={16} />
            Edit everything before publishing.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
            Example preview
          </p>

          <div className="mt-5 rounded-2xl bg-[#edf1e9] p-6">
            <h2 className="font-bold">ABC Plumbing</h2>

            <p className="mt-4 leading-7">
              Another bathroom transformation completed! 🚿
              A clean finish, quality fittings and attention to
              every detail.
            </p>

            <p className="mt-4 leading-7">
              Need help with your next project? Get in touch
              to discuss your requirements.
            </p>

            <p className="mt-4 text-sm text-emerald-800">
              #Plumbing #BathroomRenovation #LocalBusiness
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Example marketing content.
          </p>
        </div>
      </section>

      <section id="features" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black sm:text-4xl">
            Marketing without the headache.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-gray-200 p-6"
              >
                <Icon size={28} className="text-emerald-700" />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-gray-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl bg-[#14211d] p-8 text-white sm:p-12">
          <h2 className="text-3xl font-black">
            Start for free.
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-gray-300">
            Try the content generator first. Paid plans can later
            unlock higher usage limits, saved branding and
            additional marketing tools.
          </p>

          <Link
            href="/dashboard/create"
            className="mt-6 inline-block rounded-full bg-lime-300 px-6 py-3 font-bold text-[#14211d]"
          >
            Try the generator
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ClipForge
      </footer>
    </main>
  );
}
