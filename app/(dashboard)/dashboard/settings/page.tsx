import { updateSettings } from "./actions";

const SettingsPage = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences.</p>
      </div>

      <form
        action={updateSettings}
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-6"
      >
        <h2 className="text-sm font-semibold text-gray-900">Profile</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              name="displayName"
              type="text"
              defaultValue="Christina"
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              defaultValue="xr.milona@gmail.com"
              className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Notifications
          </h2>
          <div className="space-y-3">
            {[
              {
                name: "emailNotifications",
                label: "Email notifications",
                defaultChecked: true,
              },
              {
                name: "weeklyReport",
                label: "Weekly summary report",
                defaultChecked: true,
              },
              {
                name: "alertsOnly",
                label: "Critical alerts only",
                defaultChecked: false,
              },
            ].map(({ name, label, defaultChecked }) => (
              <label
                key={name}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={name}
                  defaultChecked={defaultChecked}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
