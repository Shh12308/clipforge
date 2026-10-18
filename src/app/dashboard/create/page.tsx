"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Sparkles, Copy } from "lucide-react";

type Result = {
  title: string;
  content: string;
};

export default function CreatePage() {
  const [trade, setTrade] = useState("Plumber");
  const [business, setBusiness] = useState("");
  const [location, setLocation] = useState("");
  const [job, setJob] = useState("");
  const [platform, setPlatform] = useState("Facebook");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trade,
          business,
          location,
          job,
          platform,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed.");
      }

      setResults(data.results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyContent(content: string) {
    await navigator.clipboard.writeText(content);
  }

  return (
    <main className="min-h-screen px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold">
          <ArrowLeft className="mr-2 inline" size={16} />
          Back to ClipForge
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[360px_1fr]">
          <section className="h-fit rounded-3xl border bg-white p-6">
            <h1 className="text-2xl font-black">
              Create content
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Tell us about your latest job.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block text-sm font-semibold">
                Your trade
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="mt-2 w-full rounded-xl border p-3"
                >
                  {[
                    "Plumber",
                    "Electrician",
                    "Builder",
                    "Decorator",
                    "Landscaper",
                    "Other",
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold">
                Business name
                <input
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  maxLength={100}
                  placeholder="ABC Plumbing"
                  className="mt-2 w-full rounded-xl border p-3"
                />
              </label>

              <label className="block text-sm font-semibold">
                Service area
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  maxLength={100}
                  placeholder="Middlesbrough"
                  className="mt-2 w-full rounded-xl border p-3"
                />
              </label>

              <label className="block text-sm font-semibold">
                Describe the completed job
                <textarea
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  maxLength={1500}
                  rows={5}
                  placeholder="Installed a new boiler and replaced old pipework..."
                  className="mt-2 w-full rounded-xl border p-3"
                />
              </label>

              <label className="block text-sm font-semibold">
                Platform
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="mt-2 w-full rounded-xl border p-3"
                >
                  <option>Facebook</option>
                  <option>Instagram</option>
                  <option>LinkedIn</option>
                </select>
              </label>

              <button
                onClick={generate}
                disabled={loading || job.trim().length < 8}
                className="w-full rounded-full bg-[#14211d] p-4 font-bold text-white disabled:opacity-50"
              >
                <Sparkles className="mr-2 inline" size={18} />
                {loading ? "Generating..." : "Generate my posts"}
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black">
              Your content studio
            </h2>

            <p className="mt-2 text-gray-500">
              Your generated marketing content appears here.
            </p>

            {error && (
              <p className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">
                {error}
              </p>
            )}

            <div className="mt-6 space-y-4">
              {results.map((result, index) => (
                <article
                  key={index}
                  className="rounded-2xl border bg-white p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold">
                      {result.title}
                    </h3>

                    <button
                      onClick={() => copyContent(result.content)}
                      className="rounded-full border px-3 py-2 text-sm"
                    >
                      <Copy className="mr-1 inline" size={15} />
                      Copy
                    </button>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-700">
                    {result.content}
                  </p>
                </article>
              ))}

              {!results.length && !loading && (
                <div className="rounded-2xl border border-dashed bg-white p-12 text-center text-gray-500">
                  Describe a job to generate your first posts.
                </div>
              )}

              {loading && (
                <div className="rounded-2xl border bg-white p-12 text-center">
                  Creating your content...
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
