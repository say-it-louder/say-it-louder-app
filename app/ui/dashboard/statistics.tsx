export default function Statistics() {
  return (
    <div className="flex w-fit bg-background-500 gap-8 p-4 rounded-md">
      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-2xl">608</span>
        <span className="font-light text-xs">Posts</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-2xl">1.3K</span>
        <span className="font-light text-xs">Followers</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="font-bold text-2xl">159</span>
        <span className="font-light text-xs">Following</span>
      </div>
    </div>
  );
}
