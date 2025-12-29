import { cn } from "@/lib/utils";

export const Separator: React.FC<{
  className?: string;
  orientation?: "horizontal" | "vertical";
}> = ({ className, orientation = "horizontal" }) => {
  return (
    <div
      className={cn(
        "shrink-0 bg-white",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
    />
  );
};
