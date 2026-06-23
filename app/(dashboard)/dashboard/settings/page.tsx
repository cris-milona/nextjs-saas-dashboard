import { SettingsForm } from "./SettingsForm";

const SettingsPage = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences.</p>
      </div>

      <SettingsForm />
    </div>
  );
};

export default SettingsPage;
