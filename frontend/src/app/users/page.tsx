import NoUsersFound from "@/components/users/NoUsersFound";
import UsersFound from "@/components/users/UsersFound";
import fetchServer from "@/lib/fetchServer";
import getSessionServer from "@/lib/getSessionServer";
import type { Users } from "@/types/User";

export default async function UsersProfilePage() {
  const response = await fetchServer.get<Users>("/user");

  const { token, userId } = await getSessionServer();

  // Filter out the current user
  const filteredUsers = response.data.filter((user) => user.id !== userId);

  // Sort users by whether they have rings or not
  const sortedUsers = filteredUsers.toSorted((a, b) => {
    if (a.rings && a.rings.length > 0) return -1;
    if (b.rings && b.rings.length > 0) return 1;
    return 0;
  });

  const tripleListTemp = [...sortedUsers, ...sortedUsers, ...sortedUsers];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      {tripleListTemp && tripleListTemp.length > 0 ? (
        <UsersFound sortedUsers={tripleListTemp} token={token} />
      ) : (
        <NoUsersFound />
      )}
    </div>
  );
}
