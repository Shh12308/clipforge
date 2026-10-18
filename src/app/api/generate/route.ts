import { NextResponse } from "next/server";

type Input = {
  trade?: string;
  business?: string;
  location?: string;
  job?: string;
  platform?: string;
};

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as Input;

    const trade = String(input.trade || "Tradesperson").slice(0, 80);
    const business = String(input.business || "").slice(0, 100);
    const location = String(input.location || "").slice(0, 100);
    const job = String(input.job || "").trim().slice(0, 1500);
    const platform = String(input.platform || "Facebook").slice(0, 40);

    if (job.length < 8) {
      return NextResponse.json(
        { error: "Please describe the job in more detail." },
        { status: 400 }
      );
    }

    const name = business || `Your local ${trade.toLowerCase()} team`;
    const area = location ? ` in ${location}` : "";

    const demoResults = [
      {
        title: "Project update",
        content:
          `Another job completed${area}!\n\n` +
          `At ${name}, we're proud to help customers with quality ` +
          `${trade.toLowerCase()} work. Here's a recent project: ${job}\n\n` +
          "Need help with a similar job? Send us a message to discuss your requirements.\n\n" +
          `#${trade.replace(/[^a-z0-9]/gi, "")} #LocalBusiness`,
      },
      {
        title: "Promotional post",
        content:
          `Looking for a reliable ${trade.toLowerCase()}${area}?\n\n` +
          `We recently completed: ${job}\n\n` +
          "Planning a similar project? Get in touch to discuss your requirements and request a quote.",
      },
      {
        title: "Short-video script",
        content:
          `HOOK: "Here's what we've been working on."\n\n` +
          `SHOW: Film clear shots of the finished job.\n\n` +
          `EXPLAIN: "${job}"\n\n` +
          'CLOSE: "Have a similar project in mind? Message us."\n\n' +
          `Format this for ${platform}.`,
      },
    ];

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        mode: "demo",
        results: demoResults,
        notice: "Demo mode: configure OPENAI_API_KEY to enable AI.",
      });
    }

    const prompt = `
Create exactly three different marketing assets for a UK tradesperson.

Trade: ${trade}
Business: ${business || "Not provided"}
Service area: ${location || "Not provided"}
Platform: ${platform}
Completed work: ${job}

Return only valid JSON:
{
  "results": [
    {"title": "Project update", "content": "..."},
    {"title": "Promotional post", "content": "..."},
    {"title": "Short-video script", "content": "..."}
  ]
}

Use British English. Do not invent prices, qualifications, testimonials,
guarantees or facts. Include a sensible call to action.
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Generate honest, useful marketing content.",
            },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "AI generation failed. Please try again." },
        { status: 502 }
      );
    }

    const payload = await response.json();
    const content = payload.choices?.[0]?.message?.content;

    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "Unexpected AI response." },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed.results)) {
      return NextResponse.json(
        { error: "No content was generated." },
        { status: 502 }
      );
    }

    const results = parsed.results.slice(0, 3).map(
      (item: { title?: unknown; content?: unknown }) => ({
        title: String(item.title || "Marketing idea").slice(0, 120),
        content: String(item.content || "").slice(0, 5000),
      })
    );

    return NextResponse.json({ mode: "ai", results });
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}
