"use client";

import useSWR from "swr";

interface StatusResponse {
  status: string;
}

async function fetcher(url: string): Promise<StatusResponse> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Status request failed: ${res.status}`);
  }
  const data: unknown = await res.json();
  if (!data || typeof data !== "object" || !("status" in data)) {
    throw new Error("Invalid status payload");
  }
  const status = (data as { status: unknown }).status;
  if (typeof status !== "string") {
    throw new Error("Invalid status type");
  }
  return { status };
}

export function CurrentFocusWidget() {
  const { data, isLoading, error } = useSWR<StatusResponse>("/api/status", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5 * 60 * 1000,
  });

  const text = error
    ? "System Idle..."
    : isLoading
      ? "Sincronizando sinais..."
      : data?.status ?? "System Idle...";

  return (
    <div className="flex-1 p-4 bg-zinc-900/40 border border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-colors flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2 text-yellow-500 text-xs font-mono font-bold uppercase">
        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
        Current_Focus
      </div>
      <p className="text-sm text-zinc-300 font-mono">
        <span className="typewriter">{text}</span>
      </p>
    </div>
  );
}

