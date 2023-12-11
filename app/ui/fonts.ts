import { Poppins, Khand, Audiowide } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const khand = Khand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
});
