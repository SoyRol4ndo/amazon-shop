import { GiftIcon } from "../icons/GiftIcon";

interface BannerProps {
  title: string;
  subtitle: string;
  hasIcon?: boolean;
}

export const Banner = ({ title, subtitle, hasIcon }: BannerProps) => {
  return (
    <div className="mb-8 rounded-2xl bg-linear-to-r from-gray-900 to-gray-700 px-8 py-12 text-white">
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-gray-300">{subtitle}</p>
        </div>
        {hasIcon && (
          <div className="mr-8">
            <GiftIcon />
          </div>
        )}
      </div>
    </div>
  );
};
