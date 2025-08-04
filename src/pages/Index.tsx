import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";

type AppState = "login" | "signup" | "dashboard" | "leaderboard";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("login");
  const [userName, setUserName] = useState("");

  const handleLogin = (email: string) => {
    // Extract name from email for demo purposes
    const name = email.split('@')[0].replace(/[._]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setUserName(name);
    setCurrentState("dashboard");
  };

  const handleSignup = (name: string, email: string) => {
    setUserName(name);
    setCurrentState("dashboard");
  };

  const handleLogout = () => {
    setUserName("");
    setCurrentState("login");
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case "login":
        return (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentState("signup")}
          />
        );
      case "signup":
        return (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentState("login")}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            userName={userName}
            onLogout={handleLogout}
            onNavigateToLeaderboard={() => setCurrentState("leaderboard")}
          />
        );
      case "leaderboard":
        return (
          <Leaderboard
            currentUser={userName}
            onBack={() => setCurrentState("dashboard")}
          />
        );
      default:
        return null;
    }
  };

  // Auth pages layout
  if (currentState === "login" || currentState === "signup") {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {renderCurrentView()}
        </div>
      </div>
    );
  }

  // Dashboard and leaderboard have their own layouts
  return renderCurrentView();
};

export default Index;
