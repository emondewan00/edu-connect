import Image from "next/image";
import Menu from "./account-menu";
import { getUserById } from "@/queries/users";
import { auth } from "@/auth";

const AccountSidebar = async () => {
  const session = await auth();
  const user = await getUserById(session.user.id);
  const fullName = user?.first_name + " " + user?.last_name;
  return (
    <div className="lg:w-1/4 md:px-3">
      <div className="relative">
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
          <div className="profile-pic text-center mb-5">
            <input
              id="pro-img"
              name="profile-image"
              type="file"
              className="hidden"
              onchange="loadFile(event)"
            />
            <div>
              <div className="relative size-28 mx-auto">
                <Image
                  src="/assets/images/profile.jpg"
                  className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                  id="profile-banner"
                  alt="profile-image"
                  width={112}
                  height={112}
                />
                <label
                  className="absolute inset-0 cursor-pointer"
                  htmlFor="pro-img"
                />
              </div>
              <div className="mt-4">
                <h5 className="text-lg font-semibold">{fullName}</h5>
                <p className="text-slate-400">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700">
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
