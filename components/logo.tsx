import { Libre_Barcode_39 } from "next/font/google";

const barcode = Libre_Barcode_39({ subsets: ["latin"], weight: ["400"] });

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section style={barcode.style} className={className}>
      celeroncoder
    </section>
  );
};
