import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, MessageSquare, ArrowUp, Flame, Clock, TrendingUp } from "lucide-react";
import FloatingActionButton from "@/components/home/FloatingActionButton";
import UploadDialogs from "@/components/home/UploadDialogs";

const Forum = () => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  const mockPosts = [
    {
      id: 1,
      type: "question",
      title: "What's the best way to study for finals?",
      author: "Student123",
      likes: 15,
      comments: 5,
      votes: 20,
    },
    {
      id: 2,
      type: "poll",
      title: "Which study method do you prefer?",
      author: "TeacherPro",
      likes: 25,
      comments: 8,
      votes: 45,
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Forum</h1>
        <Tabs defaultValue="trending" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trending">
              <Flame className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Clock className="w-4 h-4 mr-2" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="top">
              <TrendingUp className="w-4 h-4 mr-2" />
              Top
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {mockPosts.map((post) => (
          <div key={post.id} className="glass p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{post.title}</h3>
              <span className="text-sm text-muted-foreground">{post.author}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="w-4 h-4 mr-2" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <ArrowUp className="w-4 h-4 mr-2" />
                {post.votes}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <FloatingActionButton
        isScrollingDown={isScrollingDown}
        isFabOpen={isFabOpen}
        setIsFabOpen={setIsFabOpen}
        onItemClick={setActiveDialog}
      />

      <UploadDialogs
        activeDialog={activeDialog}
        onClose={() => setActiveDialog(null)}
      />
    </div>
  );
};

export default Forum;