import { type LucideIcon } from "lucide-react";

type WidgetTone = "zinc" | "green" | "purple" | "red" | "yellow" | "blue";
type WidgetStatusVariant = "card" | "inline";

interface WidgetStatusProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  tone?: WidgetTone;
  variant?: WidgetStatusVariant;
  className?: string;
}

const toneClasses: Record<
  WidgetTone,
  {
    container: string;
    badge: string;
    icon: string;
    glow: string;
    title: string;
    description: string;
  }
> = {
  zinc: {
    container: "border-white/5 bg-zinc-900/60",
    badge: "border-zinc-700/50 bg-zinc-800/70",
    icon: "text-zinc-300",
    glow: "bg-zinc-500/10",
    title: "text-zinc-100",
    description: "text-zinc-500",
  },
  green: {
    container: "border-green-500/20 bg-green-500/5",
    badge: "border-green-500/20 bg-green-500/10",
    icon: "text-green-400",
    glow: "bg-green-500/10",
    title: "text-green-50",
    description: "text-green-200/70",
  },
  purple: {
    container: "border-purple-500/20 bg-purple-500/5",
    badge: "border-purple-500/20 bg-purple-500/10",
    icon: "text-purple-400",
    glow: "bg-purple-500/10",
    title: "text-purple-50",
    description: "text-purple-200/70",
  },
  red: {
    container: "border-red-500/20 bg-red-500/5",
    badge: "border-red-500/20 bg-red-500/10",
    icon: "text-red-400",
    glow: "bg-red-500/10",
    title: "text-red-50",
    description: "text-red-200/70",
  },
  yellow: {
    container: "border-yellow-500/20 bg-yellow-500/5",
    badge: "border-yellow-500/20 bg-yellow-500/10",
    icon: "text-yellow-400",
    glow: "bg-yellow-500/10",
    title: "text-yellow-50",
    description: "text-yellow-200/70",
  },
  blue: {
    container: "border-cyan-500/20 bg-cyan-500/5",
    badge: "border-cyan-500/20 bg-cyan-500/10",
    icon: "text-cyan-400",
    glow: "bg-cyan-500/10",
    title: "text-cyan-50",
    description: "text-cyan-200/70",
  },
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function WidgetStatus({
  icon: Icon,
  label,
  title,
  description,
  tone = "zinc",
  variant = "card",
  className,
}: WidgetStatusProps) {
  const palette = toneClasses[tone];

  if (variant === "inline") {
    return (
      <div
        className={joinClasses(
          "flex w-full items-center gap-3 rounded-xl border p-3",
          palette.container,
          className
        )}
      >
        <div
          className={joinClasses(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
            palette.badge
          )}
        >
          <Icon size={16} className={palette.icon} />
        </div>
        <div className="min-w-0">
          <div className="text-[9px] font-mono uppercase tracking-[0.28em] text-zinc-500">
            {label}
          </div>
          <div className={joinClasses("text-xs font-bold", palette.title)}>
            {title}
          </div>
          <div className={joinClasses("text-[10px] font-mono", palette.description)}>
            {description}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={joinClasses(
        "group relative flex min-h-[172px] flex-col justify-between overflow-hidden rounded-xl border p-5",
        palette.container,
        className
      )}
    >
      <div
        className={joinClasses(
          "absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-[50px]",
          palette.glow
        )}
      />

      <div className="relative z-10 flex items-center gap-2">
        <div
          className={joinClasses(
            "flex h-9 w-9 items-center justify-center rounded-lg border",
            palette.badge
          )}
        >
          <Icon size={16} className={palette.icon} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-400">
          {label}
        </span>
      </div>

      <div className="relative z-10 mt-6 space-y-1">
        <h3 className={joinClasses("text-sm font-bold", palette.title)}>{title}</h3>
        <p className={joinClasses("text-xs font-mono leading-relaxed", palette.description)}>
          {description}
        </p>
      </div>
    </div>
  );
}
