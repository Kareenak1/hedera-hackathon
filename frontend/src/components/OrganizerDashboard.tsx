import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import { Calendar, DollarSign, Users, Heart, Ticket } from "lucide-react";

export function OrganizerDashboard() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [donationPercent, setDonationPercent] = useState([30]);
  const [description, setDescription] = useState("");
  
  const handleMintTicket = () => {
    // Mock mint functionality
    alert(`Minting NFT tickets for: ${eventName}\nDonation: ${donationPercent[0]}%`);
  };
  
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">Organizer Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Create events and mint NFT tickets that make a difference
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Create Event Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input
                    id="eventName"
                    placeholder="Summer Music Festival"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="ticketPrice">Ticket Price (HBAR)</Label>
                  <Input
                    id="ticketPrice"
                    type="number"
                    placeholder="50"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label>Donation to Health Fund: {donationPercent[0]}%</Label>
                  <div className="pt-4">
                    <Slider
                      value={donationPercent}
                      onValueChange={setDonationPercent}
                      min={10}
                      max={70}
                      step={5}
                      className="[&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-secondary [&_[role=slider]]:to-primary"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>10%</span>
                    <span>70%</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell attendees about your event..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <Button
                  onClick={handleMintTicket}
                  className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90"
                  disabled={!eventName || !eventDate || !ticketPrice}
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  Mint NFT Tickets
                </Button>
              </CardContent>
            </Card>
            
            {/* Preview Card */}
            {eventName && (
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>Ticket Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg">
                    <h3 className="text-xl mb-2">{eventName || "Your Event Name"}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{eventDate || "Event Date"}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{ticketPrice || "0"} HBAR</span>
                      <div className="px-3 py-1 bg-gradient-to-r from-secondary to-primary text-white rounded-full text-sm">
                        {donationPercent[0]}% to Health
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Analytics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Event Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-2 border-secondary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Ticket className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">Tickets Sold</span>
                      </div>
                      <div className="text-3xl">247</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Donated</span>
                      </div>
                      <div className="text-3xl">2,847</div>
                      <div className="text-xs text-muted-foreground">HBAR</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-secondary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">Revenue</span>
                      </div>
                      <div className="text-3xl">9,518</div>
                      <div className="text-xs text-muted-foreground">HBAR</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Lives Helped</span>
                      </div>
                      <div className="text-3xl">8</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="pt-4">
                  <h4 className="mb-3">Recent Events</h4>
                  <div className="space-y-3">
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p>Afrobeat Summer Festival</p>
                          <p className="text-sm text-muted-foreground">Oct 15, 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">87 sold</p>
                          <p className="text-secondary">Active</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/50">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p>Jazz Night Under Stars</p>
                          <p className="text-sm text-muted-foreground">Sep 12, 2025</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">160 sold</p>
                          <p className="text-muted-foreground">Completed</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Withdraw Funds
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}