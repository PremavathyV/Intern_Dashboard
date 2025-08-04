import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "./StatsCard";
import { ReferralCard } from "./ReferralCard";
import { RewardsSection } from "./RewardsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Award, 
  LogOut, 
  BarChart3,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  userName: string;
  onLogout: () => void;
  onNavigateToLeaderboard: () => void;
}

export const Dashboard = ({ userName, onLogout, onNavigateToLeaderboard }: DashboardProps) => {
  const { toast } = useToast();
  
  // Mock data - in real app this would come from API
  const [dashboardData] = useState({
    totalRaised: 1250,
    referrals: 8,
    rank: 12,
    referralCode: `${userName.toLowerCase().replace(/\s+/g, '')}2025`,
    referralUrl: `https://internship-portal.com/ref/${userName.toLowerCase().replace(/\s+/g, '')}2025`
  });

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Internship Portal
              </h1>
              <p className="text-muted-foreground mt-1">Welcome back, {userName}!</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={onNavigateToLeaderboard}
                className="hidden sm:flex"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Leaderboard
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Raised"
            value={`$${dashboardData.totalRaised.toLocaleString()}`}
            icon={DollarSign}
            description="Your fundraising progress"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Referrals"
            value={dashboardData.referrals}
            icon={Users}
            description="People you've referred"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Rank"
            value={`#${dashboardData.rank}`}
            icon={Award}
            description="Your current position"
            trend={{ value: 2, isPositive: true }}
          />
          <StatsCard
            title="Goal Progress"
            value={`${Math.round((dashboardData.totalRaised / 2500) * 100)}%`}
            icon={Target}
            description="Towards $2,500 goal"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Referral Card */}
          <ReferralCard
            referralCode={dashboardData.referralCode}
            referralUrl={dashboardData.referralUrl}
          />

          {/* Quick Actions */}
          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="gradient" size="lg" className="w-full">
                <DollarSign className="h-4 w-4 mr-2" />
                Start Fundraising
              </Button>
              <Button variant="outline" size="lg" className="w-full" onClick={onNavigateToLeaderboard}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Leaderboard
              </Button>
              <Button variant="secondary" size="lg" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Share Referral
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Section */}
        <RewardsSection totalRaised={dashboardData.totalRaised} />
      </main>
    </div>
  );
};