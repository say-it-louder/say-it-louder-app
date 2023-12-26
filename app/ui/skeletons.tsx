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
