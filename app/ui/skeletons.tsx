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
      <div className="space-y-2">
        <div className="w-full h-2 bg-gray-700 rounded-full"></div>
        <div className="w-full h-2 bg-gray-700 rounded-full"></div>
        <div className="w-full h-2 bg-gray-700 rounded-full"></div>
      </div>
      <div className="pt-4 flex justify-between">
        <div className="w-36 h-8 bg-gray-700 rounded-full"></div>
        <div className="w-10 h-8 bg-gray-700 rounded-md"></div>
      </div>
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
      <PostSkeleton />
    </div>
  );
}

export function PostContentSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center gap-2">
        <AvatarSkeleton />
        <div className="bg-gray-700 w-16 h-6 rounded-md"></div>
      </div>
      <div className="m-auto h-8 w-44 bg-gray-700 rounded-md"></div>
      <div className="w-full h-2 bg-gray-700 rounded-full"></div>
      <div className="w-full h-2 bg-gray-700 rounded-full"></div>
      <div className="w-full h-2 bg-gray-700 rounded-full"></div>
    </div>
  );
}

export function NumberCommentsSkeleton() {
  return <div className="animate-pulse w-44 h-8 bg-gray-700 rounded-md"></div>;
}

export function CreateCommentSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="flex w-full gap-1">
        <div className="w-6 h-6 rounded-full bg-gray-700"></div>
        <div className="w-full space-y-2">
          <div className="bg-gray-700 h-24 w-full rounded-md"></div>
          <div className="bg-gray-700 w-24 h-10 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
