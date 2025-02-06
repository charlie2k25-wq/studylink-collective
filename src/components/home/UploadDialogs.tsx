import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import StoryUpload from "@/components/StoryUpload";
import UpdateUpload from "@/components/UpdateUpload";
import PodcastUpload from "@/components/PodcastUpload";
import PollUpload from "@/components/PollUpload";

interface UploadDialogsProps {
  activeDialog: string | null;
  onClose: () => void;
}

const UploadDialogs = ({ activeDialog, onClose }: UploadDialogsProps) => {
  if (!activeDialog) return null;

  const getDialogContent = () => {
    switch (activeDialog) {
      case "story":
        return {
          title: "Create Story",
          component: <StoryUpload />
        };
      case "update":
        return {
          title: "Create Update",
          component: <UpdateUpload />
        };
      case "podcast":
        return {
          title: "Upload Podcast",
          component: <PodcastUpload />
        };
      case "poll":
        return {
          title: "Create Poll",
          component: <PollUpload />
        };
      default:
        return null;
    }
  };

  const dialogContent = getDialogContent();
  if (!dialogContent) return null;

  return (
    <Dialog open={!!activeDialog} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{dialogContent.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        {dialogContent.component}
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialogs;