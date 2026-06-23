"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

export const SavedBanner = ({
  show,
  message = "Saved successfully.",
}: {
  show: boolean;
  message?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      setVisible(false);
      router.replace(pathname, { scroll: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [show, router, pathname]);

  if (!visible) return null;

  return (
    <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
      {message}
    </div>
  );
};
