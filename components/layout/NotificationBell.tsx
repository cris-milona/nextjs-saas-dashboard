"use client";

import { useState } from "react";

import { Bell } from "lucide-react";

const mockNotifications = [
  {
    id: "1",
    title: "New user registered",
    body: "Alice Johnson joined the platform.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Revenue milestone reached",
    body: "Monthly revenue exceeded $50k.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "3",
    title: "User deactivated",
    body: "Frank Lee's account was set to inactive.",
    time: "3 hr ago",
    read: true,
  },
  {
    id: "4",
    title: "Weekly report ready",
    body: "Your summary report for last week is available.",
    time: "Yesterday",
    read: true,
  },
];

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
        )}
      </button>

      {open && (
        <>
          {/* Invisible backdrop — closes the dropdown when clicking outside */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-900">
                Notifications
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <li key={n.id} className={!n.read ? "bg-indigo-50/50" : ""}>
                  <button
                    type="button"
                    onClick={() => markRead(n.id)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                          n.read ? "bg-transparent" : "bg-indigo-500"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {n.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            {notifications.every((n) => n.read) && (
              <p className="px-4 py-6 text-sm text-center text-gray-400">
                You&apos;re all caught up!
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

