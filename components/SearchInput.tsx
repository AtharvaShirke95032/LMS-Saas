"use client";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, router, searchParams, pathname]);
  return (
    <div className="relative border border-white rounded-lg items-center flex gap-2 px-2 sm:px-3 py-1.5 sm:py-2 h-fit w-full sm:w-auto min-w-[200px]">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} className="flex-shrink-0" />
      <input
        placeholder="Search companions..."
        className="outline-none text-white bg-transparent text-sm sm:text-base w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
