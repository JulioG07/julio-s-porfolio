"use client";

import { cn } from "@/lib/utils";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  tech?: string[];
  onHover?: () => void;
  onLeave?: () => void;
}

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-primary",
  titleClassName = "text-primary",
  tech = [],
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-44 w-[22rem] select-none flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-500",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className={cn("rounded-lg border border-border bg-muted/60 p-1.5", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-sm font-semibold", titleClassName)}>{title}</p>
      </div>

      <div className="!block">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
      </div>

      <div className="!flex-wrap !gap-1.5 mt-auto pt-1">
        {tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/8 text-primary border border-primary/20"
          >
            {t}
          </span>
        ))}
        <span className="text-[10px] text-muted-foreground ml-auto">{date}</span>
      </div>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
