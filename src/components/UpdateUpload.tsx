import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Image, Video, File, List, Globe } from "lucide-react";

const UpdateUpload = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would handle the actual upload
    toast({
      title: "Update Posted",
      description: "Your update has been shared successfully!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          placeholder="Write your update..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px]"
        />
      </div>
      <div className="flex gap-4 justify-center">
        <Button variant="outline" size="icon">
          <Image className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="icon">
          <Video className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="icon">
          <File className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <List className="h-4 w-4" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-background border rounded p-1"
        >
          <option value="">Select Category</option>
          <option value="announcements">Announcements</option>
          <option value="general">General</option>
          <option value="academic">Academic</option>
          <option value="events">Events</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4" />
        <select
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          className="bg-background border rounded p-1"
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>
      <Button type="submit" className="w-full">
        Post Update
      </Button>
    </form>
  );
};

export default UpdateUpload;