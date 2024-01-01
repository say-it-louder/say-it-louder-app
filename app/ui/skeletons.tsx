export function NavBarSkeleton() {
  return (
    <div className="w-full flex justify-end items-center gap-3 animate-pulse lg:gap-6">
      <div className="md:w-24 md:h-9 bg-gray-700 md:rounded-md w-9 h-9 rounded-full"></div>
      <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
      <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
    </div>
  );
}

export function AvatarSkeleton() {
  return <div className="w-9 h-9 bg-gray-700 rounded-full animate-pulse"></div>;
}

export function PostSkeleton() {
  return (
    <div className="p-2 space-y-2">
      <div className="flex gap-2 w-fit">
        <AvatarSkeleton />
        <div className="bg-gray-700 w-16 h-6 rounded-md"></div>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full"></div>
      <div className="w-full h-2 bg-gray-700 rounded-full"></div>
      <div className="w-full h-2 bg-gray-700 rounded-full"></div>
    </div>
  );
}

export function PostListSkeleton() {
  return (
    <div className="animate-pulse w-ful flex flex-col gap-2">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
}
