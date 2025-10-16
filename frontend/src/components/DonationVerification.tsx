import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Heart, ExternalLink, Share2, Calendar, MapPin, DollarSign } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DonationVerificationProps {
  patientId: number;
}

// Mock data for verification
const verificationData = {
  patientName: "Mary K.",
  age: 7,
  condition: "Pneumonia Treatment",
  hospital: "Kenyatta National Hospital",
  totalAmount: 850,
  status: "Recovered",
  image: "https://images.unsplash.com/photo-1585628481967-1abce3066501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk1ODkzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  timeline: [
    {
      date: "Sep 15, 2025",
      event: "Afrobeat Summer Festival",
      amount: 285,
      tickets: 19,
      transactionHash: "0x7f3a92b...12e4f8"
    },
    {
      date: "Sep 22, 2025",
      event: "Jazz Night Under Stars",
      amount: 315,
      tickets: 21,
      transactionHash: "0xa42c17d...89b3e2"
    },
    {
      date: "Sep 28, 2025",
      event: "Traditional Dance Showcase",
      amount: 250,
      tickets: 18,
      transactionHash: "0xb91f52c...4a7d91"
    }
  ],
  story: "Mary was admitted with severe pneumonia and needed immediate treatment. Thanks to the Ubuntu Pass community, she received antibiotics, oxygen therapy, and professional medical care. She has now fully recovered and is back to school with her friends."
};

export function DonationVerification({ patientId }: DonationVerificationProps) {
  const handleShare = () => {
    alert("Share functionality: This would share your good deed on social media!");
  };
  
  const handleViewOnExplorer = (hash: string) => {
    alert(`View transaction ${hash} on Hedera Explorer`);
  };
  
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
            ← Back
          </Button>
          <h1 className="text-4xl md:text-5xl mb-4">Donation Verification</h1>
          <p className="text-muted-foreground text-lg">
            Transparent proof of impact on the blockchain
          </p>
        </div>
        
        {/* Patient Info Card */}
        <Card className="mb-6 overflow-hidden border-2 border-secondary/20">
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback
              src={verificationData.image}
              alt={verificationData.patientName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge className="absolute top-4 right-4 bg-secondary border-0 text-white">
              ✓ {verificationData.status}
            </Badge>
          </div>
          
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl mb-2">This event helped fund {verificationData.patientName}'s recovery</h2>
                <p className="text-xl text-muted-foreground">{verificationData.age} years old • {verificationData.condition}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{verificationData.hospital}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>{verificationData.totalAmount} HBAR Funded</span>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed mb-6">
              {verificationData.story}
            </p>
            
            <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg">
              <Heart className="w-5 h-5 text-secondary flex-shrink-0" fill="currentColor" />
              <p className="text-sm">
                <strong>{verificationData.timeline.reduce((sum, t) => sum + t.tickets, 0)} ticket purchases</strong> from <strong>{verificationData.timeline.length} events</strong> contributed to {verificationData.patientName}'s treatment
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Timeline of Donations */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-6">Donation Timeline</h3>
            
            <div className="space-y-6">
              {verificationData.timeline.map((item, index) => (
                <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary/20 last:border-l-0 last:pb-0">
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-secondary to-primary -translate-x-[9px]" />
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-lg">{item.event}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-secondary text-secondary w-fit">
                      {item.amount} HBAR from {item.tickets} tickets
                    </Badge>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary"
                    onClick={() => handleViewOnExplorer(item.transactionHash)}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View on Hedera Explorer: {item.transactionHash}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Share Card */}
        <Card className="bg-gradient-to-br from-secondary/5 to-primary/5 border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <h3 className="text-2xl mb-3">You made a real difference!</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Your ticket purchase helped {verificationData.patientName} receive the medical care she needed. Share your impact and inspire others to join the Ubuntu Pass community.
            </p>
            <Button 
              onClick={handleShare}
              className="bg-gradient-to-r from-secondary to-primary hover:opacity-90"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Your Good Deed 💚
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}