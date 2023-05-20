import { cn } from "@/lib/utils";

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <div
      className={cn(
        className,
        "bg-white border-2 border-white/20 bg-opacity-5 backdrop-blur-xs sm:backdrop-blur-sm lg:backdrop-blur-xl md:backdrop-blur-lg drop-shadow-lg rounded-lg hover:shadow-lg shadow-md max-w-xs lg:w-64 md:w-64 sm:w-full w-full py-2 px-4 flex flex-col gap-y-2"
      )}
    >
      {children}
    </div>
  );
};
