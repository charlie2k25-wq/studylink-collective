import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const StudyGroups = () => {
  const handleJoin = () => {
    toast.info("Coming soon! Study groups feature is under development.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Study Groups</h1>
        <Users className="h-6 w-6" />
      </div>

      <div className="grid gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Mathematics Group</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Advanced calculus study sessions
          </p>
          <Button onClick={handleJoin} className="mt-4">
            Join Group
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Physics Group</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Quantum mechanics discussion
          </p>
          <Button onClick={handleJoin} variant="outline" className="mt-4">
            Join Group
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;