import { cn } from "@/lib/utils";

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
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
