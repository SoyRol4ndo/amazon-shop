"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
export const SearchInput = ({ searchQuery, setSearchQuery }: Props) => {
  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full rounded-l-lg px-4 py-2 text-sm focus:outline-none border border-orange-400"
      />
      {searchQuery.trim() && (
        <Link
          onClick={() => setSearchQuery("")}
          href={"/"}
          className="absolute right-16 top-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 hover:text-orange-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
      )}
      <button
        type="submit"
        className="rounded-r-lg bg-orange-400 px-4 py-2 hover:bg-orange-500 transition-colors cursor-pointer"
        aria-label="Buscar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </>
  );
};
