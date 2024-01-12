import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = () => {
  return (
    <Link href="/">
      <div
        className="
          lg:dlex
          hidden
          items-center
          gap-x-4
          transition
          hover:opacity-75
        "
      >
        <div className="rounded-full bg-white p-1">
          <Image src="spooky.svg" alt="logo" height={32} width={32} />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
