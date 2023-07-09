import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <header className="w-full h-28 bg-[#1BBFC5]">
        <nav className="flex justify-between pt-7 px-6 mx-auto max-w-7xl">
          <div className="flex items-center">
            <Image
              src="/yourphotos-logo-white.png"
              alt="YourPhotos Logo"
              width={180}
              height={40}
              layout="fixed"
            />
          </div>
          <div className="w-8 sm:w-12">
            <Image
              className="rounded-full"
              src="/placeholder-img.jpg"
              width={40}
              height={40}
            />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
