import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import StoryUpload from "@/components/StoryUpload";
import UpdateUpload from "@/components/UpdateUpload";
import PodcastUpload from "@/components/PodcastUpload";

interface UploadDialogsProps {
  activeDialog: string | null;
  onClose: () => void;
}

const UploadDialogs = ({ activeDialog, onClose }: UploadDialogsProps) => {
  return (
    <>
      <Dialog open={activeDialog === "story"} onOpenChange={onClose}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Create Story</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <StoryUpload />
          </div>
        </div>
      </Dialog>

      <Dialog open={activeDialog === "update"} onOpenChange={onClose}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Create Update</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <UpdateUpload />
          </div>
        </div>
      </Dialog>

      <Dialog open={activeDialog === "podcast"} onOpenChange={onClose}>
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Upload Podcast</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <PodcastUpload />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UploadDialogs;