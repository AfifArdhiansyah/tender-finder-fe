import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce the search input to avoid frequent re-renders
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 100); // 100ms debounce time
    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <div className={"flex items-center "+ className} >
        <CiSearch className="z-10 ml-4" />
        <input
            type="text"
            className="pl-10 pr-3 py-2 border rounded-md text-sm w-full relative left-[-30px]"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    </div>
  );
}
