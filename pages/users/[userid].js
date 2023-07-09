import { useEffect, useState } from "react";
import Image from "next/image";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Header from "../../components/Header";

const UserPage = ({ userData, photosData }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    console.log("Follow state changed:", isFollowing);
  }, [isFollowing]);

  const handleFollowClick = () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center pt-8">
          {userData && (
            <div className="text-center pb-4 sm:pb-7">
              <h1 className="text-3xl sm:text-5xl font-semibold">
                {userData.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#1BBFC5]">
                Website: <Link href={userData.website}>{userData.website}</Link>
              </p>
            </div>
          )}

          <div className="w-32 h-32 sm:w-48 sm:h-48 relative rounded-full overflow-hidden">
            <Image
              src="/placeholder-img.jpg"
              alt={`Avatar of ${userData.name}`}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="pt-5">
            <button
              className="w-full sm:w-auto py-3 px-6 rounded-full text-black bg-slate-100 hover:bg-[#1BBFC5] hover:text-white"
              onClick={handleFollowClick}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>

          {photosData && (
            <div className="mt-10">
              <h2 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-5">
                Photos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photosData.map((photo) => (
                  <div key={photo.id} className="rounded-md overflow-hidden">
                    <Image
                      src={photo.thumbnailUrl}
                      alt={`Photo ${photo.id}`}
                      width={200}
                      height={200}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  // Fetch the user IDs from the API or a data source
  const userIds = ["1", "2", "3"]; // Example: Hardcoded user IDs

  // Map the user IDs to an array of objects representing the paths
  const paths = userIds.map((userId) => ({
    params: { userid: userId },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { userid } = params;

  const [userDataResponse, photosResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userid}`),
    fetch("https://jsonplaceholder.typicode.com/albums/1/photos"),
  ]);

  const userData = await userDataResponse.json();
  const photosData = await photosResponse.json();

  return {
    props: {
      userData,
      photosData,
    },
  };
}

export default UserPage;
