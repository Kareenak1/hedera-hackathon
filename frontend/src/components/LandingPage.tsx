import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Ticket, Heart, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onConnectWallet: () => void;
}

export function LandingPage({ onNavigate, onConnectWallet }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-primary/10 to-background" />
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1631295161934-ec6c829d282a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBoYW5kcyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc1OTQ4OTY5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Community"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full mb-6">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm">Healing Through Culture</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6 max-w-4xl mx-auto">
            Buy a Ticket. <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Heal a Life.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every Ubuntu Pass ticket funds real medical help for patients in need.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onConnectWallet}
              size="lg"
              className="bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-lg px-8 py-6"
            >
              Get Started
            </Button>
            <Button
              onClick={() => onNavigate('impact')}
              size="lg"
              variant="outline"
              className="border-2 text-lg px-8 py-6"
            >
              View Impact
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-secondary" />
              <span>234 Lives Changed</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-primary" />
              <span>1,849 Tickets Sold</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              <span>12 Active Communities</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-4xl md:text-5xl mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
            Three simple steps to make a difference while enjoying amazing cultural events
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-4">
                  <Ticket className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl mb-3">Buy Event Ticket 🎟️</h3>
                <p className="text-muted-foreground">
                  Browse exciting cultural events, concerts, and art shows. Purchase your NFT ticket on the blockchain.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl mb-3">% Donated to Medical Fund 💚</h3>
                <p className="text-muted-foreground">
                  A percentage of your ticket automatically goes to patients who need medical treatment or medicine.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl mb-3">See Who You Helped 👩‍⚕️</h3>
                <p className="text-muted-foreground">
                  Track your impact transparently. See real stories of patients who received help through your contribution.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-gradient-to-br from-secondary/5 to-primary/5 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span>Powered by Hedera | Built by Ubuntu Pass</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-primary transition-colors">About</button>
              <button className="hover:text-primary transition-colors">Privacy</button>
              <button className="hover:text-primary transition-colors">Terms</button>
              <button className="hover:text-primary transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}