export const paths = {
  login: () => "/login",
  home: () => "/dashboard",
  analytics: () => "/dashboard/analytics",
  users: (opts?: { saved?: boolean }) =>
    opts?.saved ? "/dashboard/users?saved=true" : "/dashboard/users",
  usersNew: () => "/dashboard/users/new",
  user: (id: string, opts?: { saved?: boolean }) =>
    opts?.saved
      ? `/dashboard/users/${id}?saved=true`
      : `/dashboard/users/${id}`,
  settings: (opts?: { saved?: boolean }) =>
    opts?.saved ? "/dashboard/settings?saved=true" : "/dashboard/settings",
};
