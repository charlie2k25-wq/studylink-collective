import { motion } from "framer-motion";
import { User, Bell, Shield, Moon } from "lucide-react";

const Settings = () => {
  const settingsSections = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your account details and preferences",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Control your notification settings",
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "Manage your privacy settings",
    },
    {
      icon: Moon,
      title: "Appearance",
      description: "Customize your app experience",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Settings
      </motion.h1>

      <div className="grid gap-6">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-lg p-6 flex items-center space-x-6 card-hover cursor-pointer"
          >
            <section.icon size={24} className="text-primary" />
            <div>
              <h3 className="font-semibold">{section.title}</h3>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Settings;