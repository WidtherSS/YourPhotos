import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Typical from "react-typical";
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

  const userVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  };

  const photoVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const thumbnailVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center pt-8">
          {userData && (
            <motion.div
              className="text-center pb-4 sm:pb-7"
              initial="hidden"
              animate="visible"
              variants={userVariants}
            >
              <h1 className="text-3xl sm:text-5xl font-semibold">
                <Typical
                  steps={[userData.name, 1000, "Welcome!", 2000]}
                  loop={Infinity}
                  wrapper="span"
                />
              </h1>
              <p className="text-xs sm:text-sm text-[#1BBFC5]">
                Website: <Link href={userData.website}>{userData.website}</Link>
              </p>
            </motion.div>
          )}

          <motion.div
            className="w-32 h-32 sm:w-48 sm:h-48 relative rounded-full overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={userVariants}
          >
            <Image
              src="/placeholder-img.jpg"
              alt={`Avatar of ${userData.name}`}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>

          <motion.div
            className="pt-5"
            initial="hidden"
            animate="visible"
            variants={userVariants}
          >
            <motion.button
              className="w-full sm:w-auto py-3 px-6 rounded-full text-black bg-slate-100 hover:bg-[#1BBFC5] hover:text-white"
              onClick={handleFollowClick}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="hover"
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </motion.button>
          </motion.div>

          {photosData && (
            <motion.div
              className="mt-10"
              initial="hidden"
              animate="visible"
              variants={photoVariants}
            >
              <h2 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-5">
                Photos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photosData.map((photo) => (
                  <motion.div
                    key={photo.id}
                    className="rounded-md overflow-hidden"
                    variants={thumbnailVariants}
                  >
                    <motion.div variants={photoVariants}>
                      <Image
                        src={photo.thumbnailUrl}
                        alt={`Photo ${photo.id}`}
                        width={200}
                        height={200}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
