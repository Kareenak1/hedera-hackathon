import { Heart, Ticket, Wallet, LayoutDashboard, Activity } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  walletConnected: boolean;
  onConnectWallet: () => void;
}

export function Navigation({ currentPage, onNavigate, walletConnected, onConnectWallet }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="font-semibold text-xl">Ubuntu Pass</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onNavigate('marketplace')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'marketplace' ? 'text-primary bg-primary/10' : 'text-foreground hover:text-primary'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Events</span>
          </button>
          
          <button
            onClick={() => onNavigate('impact')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'impact' ? 'text-primary bg-primary/10' : 'text-foreground hover:text-primary'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Impact</span>
          </button>
          
          {walletConnected && (
            <>
              <button
                onClick={() => onNavigate('wallet')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'wallet' ? 'text-primary bg-primary/10' : 'text-foreground hover:text-primary'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>My Tickets</span>
              </button>
              
              <button
                onClick={() => onNavigate('organizer')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === 'organizer' ? 'text-primary bg-primary/10' : 'text-foreground hover:text-primary'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Organizer</span>
              </button>
            </>
          )}
        </div>
        
        <div>
          {walletConnected ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl border border-primary/20">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm">0x7f3...a92b</span>
            </div>
          ) : (
            <Button onClick={onConnectWallet} className="bg-gradient-to-r from-secondary to-primary hover:opacity-90">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}