import Image from "next/image";
import Link from "next/link";

import { auth } from "@/lib/auth";

import { NotificationBell } from "./NotificationBell";

export const Topbar = async () => {
  const session = await auth();
  const user = session?.user;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 fixed top-0 right-0 left-64 z-30">
      <div className="flex items-center gap-4">
        <NotificationBell />

        {/* Avatar — links to profile settings */}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User"}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
              {initials}
            </div>
          )}
          <span className="text-sm font-medium text-gray-700">
            {user?.name ?? "Account"}
          </span>
        </Link>
      </div>
    </header>
  );
};

