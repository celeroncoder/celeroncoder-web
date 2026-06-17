import { cn } from "@/lib/utils";

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => {
  const handleKeyDown = onClick
    ? (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          onClick();
        } else if (e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }
    : undefined;

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        "border-l-2 border-white pl-4 py-3",
        "hover:border-green-500 transition-colors duration-200",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};
