import { useState } from "react";
import { Download, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DownloadableContent {
  id: string;
  title: string;
  type: "podcast" | "book";
  size: string;
  downloadUrl: string;
  isDownloaded: boolean;
}

const Downloads = () => {
  const { toast } = useToast();
  const [downloadedContent, setDownloadedContent] = useState<DownloadableContent[]>([
    {
      id: "1",
      title: "The Future of Education",
      type: "podcast",
      size: "45MB",
      downloadUrl: "/podcasts/future-education.mp3",
      isDownloaded: false,
    },
    {
      id: "2",
      title: "Learning Techniques",
      type: "book",
      size: "2.3MB",
      downloadUrl: "/books/learning-techniques.pdf",
      isDownloaded: false,
    },
  ]);

  const handleDownload = (content: DownloadableContent) => {
    // In a real app, this would handle the actual download
    // For now, we'll just show a toast and update the UI
    toast({
      title: "Download Started",
      description: `Downloading ${content.title}...`,
    });

    setDownloadedContent(prev =>
      prev.map(item =>
        item.id === content.id ? { ...item, isDownloaded: true } : item
      )
    );
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">Downloads</h2>
      <div className="grid gap-4">
        {downloadedContent.map((content) => (
          <div
            key={content.id}
            className="flex items-center justify-between p-4 bg-card rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              {content.type === "podcast" ? (
                content.isDownloaded ? <Pause size={24} /> : <Play size={24} />
              ) : (
                <Download size={24} />
              )}
              <div>
                <h3 className="font-semibold">{content.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {content.type} • {content.size}
                </p>
              </div>
            </div>
            <Button
              variant={content.isDownloaded ? "secondary" : "default"}
              onClick={() => handleDownload(content)}
              disabled={content.isDownloaded}
            >
              {content.isDownloaded ? "Downloaded" : "Download"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Downloads;