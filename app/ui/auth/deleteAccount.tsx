"use client";

export default function DeleteAccount({ userId }: { userId: string }) {
  function handleDeleteAccount() {
    console.log(`user to delete: ${userId}`);
  }
  return (
    <button
      className="font-light text-sm hover:brightness-75 capitalize mt-20 w-fit"
      onClick={handleDeleteAccount}
    >
      delete account
    </button>
  );
}
