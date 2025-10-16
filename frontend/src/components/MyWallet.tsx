import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Wallet, QrCode, Heart, Ticket as TicketIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

interface MyWalletProps {
  tickets: WalletTicket[];
  onViewImpact: (ticketId: number) => void;
}

export function MyWallet({ tickets, onViewImpact }: MyWalletProps) {
  if (tickets.length === 0) {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl mb-4">My Wallet</h1>
            <p className="text-muted-foreground text-lg">
              Your NFT tickets and donation impact
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center mb-4">
                <TicketIcon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl mb-2">No tickets yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Make your first impact! Purchase an event ticket to help fund medical care for those in need.
              </p>
              <Button className="bg-gradient-to-r from-secondary to-primary hover:opacity-90">
                Browse Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">My Wallet</h1>
          <div className="flex items-center gap-2 text-muted-foreground text-lg">
            <Wallet className="w-5 h-5" />
            <span>Connected: 0x7f3...a92b</span>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <TicketIcon className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Total Tickets</span>
              </div>
              <div className="text-3xl">{tickets.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Donated</span>
              </div>
              <div className="text-3xl">
                {tickets.reduce((sum, t) => sum + t.donationAmount, 0)} HBAR
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-5 h-5 text-secondary" fill="currentColor" />
                <span className="text-sm text-muted-foreground">Lives Impacted</span>
              </div>
              <div className="text-3xl">
                {tickets.filter(t => t.patientHelped).length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tickets List */}
        <div className="space-y-4">
          <h2 className="text-2xl mb-4">My NFT Tickets</h2>
          
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 relative overflow-hidden">
                    <ImageWithFallback
                      src={ticket.image}
                      alt={ticket.eventName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl mb-2">{ticket.eventName}</h3>
                        <p className="text-muted-foreground mb-1">{ticket.date}</p>
                        <p className="text-muted-foreground mb-4">{ticket.location}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="border-secondary text-secondary">
                            Paid: {ticket.price} HBAR
                          </Badge>
                          <Badge className="bg-gradient-to-r from-secondary to-primary border-0">
                            <Heart className="w-3 h-3 mr-1" fill="currentColor" />
                            Donated: {ticket.donationAmount} HBAR
                          </Badge>
                        </div>
                        
                        {ticket.patientHelped && (
                          <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg mb-2">
                            <Heart className="w-4 h-4 text-secondary" fill="currentColor" />
                            <span className="text-sm">Helped fund treatment for {ticket.patientHelped}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {/* Show QR modal */}}
                        >
                          <QrCode className="w-4 h-4 mr-2" />
                          Show QR
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                          onClick={() => onViewImpact(ticket.id)}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          View Impact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}