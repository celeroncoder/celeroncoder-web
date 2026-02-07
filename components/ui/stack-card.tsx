import { Play } from "lucide-react";
import { Card } from "./card";

export type Stack = {
  title: string;
  description?: string;
};

export const StackCard: React.FC<Stack> = ({ title, description }) => {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Play className="w-3.5 h-3.5 text-green-500 fill-green-500" />
        <div>
          <h4 className="text-white font-bold text-sm">{title}</h4>
          {description && (
            <p className="text-neutral-500 text-xs">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
