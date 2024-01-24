"use client";
import { useFormState } from "react-dom";
import { UpdatableUserInfo } from "@/app/lib/definitions";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import { AVATARS } from "@/app/lib/definitions";
import SubmitButton from "@/app/ui/submitButton";
import { updateUserInfo } from "@/app/lib/actions";

export default function UpdateUserForm({ user }: { user: UpdatableUserInfo }) {
  const updateUserInfoWithId = updateUserInfo.bind(null, user.id);
  const [state, dispatch] = useFormState(updateUserInfoWithId, null);

  return (
    <form action={dispatch} className="space-y-4">
      <div className="container-input">
        <label htmlFor="avatarSelection">avatar</label>
        <div className="flex flex-wrap gap-4 md:max-w-md">
          {AVATARS.map((avatar) => (
            <div key={avatar} className="relative w-fit">
              <input
                type="radio"
                id={avatar}
                name="avatarSelection"
                value={avatar}
                className="peer hidden"
                defaultChecked={avatar === user.avatar}
              />
              <label
                className="bg-logo-500 inline-grid w-max place-content-center rounded-full cursor-pointer peer-checked:shadow-[inset_0px_0px_5px_1px_#03d743]"
                role="div"
                htmlFor={avatar}
              >
                <Image
                  src={`/avatars/${avatar}.png`}
                  alt="user profile avatar"
                  width={65}
                  className="rounded-full"
                  height={65}
                />
              </label>
              <FaCircleCheck className="hidden peer-checked:block text-logo-700 text-lg absolute -right-2 bottom-2 " />
            </div>
          ))}
          <p className="error-message">{state?.errors?.avatarSelection}</p>
        </div>
      </div>
      {/* username unique */}
      <div className="container-input">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" defaultValue={user.username} />
        <p className="error-message">{state?.errors?.username}</p>
      </div>
      {/* user name */}
      <div className="container-input">
        <label htmlFor="userFullName">Name</label>
        <input type="text" name="userFullName" defaultValue={user.name} />
        <p className="error-message">{state?.errors?.userFullName}</p>
      </div>
      {/* user bio */}
      <div className="container-input">
        <label htmlFor="userBio">Bio</label>
        <input name="userBio" defaultValue={user.bio} />
        <p className="error-message">{state?.errors?.userBio}</p>
      </div>
      <div>
        <p className="error-message">{state?.message}</p>
      </div>
      <div className="w-fit">
        <SubmitButton />
      </div>
    </form>
  );
}
