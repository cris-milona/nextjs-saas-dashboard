"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Search } from "lucide-react";

interface UserSearchInputProps {
  defaultValue?: string;
  suggestions?: string[];
}

export const UserSearchInput = ({
  defaultValue,
  suggestions = [],
}: UserSearchInputProps) => {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);

  const matches = value
    ? suggestions.filter((name) =>
        name
          .toLowerCase()
          .split(" ")
          .some((part) => part.startsWith(value.toLowerCase()))
      )
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setValue(next);
    setOpen(true);
    if (next === "") {
      router.push("/dashboard/users");
    }
  };

  const handleSelect = (name: string) => {
    setValue(name);
    setOpen(false);
    router.push(`/dashboard/users?search=${encodeURIComponent(name)}`);
  };

  return (
    <>
      {open && matches.length > 0 && (
        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      )}
      <form
        method="get"
        className="relative w-80 z-20"
        onSubmit={() => setOpen(false)}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          name="search"
          value={value}
          placeholder="Search by name or email..."
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          className="w-full pl-9 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        {open && matches.length > 0 && (
          <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {matches.slice(0, 6).map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => handleSelect(name)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
};
