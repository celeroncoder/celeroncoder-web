import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { Card } from "./card";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export type Stack = {
  title: string;
  imgUrl: string;
};

export const StackCard: React.FC<Stack> = ({ imgUrl, title }) => {
  return (
    <Card className="md:w-36 lg:w-36 sm:w-36 w-36 items-center">
      <Image
        className="rounded-lg"
        src={imgUrl}
        height={50}
        width={50}
        alt={title}
      />
      <h1
        style={space_grotesk.style}
        className="text-xl tracking-tighter font-semibold"
      >
        {title}
      </h1>
    </Card>
  );
};
