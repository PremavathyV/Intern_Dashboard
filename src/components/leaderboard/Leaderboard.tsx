import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Trophy, Medal, Award, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  amount: number;
  referrals: number;
  badge?: string;
}

interface LeaderboardProps {
  onBack: () => void;
  currentUser: string;
}

export const Leaderboard = ({ onBack, currentUser }: LeaderboardProps) => {
  // Mock leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: "Sarah Johnson", amount: 3250, referrals: 15, badge: "Champion" },
    { rank: 2, name: "Michael Chen", amount: 2890, referrals: 12, badge: "Rising Star" },
    { rank: 3, name: "Emily Rodriguez", amount: 2750, referrals: 14, badge: "Top Performer" },
    { rank: 4, name: "David Kim", amount: 2340, referrals: 9 },
    { rank: 5, name: "Jessica Taylor", amount: 2100, referrals: 11 },
    { rank: 6, name: "Alex Thompson", amount: 1980, referrals: 7 },
    { rank: 7, name: "Maria Garcia", amount: 1850, referrals: 8 },
    { rank: 8, name: "James Wilson", amount: 1720, referrals: 6 },
    { rank: 9, name: "Lisa Anderson", amount: 1650, referrals: 9 },
    { rank: 10, name: "Ryan Martinez", amount: 1580, referrals: 5 },
    { rank: 11, name: "Anna Lewis", amount: 1420, referrals: 7 },
    { rank: 12, name: currentUser, amount: 1250, referrals: 8, badge: "You" },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="font-bold text-muted-foreground">#{rank}</span>;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getBadgeVariant = (badge?: string) => {
    if (badge === "You") return "default";
    if (badge === "Champion") return "default";
    return "secondary";
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Leaderboard
              </h1>
              <p className="text-muted-foreground mt-1">See how you rank among all interns</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top 3 Highlight */}
        <Card className="mb-8 shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {leaderboardData.slice(0, 3).map((entry) => (
                <div
                  key={entry.rank}
                  className={`text-center p-6 rounded-lg border-2 transition-all duration-300 ${
                    entry.rank === 1 
                      ? 'border-yellow-200 bg-yellow-50/50' 
                      : entry.rank === 2 
                      ? 'border-gray-200 bg-gray-50/50'
                      : 'border-amber-200 bg-amber-50/50'
                  }`}
                >
                  <div className="flex justify-center mb-3">
                    {getRankIcon(entry.rank)}
                  </div>
                  <Avatar className="h-16 w-16 mx-auto mb-3">
                    <AvatarFallback className="text-lg font-bold">
                      {getInitials(entry.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-2">{entry.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-1">
                    ${entry.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {entry.referrals} referrals
                  </p>
                  {entry.badge && (
                    <Badge variant={getBadgeVariant(entry.badge)} className="mt-2">
                      {entry.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Full Leaderboard */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Full Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboardData.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:shadow-card ${
                    entry.name === currentUser 
                      ? 'bg-primary/5 border-primary/20 shadow-sm' 
                      : 'bg-card hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 flex justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getInitials(entry.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{entry.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {entry.referrals} referrals
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      ${entry.amount.toLocaleString()}
                    </p>
                    {entry.badge && (
                      <Badge variant={getBadgeVariant(entry.badge)} className="mt-1">
                        {entry.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};