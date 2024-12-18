import * as motion from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowDroprightCircle } from "react-icons/io";

import type { Users } from "@/types/User";

import RingsCarousel from "../RingsCarousel";

interface UsersFoundProps {
  sortedUsers: Users;
  token: string | undefined;
}

export default function UsersFound({
  sortedUsers,
  token,
}: Readonly<UsersFoundProps>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-6 grid gap-6 bg-gradient-to-br from-gray-900 to-gray-800 p-2 sm:grid-cols-1 sm:p-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      datatype="users-list"
    >
      {sortedUsers.map((user) => (
        <motion.div
          key={user.id}
          datatype="user-list-id"
          data-user-id={user.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col overflow-hidden rounded-lg border border-yellow-600 bg-gray-800 p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <motion.h2
              className="font-serif text-2xl text-yellow-400"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {user.username.trim()
                ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
                : "User"}
            </motion.h2>

            <Link datatype="user-link-profile" href={`/users/${user.id}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer"
              >
                <IoMdArrowDroprightCircle className="text-4xl text-yellow-400 transition-colors duration-200 hover:text-yellow-500" />
              </motion.div>
            </Link>
          </div>

          <div className="max-h-[25rem] min-h-[24rem] space-y-4">
            {user.rings && user.rings.length > 0 ? (
              <RingsCarousel UserRings={user.rings} token={token} />
            ) : (
              <motion.div
                className="flex h-full flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-yellow-300">No rings available</p>
                <Image
                  className="mt-6 h-auto w-auto"
                  src="/ring.png"
                  alt="No ring"
                  width={150}
                  height={150}
                  priority
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
