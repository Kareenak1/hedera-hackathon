import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { EventMarketplace } from "./components/EventMarketplace";
import { MyWallet } from "./components/MyWallet";
import { OrganizerDashboard } from "./components/OrganizerDashboard";
import { HealthImpactDashboard } from "./components/HealthImpactDashboard";
import { DonationVerification } from "./components/DonationVerification";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  price: number;
  donationPercent: number;
  image: string;
  totalRaised: number;
  goal: number;
  category: string;
}

interface WalletTicket {
  id: number;
  eventName: string;
  date: string;
  location: string;
  price: number;
  donationAmount: number;
  image: string;
  qrCode: string;
  patientHelped?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [myTickets, setMyTickets] = useState<WalletTicket[]>([]);
  const [verificationId, setVerificationId] = useState<number>(1);
  
  const handleConnectWallet = () => {
    setWalletConnected(true);
    toast.success("Wallet Connected!", {
      description: "Welcome to Ubuntu Pass. Your wallet is now connected.",
      duration: 3000
    });
  };
  
  const handleNavigate = (page: string, id?: number) => {
    setCurrentPage(page);
    if (id !== undefined) {
      setVerificationId(id);
    }
    window.scrollTo(0, 0);
  };
  
  const handleBuyTicket = (event: Event) => {
    if (!walletConnected) {
      toast.error("Wallet Not Connected", {
        description: "Please connect your wallet first to purchase tickets.",
        duration: 3000
      });
      return;
    }
    
    const donationAmount = Math.round((event.price * event.donationPercent) / 100);
    const newTicket: WalletTicket = {
      id: myTickets.length + 1,
      eventName: event.name,
      date: event.date,
      location: event.location,
      price: event.price,
      donationAmount: donationAmount,
      image: event.image,
      qrCode: "QR_CODE_" + (myTickets.length + 1),
      patientHelped: Math.random() > 0.5 ? "Mary K." : undefined
    };
    
    setMyTickets([...myTickets, newTicket]);
    
    toast.success("Ticket Purchased!", {
      description: `You bought a ticket to ${event.name} and donated ${donationAmount} HBAR to help patients in need. 💚`,
      duration: 5000
    });
    
    // Navigate to wallet after purchase
    setTimeout(() => {
      handleNavigate("wallet");
    }, 1500);
  };
  
  const handleViewImpact = (ticketId: number) => {
    handleNavigate("verification", ticketId);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        walletConnected={walletConnected}
        onConnectWallet={handleConnectWallet}
      />
      
      <main className="pt-[72px]">
        {currentPage === "landing" && (
          <LandingPage
            onNavigate={handleNavigate}
            onConnectWallet={handleConnectWallet}
          />
        )}
        
        {currentPage === "marketplace" && (
          <EventMarketplace onBuyTicket={handleBuyTicket} />
        )}
        
        {currentPage === "wallet" && (
          <MyWallet
            tickets={myTickets}
            onViewImpact={handleViewImpact}
          />
        )}
        
        {currentPage === "organizer" && (
          <OrganizerDashboard />
        )}
        
        {currentPage === "impact" && (
          <HealthImpactDashboard onNavigate={handleNavigate} />
        )}
        
        {currentPage === "verification" && (
          <DonationVerification patientId={verificationId} />
        )}
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
}