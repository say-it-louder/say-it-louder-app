import { getUpdatableUserInfo } from "@/app/lib/data";
import DeleteAccount from "@/app/ui/auth/deleteAccount";
import UpdateUserForm from "@/app/ui/dashboard/updateUserForm";
import { getServerSession } from "next-auth";

export default async function Settings() {
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email;
  const userInfo = await getUpdatableUserInfo(currentUserEmail as string);

  return (
    <div className="px-2 py-4 flex flex-col gap-4">
      <h1 className="font-bold text-2xl capitalize">settings</h1>
      <UpdateUserForm user={userInfo} />
      <DeleteAccount userId={userInfo.id} />
    </div>
  );
}
