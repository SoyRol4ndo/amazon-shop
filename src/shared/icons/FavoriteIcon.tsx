interface FavoriteProps {
  isSelected: boolean;
}

export const FavoriteIcon = ({ isSelected }: FavoriteProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      fill={isSelected ? "currentColor" : "none"}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        className={isSelected ? "text-red-500" : "text-gray-400"}
      />
    </svg>
  );
};
