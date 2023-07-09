import Link from "next/link";

const Section = () => {
  return (
    <div>
      <section className="flex flex-col justify-center text-center pt-10 px-6 mx-auto max-w-7xl">
        <h1 className="text-[#1BBFC5] font-bold text-5xl">
          Welcome to YourPhotos!
        </h1>
        <Link className="font-medium hover:text-2xl" href="/users/1">
          View User 1's Portfolio
        </Link>
      </section>
    </div>
  );
};

export default Section;
