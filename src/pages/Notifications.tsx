import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <Bell className="h-6 w-6" />
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">New Podcast Available</h2>
          <p className="text-sm text-muted-foreground mt-1">
            "Introduction to Machine Learning" is now available
          </p>
          <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Study Group Reminder</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Mathematics group meeting in 30 minutes
          </p>
          <p className="text-xs text-muted-foreground mt-2">5 minutes ago</p>
        </div>
      </div>

      <Button variant="outline" className="w-full">
        Mark all as read
      </Button>
    </div>
  );
};

export default Notifications;