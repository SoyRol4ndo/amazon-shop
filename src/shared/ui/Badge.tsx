export const Badge = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -right-1 min-w-4 h-4 px-0.5 rounded-full bg-orange-400 text-white text-[10px] font-bold flex items-center justify-center leading-none">
      {count > 99 ? "99+" : count}
    </span>
  );
};
