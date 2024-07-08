import PersonalDetails from "./_components/PersonalDetails";
import ContactInfo from "./_components/ContactInfo";
import ChangePassword from "./_components/ChangePassword";
import { auth } from "@/auth";
import { getUserById } from "@/queries/users";

async function Profile() {
  const session = await auth();

  // Check if user is authenticated
  if (!session.user) {
    return <div>Please log in to access your profile.</div>;
  }

  const user = await getUserById(session?.user?.id);
  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <>
      <PersonalDetails userInfo={user} />
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <ContactInfo />
          <ChangePassword />
        </div>
      </div>
    </>
  );
}

export default Profile;
