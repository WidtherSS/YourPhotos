import Link from "next/link";
import Image from "next/image";

const Section = () => {
  return (
    <div>
      <section className="flex flex-col justify-center text-center pt-10 px-6 mx-auto max-w-7xl">
        <h1 className="text-[#1BBFC5] font-bold text-5xl">
          Welcome to YourPhotos!
        </h1>
        <Link className="flex justify-center items-center gap-4 pt-12  font-medium hover:text-xl" href="/users/1">
          <div className="w-8 sm:w-12">
            <Image
              className="rounded-full"
              src="/placeholder-img.jpg"
              width={50}
              height={50}
              alt="profile picture"
            />
          </div>
          <h3 className="font-bold text-lg">View User 1's Portfolio</h3>
        </Link>
      </section>
    </div>
  );
};

export default Section;
