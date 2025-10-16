import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Heart, Users, Activity, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PatientStory {
  id: number;
  name: string;
  age: number;
  condition: string;
  status: "recovered" | "ongoing" | "helped";
  amountRaised: number;
  amountNeeded: number;
  image: string;
  story: string;
  hospital: string;
}

const patientStories: PatientStory[] = [
  {
    id: 1,
    name: "Mary K.",
    age: 7,
    condition: "Pneumonia Treatment",
    status: "recovered",
    amountRaised: 850,
    amountNeeded: 850,
    image: "https://images.unsplash.com/photo-1585628481967-1abce3066501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk1ODkzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    story: "Mary received life-saving pneumonia treatment thanks to Ubuntu Pass community donations.",
    hospital: "Kenyatta National Hospital"
  },
  {
    id: 2,
    name: "James M.",
    age: 45,
    condition: "Diabetes Medication",
    status: "ongoing",
    amountRaised: 420,
    amountNeeded: 600,
    image: "https://images.unsplash.com/photo-1550831106-2747f0d6a81c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcmVjb3ZlcnklMjBob3BlfGVufDF8fHx8MTc1OTU4OTM5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    story: "James needs ongoing diabetes medication. Your ticket purchases help cover his monthly treatment.",
    hospital: "Aga Khan Hospital"
  },
  {
    id: 3,
    name: "Sarah L.",
    age: 32,
    condition: "Surgery Recovery",
    status: "recovered",
    amountRaised: 1500,
    amountNeeded: 1500,
    image: "https://images.unsplash.com/photo-1585628481967-1abce3066501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk1ODkzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    story: "Sarah successfully recovered from emergency surgery funded by event ticket sales.",
    hospital: "Lagos University Teaching Hospital"
  },
  {
    id: 4,
    name: "David O.",
    age: 12,
    condition: "Malaria Treatment",
    status: "helped",
    amountRaised: 350,
    amountNeeded: 350,
    image: "https://images.unsplash.com/photo-1585628481967-1abce3066501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwc21pbGluZ3xlbnwxfHx8fDE3NTk1ODkzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    story: "David received full malaria treatment and is now healthy and back to school.",
    hospital: "Komfo Anokye Teaching Hospital"
  },
  {
    id: 5,
    name: "Grace N.",
    age: 28,
    condition: "Maternity Care",
    status: "ongoing",
    amountRaised: 720,
    amountNeeded: 1200,
    image: "https://images.unsplash.com/photo-1550831106-2747f0d6a81c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcmVjb3ZlcnklMjBob3BlfGVufDF8fHx8MTc1OTU4OTM5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    story: "Grace is receiving prenatal care and preparing for safe childbirth with community support.",
    hospital: "Mulago National Referral Hospital"
  },
  {
    id: 6,
    name: "Peter K.",
    age: 55,
    condition: "Heart Medication",
    status: "ongoing",
    amountRaised: 890,
    amountNeeded: 1800,
    image: "https://images.unsplash.com/photo-1550831106-2747f0d6a81c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcmVjb3ZlcnklMjBob3BlfGVufDF8fHx8MTc1OTU4OTM5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    story: "Peter needs ongoing heart medication to manage his condition and maintain quality of life.",
    hospital: "Chris Hani Baragwanath Hospital"
  }
];

interface HealthImpactDashboardProps {
  onNavigate: (page: string, id?: number) => void;
}

export function HealthImpactDashboard({ onNavigate }: HealthImpactDashboardProps) {
  const totalDonated = patientStories.reduce((sum, p) => sum + p.amountRaised, 0);
  const patientsHelped = patientStories.filter(p => p.status === "recovered" || p.status === "helped").length;
  const ongoingCases = patientStories.filter(p => p.status === "ongoing").length;
  
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Community Healing Progress</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent impact tracking. Every ticket sale makes a real difference in someone's life.
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/10 to-transparent">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" fill="white" />
              </div>
              <div className="text-4xl mb-2">{totalDonated.toLocaleString()}</div>
              <div className="text-muted-foreground">Total HBAR Donated 💰</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl mb-2">{patientsHelped}</div>
              <div className="text-muted-foreground">Patients Helped 🏥</div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl mb-2">{ongoingCases}</div>
              <div className="text-muted-foreground">Ongoing Cases 🤝</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Patient Stories */}
        <div className="mb-8">
          <h2 className="text-3xl mb-6">Patient Stories</h2>
          <p className="text-muted-foreground mb-6">
            Real people receiving real help through the Ubuntu Pass community
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientStories.map((patient) => {
            const progressPercent = (patient.amountRaised / patient.amountNeeded) * 100;
            
            return (
              <Card key={patient.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={patient.image}
                    alt={patient.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className={`absolute top-3 right-3 ${
                      patient.status === "recovered" 
                        ? "bg-secondary border-0" 
                        : patient.status === "ongoing"
                        ? "bg-primary border-0"
                        : "bg-gradient-to-r from-secondary to-primary border-0"
                    }`}
                  >
                    {patient.status === "recovered" ? "✓ Recovered" : patient.status === "ongoing" ? "Ongoing" : "Helped"}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl mb-1">{patient.name}, {patient.age} yrs</h3>
                  <p className="text-sm text-muted-foreground mb-4">{patient.condition}</p>
                  
                  <p className="text-sm mb-4 line-clamp-2">{patient.story}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="flex items-center gap-1">
                        {patient.amountRaised} / {patient.amountNeeded} HBAR
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{patient.hospital}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigate('verification', patient.id)}
                      className="text-primary hover:text-primary"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Proof
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-secondary/5 to-primary/5 border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-3">Want to help more people?</h3>
              <p className="text-muted-foreground mb-6">
                Purchase tickets to upcoming events and automatically contribute to saving lives.
              </p>
              <Button 
                onClick={() => onNavigate('marketplace')}
                className="bg-gradient-to-r from-secondary to-primary hover:opacity-90"
              >
                Browse Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}