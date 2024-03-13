import Image from "next/image";

import logo from "@/../public/assets/logo.png";
import Footer from "@/components/footer";

const LandingPageLoader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center flex flex-col items-center">
        <Image
          className="object-contain"
          src={logo}
          alt="logo"
          width={100}
          height={100}
        />
        <p className="text-muted-foreground mt-1">Learn, test and share</p>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPageLoader;
