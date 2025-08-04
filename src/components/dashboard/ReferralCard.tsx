import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralCardProps {
  referralCode: string;
  referralUrl: string;
}

export const ReferralCard = ({ referralCode, referralUrl }: ReferralCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join our Internship Program',
          text: `Use my referral code: ${referralCode}`,
          url: referralUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard(referralUrl, "Referral link");
    }
  };

  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          Your Referral Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Referral Code</label>
          <div className="flex gap-2">
            <Input 
              value={referralCode} 
              readOnly 
              className="font-mono text-center text-lg font-bold bg-accent"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(referralCode, "Referral code")}
            >
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Referral Link</label>
          <div className="flex gap-2">
            <Input 
              value={referralUrl} 
              readOnly 
              className="text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(referralUrl, "Referral link")}
            >
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <Button 
          variant="gradient" 
          onClick={shareReferral}
          className="w-full"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Referral
        </Button>
      </CardContent>
    </Card>
  );
};