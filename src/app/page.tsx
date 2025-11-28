'use client';

import { useState, useEffect } from "react";

// React + Tailwind single-file component library
// Default export: EventsApp
// Usage: drop into a React app with Tailwind configured (PostCSS or Tailwind CLI)

// -----------------------------
// Types
// -----------------------------

type EventRow = {
  CODENAME: string;
  GUNAME: string;
  TITLE: string;
  DATE: string;
  PLACE: string;
  ORG_NAME: string;
  USE_TRGT: string;
  USE_FEE: string;
  INQUIRY: string;
  MAIN_IMG: string;
  RGSTDATE: string;
  STRTDATE: string;
  END_DATE: string;
  THEMECODE: string;
  LOT?: string;
  LAT?: string;
  IS_FREE?: string;
  HMPG_ADDR?: string;
  PRO_TIME?: string;
};

// -----------------------------
// Helpers
// -----------------------------

function formatDateRange(dateStr: string) {
  // input like: "2025-12-30~2025-12-30"
  if (!dateStr) return "";
  const parts = dateStr.split("~").map((s) => s.trim());
  if (parts.length === 1 || parts[0] === parts[1]) return parts[0];
  return `${parts[0]} — ${parts[1]}`;
}

function isForeignFriendly(event: EventRow) {
  // Simple heuristic: music / visual / family events are usually foreign-friendly
  const cat = (event.CODENAME || "").toLowerCase();
  const theme = (event.THEMECODE || "").toLowerCase();
  const title = (event.TITLE || "").toLowerCase();

  if (cat.includes("클래식") || cat.includes("뮤직") || cat.includes("연극") || theme.includes("어린이")) {
    // classical music / music / visual performances / children's shows
    return true;
  }

  // Titles with familiar keywords (Ghibli / Disney / Musical names) — English-friendly
  if (title.includes("gibli") || title.includes("ghibli") || title.includes("disney") || title.includes("ost")) return true;

  // If admission is free or venue is an art hall, often foreign-friendly
  if ((event.USE_FEE || "").includes("전석") || (event.PLACE || "").toLowerCase().includes("art")) return true;

  return false;
}

// -----------------------------
// UI Components
// -----------------------------

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${className}`}>{children}</span>
  );
}

function EventCard({ event, onOpen }: { event: EventRow; onOpen: (e: EventRow) => void }) {
  const friendly = isForeignFriendly(event);
  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="w-full h-44 md:h-52 bg-gray-100 overflow-hidden">
        <img src={event.MAIN_IMG || "https://via.placeholder.com/800x450?text=No+Image"} alt={event.TITLE} className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex gap-2 items-center">
            <Badge className="bg-blue-50 text-blue-700">{event.CODENAME || event.THEMECODE || "Event"}</Badge>
            {friendly && <Badge className="bg-yellow-100 text-yellow-800">⭐ Foreign-friendly</Badge>}
          </div>
          <div className="text-sm text-gray-500">{event.GUNAME}</div>
        </div>

        <h3 className="text-md md:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{event.TITLE}</h3>

        <div className="text-sm text-gray-600 space-y-1 mb-3">
          <div>📅 {formatDateRange(event.DATE)}</div>
          <div>📍 {event.PLACE}</div>
          <div>💰 {event.USE_FEE || (event.IS_FREE === "무료" ? "Free" : "Varies")}</div>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => onOpen(event)} className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
            View Details
          </button>

          <a href={event.HMPG_ADDR || '#'} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
            Official →
          </a>
        </div>
      </div>
    </article>
  );
}

function FilterBar({ q, setQ, foreignOnly, setForeignOnly }: any) {
  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex gap-3 items-center">
        <div className="flex-1">
          <div className="relative">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events, places, keywords..." className="w-full rounded-xl border border-gray-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <div className="absolute right-3 top-3 text-gray-400">🔎</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={foreignOnly} onChange={(e) => setForeignOnly(e.target.checked)} className="w-4 h-4" />
            <span>Foreign-friendly</span>
          </label>

          <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm">Filters</button>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ event, onClose }: { event: EventRow | null; onClose: () => void }) {
  if (!event) return null;
  const friendly = isForeignFriendly(event);

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-auto max-h-[90vh]">
        <div className="w-full h-56 md:h-72 bg-gray-100">
          <img src={event.MAIN_IMG || 'https://via.placeholder.com/1200x600'} alt={event.TITLE} className="w-full h-full object-cover rounded-t-2xl" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{event.TITLE}</h2>
              <div className="mt-2 flex gap-2 items-center">
                <Badge className="bg-blue-50 text-blue-700">{event.CODENAME}</Badge>
                {friendly && <Badge className="bg-yellow-100 text-yellow-800">⭐ Highly suitable for foreign visitors</Badge>}
              </div>
            </div>

            <div className="text-sm text-gray-600 text-right">
              <div>{event.GUNAME}</div>
              <div className="mt-2">{event.ORG_NAME}</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>📅 <strong>{formatDateRange(event.DATE)}</strong></div>
            <div>🕒 <strong>{event.PRO_TIME || ''}</strong></div>
            <div>📍 <strong>{event.PLACE}</strong></div>
            <div className="md:col-span-2">💰 <strong>{event.USE_FEE}</strong></div>
            <div>👥 <strong>{event.USE_TRGT}</strong></div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Short English Summary</h3>
            <p className="mt-2 text-gray-700">
              {/* Placeholder for AI-generated summary - in a production app, fetch from your server which calls OpenAI */}
              This event is a music concert featuring well-known film soundtracks. It is visually and aurally approachable for visitors who do not speak Korean.
            </p>

            <div className="mt-4 space-y-2">
              <a href={event.HMPG_ADDR || '#'} target="_blank" rel="noreferrer" className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">Official Website</a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${event.LAT || ''},${event.LOT || ''}`} target="_blank" rel="noreferrer" className="inline-block px-4 py-2 rounded-lg border border-gray-200 text-sm">Open in Maps</a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// -----------------------------
// Main App
// -----------------------------

export default function Home({ data }: { data?: EventRow[] }) {
  // 初始使用服务端传入的数据，否则为空数组并触发客户端拉取
  const [rows, setRows] = useState<EventRow[]>(data && data.length ? data : []);
  const [loadingRows, setLoadingRows] = useState(rows.length === 0);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    // 已有数据则不再请求
    if (rows.length > 0) return;

    const controller = new AbortController();
    setLoadingRows(true);
    setFetchError(null);

    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events', { signal: controller.signal });
        const raw = await res.text();
        let json: any;
        try {
          json = JSON.parse(raw);
        } catch {
          json = raw;
        }

        if (res.status === 200) {
          const list = Array.isArray(json) ? json : (json?.data ?? []);
          setRows(list as EventRow[]);
          setFetchError(null);
        } else {
          setFetchError(`HTTP ${res.status}`);
        }
      } catch (err) {
        setFetchError('网络错误或请求被取消');
      } finally {
        setLoadingRows(false);
      }
    })();

    return () => controller.abort();
  }, [rows.length]);

  const [q, setQ] = useState("");
  const [foreignOnly, setForeignOnly] = useState(false);
  const [selected, setSelected] = useState<EventRow | null>(null);

  const filtered = rows.filter((r) => {
    if (foreignOnly && !isForeignFriendly(r)) return false;
    if (!q) return true;
    const v = `${r.TITLE} ${r.PLACE} ${r.CODENAME} ${r.THEMECODE}`.toLowerCase();
    return v.includes(q.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-bold text-xl text-blue-700">Seoul Events</div>
            <div className="text-sm text-gray-600">Discover performances & experiences</div>
          </div>

          <nav className="flex items-center gap-4 text-sm text-gray-700">
            <a className="hover:text-blue-600" href="#">Home</a>
            <a className="hover:text-blue-600" href="#">Events</a>
            <a className="hover:text-blue-600" href="#">About</a>
            <button className="px-3 py-1 rounded-full border border-gray-200">EN</button>
          </nav>
        </div>
      </header>

      <FilterBar q={q} setQ={setQ} foreignOnly={foreignOnly} setForeignOnly={setForeignOnly} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Events in Seoul</h1>

        {loadingRows && (
          <div className="text-center py-12 text-gray-500">正在加载活动列表…</div>
        )}

        {fetchError && (
          <div className="text-center py-12 text-red-600">加载失败：{fetchError}</div>
        )}

        {!loadingRows && !fetchError && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((row, idx) => (
                <EventCard key={`${row.HMPG_ADDR || row.TITLE}-${idx}`} event={row} onOpen={setSelected} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">No events found. Try adjusting filters.</div>
            )}

            <div className="mt-8 flex justify-center">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg">Load more</button>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">© {new Date().getFullYear()} Seoul Events • Built with ❤️</div>
      </footer>

      <DetailModal event={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
