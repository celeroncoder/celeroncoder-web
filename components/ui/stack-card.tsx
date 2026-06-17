import { ArcadeMediaPlay } from "@/components/icons/arcade-icons";
import { Card } from "./card";

export type Stack = {
  title: string;
  description?: string;
};

export const StackCard: React.FC<Stack> = ({ title, description }) => {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <ArcadeMediaPlay className="text-green-500" size="0.875rem" />
        <div>
          <h4 className="text-white font-semibold text-sm">{title}</h4>
          {description && (
            <p className="text-neutral-500 text-xs">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
