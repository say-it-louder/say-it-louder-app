import Image from "next/image";

export default function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <form action="">
        <div>
          <label htmlFor="">avatar</label>
          <div>
            <input
              type="radio"
              id="avatar1"
              name="avatarSelection"
              value="avatar1"
              className=""
            />
            <label
              className="bg-logo-500 inline-grid w-max place-content-center rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 focus:bg-red-500"
              role="div"
              htmlFor="avatar1"
            >
              <Image
                src="/avatars/avatar1.png"
                alt="user profile avatar"
                width={65}
                className="rounded-full"
                height={65}
              />
            </label>
            <label className="bg-red-600 w-fit">
              <input type="radio" name="avatarSelection" value="avatar1" />
              <Image src="/avatars/avatar1.png" alt="" width={67} height={67} />
            </label>
            <label>
              <input type="radio" name="avatarSelection" value="avatar1" />
              <Image src="/avatars/avatar1.png" alt="" width={67} height={67} />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
