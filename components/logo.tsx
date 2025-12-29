export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`text-sm ${className}`}>
      <span className="text-green-500">~</span>
      <span className="text-white">/</span>
      <span className="text-white font-bold">celeroncoder</span>
    </div>
  );
};
