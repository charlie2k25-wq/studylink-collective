
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, Medal, Star, BookOpen, MessageSquare, ThumbsUp, Users, Link as LinkIcon, ExternalLink } from "lucide-react";

const Profile = () => {
  // Mock user data - in a real app, this would come from your backend
  const user = {
    name: "Sajon Islam",
    handle: "@sajon.co",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Inspiring Designers Globally",
    website: "instagram.com/sajon.co",
    stats: {
      following: 204,
      followers: "2.5M",
      points: 1250,
      contributions: 45,
      likes: 156,
      comments: 89,
    },
    badges: [
      { id: 1, name: "Top Contributor", icon: Trophy },
      { id: 2, name: "Knowledge Seeker", icon: Award },
      { id: 3, name: "Helpful Mentor", icon: Medal },
    ],
    achievements: [
      { id: 1, name: "Read 50 Books", icon: BookOpen, count: 50 },
      { id: 2, name: "100 Helpful Comments", icon: MessageSquare, count: 100 },
      { id: 3, name: "500 Likes Received", icon: ThumbsUp, count: 500 },
    ],
    content: {
      posts: Array(6).fill({
        id: Math.random(),
        image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606",
        title: "A Trip To The Mountains",
        hashtags: ["mountains", "weekend", "travel"],
        views: "306k",
        likes: "125k",
      }),
      podcasts: Array(6).fill({
        id: Math.random(),
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
        title: "Happiness Is A Way Of",
        hashtags: ["mindfulness", "happiness", "life"],
        plays: "125k",
        duration: "32:15",
      }),
    },
  };

  return (
    <div className="pb-20 lg:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Profile Header */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h1 className="text-2xl font-bold truncate">{user.name}</h1>
                  <p className="text-muted-foreground">{user.handle}</p>
                </div>
                <Button size="sm" variant="outline" className="shrink-0">
                  Follow
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <strong>{user.stats.following}</strong> Following
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <strong>{user.stats.followers}</strong> Followers
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">{user.bio}</p>
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <LinkIcon className="h-4 w-4" />
              {user.website}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-xl font-bold">{user.stats.points}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </Card>
            <Card className="p-4 text-center">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-xl font-bold">{user.stats.contributions}</div>
              <div className="text-sm text-muted-foreground">Contributions</div>
            </Card>
            <Card className="p-4 text-center">
              <ThumbsUp className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-xl font-bold">{user.stats.likes}</div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </Card>
            <Card className="p-4 text-center">
              <MessageSquare className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-xl font-bold">{user.stats.comments}</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </Card>
          </div>

          {/* Badges */}
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Badges</h2>
            <div className="flex gap-4 flex-wrap">
              {user.badges.map((badge) => (
                <div key={badge.id} className="text-center">
                  <Badge className="p-3">
                    <badge.icon className="h-6 w-6" />
                  </Badge>
                  <div className="text-sm mt-2">{badge.name}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-4 rounded-lg border"
                >
                  <achievement.icon className="h-8 w-8 text-primary shrink-0" />
                  <div>
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.count} completed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="posts">
              Posts <span className="ml-1 text-muted-foreground">60</span>
            </TabsTrigger>
            <TabsTrigger value="podcasts">
              Podcasts <span className="ml-1 text-muted-foreground">80</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {user.content.posts.map((post, index) => (
                <div key={post.id + index} className="space-y-2">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium truncate">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {post.hashtags.map(tag => `#${tag}`).join(" ")}
                    </p>
                    <div className="text-sm text-muted-foreground mt-1">
                      {post.views} views
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="podcasts" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {user.content.podcasts.map((podcast, index) => (
                <div key={podcast.id + index} className="space-y-2">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={podcast.image}
                      alt={podcast.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium truncate">{podcast.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {podcast.hashtags.map(tag => `#${tag}`).join(" ")}
                    </p>
                    <div className="text-sm text-muted-foreground mt-1">
                      {podcast.plays} plays • {podcast.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Profile;
