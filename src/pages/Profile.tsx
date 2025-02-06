import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Medal, Star, BookOpen, MessageSquare, ThumbsUp } from "lucide-react";

const Profile = () => {
  // Mock user data - in a real app, this would come from your backend
  const user = {
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Passionate learner and contributor",
    joinDate: "March 2024",
    badges: [
      { id: 1, name: "Top Contributor", icon: Trophy },
      { id: 2, name: "Knowledge Seeker", icon: Award },
      { id: 3, name: "Helpful Mentor", icon: Medal },
    ],
    stats: {
      points: 1250,
      contributions: 45,
      likes: 156,
      comments: 89,
    },
    achievements: [
      { id: 1, name: "Read 50 Books", icon: BookOpen },
      { id: 2, name: "100 Helpful Comments", icon: MessageSquare },
      { id: 3, name: "500 Likes Received", icon: ThumbsUp },
    ]
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.bio}</p>
            <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{user.stats.points}</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{user.stats.contributions}</div>
                <div className="text-sm text-muted-foreground">Contributions</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <ThumbsUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{user.stats.likes}</div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{user.stats.comments}</div>
                <div className="text-sm text-muted-foreground">Comments</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              {user.badges.map((badge) => (
                <div key={badge.id} className="text-center">
                  <Badge className="p-3">
                    <badge.icon className="h-6 w-6 mb-1" />
                  </Badge>
                  <div className="text-sm mt-2">{badge.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-4 rounded-lg border"
                >
                  <achievement.icon className="h-8 w-8 text-primary" />
                  <div className="text-sm font-medium">{achievement.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;