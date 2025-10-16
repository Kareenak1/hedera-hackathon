import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Calendar, MapPin, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

const mockEvents: Event[] = [
  {
    id: 1,
    name: "Afrobeat Summer Festival",
    date: "Oct 15, 2025",
    location: "Lagos, Nigeria",
    price: 50,
    donationPercent: 30,
    image: "https://images.unsplash.com/photo-1672841821756-fc04525771c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTk1MDI0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    totalRaised: 4500,
    goal: 10000,
    category: "trending"
  },
  {
    id: 2,
    name: "Contemporary Art Exhibition",
    date: "Oct 20, 2025",
    location: "Accra, Ghana",
    price: 25,
    donationPercent: 40,
    image: "https://images.unsplash.com/photo-1758186130795-48b58cbc44c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXZlbnR8ZW58MXx8fHwxNzU5NTg5MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    totalRaised: 2800,
    goal: 5000,
    category: "upcoming"
  },
  {
    id: 3,
    name: "Traditional Dance Showcase",
    date: "Oct 18, 2025",
    location: "Nairobi, Kenya",
    price: 35,
    donationPercent: 35,
    image: "https://images.unsplash.com/photo-1717011969223-0217a302ec6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGRhbmNlJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzU5NTI0ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    totalRaised: 3200,
    goal: 8000,
    category: "upcoming"
  },
  {
    id: 4,
    name: "Jazz Night Under Stars",
    date: "Nov 5, 2025",
    location: "Cape Town, SA",
    price: 45,
    donationPercent: 25,
    image: "https://images.unsplash.com/photo-1672841821756-fc04525771c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTk1MDI0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    totalRaised: 1500,
    goal: 6000,
    category: "trending"
  },
  {
    id: 5,
    name: "Poetry & Spoken Word",
    date: "Oct 25, 2025",
    location: "Dakar, Senegal",
    price: 20,
    donationPercent: 50,
    image: "https://images.unsplash.com/photo-1758186130795-48b58cbc44c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXZlbnR8ZW58MXx8fHwxNzU5NTg5MzkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    totalRaised: 1800,
    goal: 3000,
    category: "upcoming"
  },
  {
    id: 6,
    name: "Electronic Music Festival",
    date: "Nov 12, 2025",
    location: "Kigali, Rwanda",
    price: 60,
    donationPercent: 20,
    image: "https://images.unsplash.com/photo-1672841821756-fc04525771c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTk1MDI0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    totalRaised: 5600,
    goal: 15000,
    category: "trending"
  }
];

interface EventMarketplaceProps {
  onBuyTicket: (event: Event) => void;
}

export function EventMarketplace({ onBuyTicket }: EventMarketplaceProps) {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredEvents = filter === "all" 
    ? mockEvents 
    : mockEvents.filter(e => e.category === filter);
  
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">Event Marketplace</h1>
          <p className="text-muted-foreground text-lg">
            Purchase NFT tickets and make a difference in someone's life
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-gradient-to-r from-secondary to-primary" : ""}
          >
            All Events
          </Button>
          <Button
            variant={filter === "upcoming" ? "default" : "outline"}
            onClick={() => setFilter("upcoming")}
            className={filter === "upcoming" ? "bg-gradient-to-r from-secondary to-primary" : ""}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === "trending" ? "default" : "outline"}
            onClick={() => setFilter("trending")}
            className={filter === "trending" ? "bg-gradient-to-r from-secondary to-primary" : ""}
          >
            Trending
          </Button>
        </div>
        
        {/* Event Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const progressPercent = (event.totalRaised / event.goal) * 100;
            
            return (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-secondary to-primary border-0">
                    {event.donationPercent}% to Health Fund
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl mb-2">{event.name}</h3>
                  
                  <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Health Impact Progress</span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-secondary" fill="currentColor" />
                        {event.totalRaised} / {event.goal} HBAR
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Ticket Price</div>
                      <div className="text-2xl">{event.price} HBAR</div>
                    </div>
                    <Button
                      onClick={() => onBuyTicket(event)}
                      className="bg-gradient-to-r from-secondary to-primary hover:opacity-90"
                    >
                      Buy Ticket
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}