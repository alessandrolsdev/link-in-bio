interface CurrentFocusWidgetProps {
  status: string;
}

export function CurrentFocusWidget({ status }: CurrentFocusWidgetProps) {
  return (
    <div className="flex-1 p-4 bg-zinc-900/40 border border-yellow-500/20 rounded-xl hover:border-yellow-500/50 transition-colors flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2 text-yellow-500 text-xs font-mono font-bold uppercase">
        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
        Current_Focus
      </div>
      <p className="text-sm text-zinc-300 font-mono">
        <span className="typewriter">{status}</span>
      </p>
    </div>
  );
}

