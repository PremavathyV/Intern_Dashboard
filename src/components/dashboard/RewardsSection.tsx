import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Gift, Target } from "lucide-react";

interface Reward {
  id: string;
  title: string;
  description: string;
  requirement: number;
  current: number;
  unlocked: boolean;
  icon: string;
}

interface RewardsSectionProps {
  totalRaised: number;
}

export const RewardsSection = ({ totalRaised }: RewardsSectionProps) => {
  const rewards: Reward[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Raise your first $100",
      requirement: 100,
      current: totalRaised,
      unlocked: totalRaised >= 100,
      icon: "🎯"
    },
    {
      id: "2", 
      title: "Rising Star",
      description: "Reach $500 in donations",
      requirement: 500,
      current: totalRaised,
      unlocked: totalRaised >= 500,
      icon: "⭐"
    },
    {
      id: "3",
      title: "Champion",
      description: "Achieve $1,000 milestone",
      requirement: 1000,
      current: totalRaised,
      unlocked: totalRaised >= 1000,
      icon: "🏆"
    },
    {
      id: "4",
      title: "Legend",
      description: "Reach the ultimate $2,500 goal",
      requirement: 2500,
      current: totalRaised,
      unlocked: totalRaised >= 2500,
      icon: "👑"
    }
  ];

  const getRewardIcon = (iconType: string) => {
    switch (iconType) {
      case "🎯": return <Target className="h-5 w-5" />;
      case "⭐": return <Star className="h-5 w-5" />;
      case "🏆": return <Trophy className="h-5 w-5" />;
      default: return <Gift className="h-5 w-5" />;
    }
  };

  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Rewards & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rewards.map((reward) => {
          const progress = Math.min((reward.current / reward.requirement) * 100, 100);
          
          return (
            <div 
              key={reward.id} 
              className={`p-4 rounded-lg border transition-all duration-300 ${
                reward.unlocked 
                  ? 'bg-success/5 border-success/20 shadow-sm' 
                  : 'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${reward.unlocked ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                    {reward.icon}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${reward.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {reward.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                  </div>
                </div>
                <Badge variant={reward.unlocked ? "default" : "secondary"}>
                  {reward.unlocked ? "Unlocked" : "Locked"}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${reward.current} / ${reward.requirement}
                  </span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress 
                  value={progress} 
                  className={`h-2 ${reward.unlocked ? 'bg-success/20' : ''}`}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};