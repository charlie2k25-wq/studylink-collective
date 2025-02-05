import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Image, Palette, Globe, Sticker } from "lucide-react";

const StoryUpload = () => {
  const [text, setText] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [background, setBackground] = useState("none");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Story Posted",
      description: "Your story has been shared successfully!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4 justify-center">
        <Button variant="outline" size="icon">
          <Camera className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="icon">
          <Image className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="icon">
          <Palette className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="icon">
          <Sticker className="h-6 w-6" />
        </Button>
      </div>
      <div>
        <Textarea
          placeholder="Write your story..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px]"
          maxLength={2000}
        />
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
        Post Story
      </Button>
    </form>
  );
};

export default StoryUpload;