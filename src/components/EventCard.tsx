
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "../lib/types";
import { format, parseISO } from "date-fns";

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
  viewMode?: "grid" | "list";
}

const EventCard = ({ event, onClick, viewMode = "grid" }: EventCardProps) => {
  const [isImageError, setIsImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  const getEventTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      hackathon: "Hackathon",
      workshop: "Workshop",
      tech_talk: "Tech Talk",
      career_fair: "Career Fair",
      other: "Event"
    };
    return typeMap[type] || "Event";
  };

  const getBadgeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      hackathon: "bg-purple-500 hover:bg-purple-600",
      workshop: "bg-blue-500 hover:bg-blue-600",
      tech_talk: "bg-green-500 hover:bg-green-600",
      career_fair: "bg-amber-500 hover:bg-amber-600",
      other: "bg-gray-500 hover:bg-gray-600"
    };
    return colorMap[type] || "bg-gray-500 hover:bg-gray-600";
  };

  if (viewMode === "list") {
    return (
      <Card className="event-card overflow-hidden hover:shadow-md transition-all">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
            {isImageError ? (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image</span>
              </div>
            ) : (
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={() => setIsImageError(true)}
              />
            )}
          </div>
          
          <div className="flex flex-col flex-grow p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.college}</p>
              </div>
              <Badge className={`${getBadgeColor(event.type)}`}>
                {getEventTypeLabel(event.type)}
              </Badge>
            </div>
            
            <p className="text-sm line-clamp-2 mb-4">{event.description}</p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mt-auto mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{event.isVirtual ? "Virtual Event" : event.location}</span>
              </div>
            </div>
            
            <Button 
              className="w-full sm:w-auto sm:self-end" 
              onClick={() => onClick(event)}
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="event-card overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden relative">
        {isImageError ? (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image available</span>
          </div>
        ) : (
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={() => setIsImageError(true)}
          />
        )}
        <Badge 
          className={`absolute top-3 right-3 ${getBadgeColor(event.type)}`}
        >
          {getEventTypeLabel(event.type)}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold line-clamp-2">{event.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{event.college}</p>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm line-clamp-3 mb-4">{event.description}</p>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{event.isVirtual ? "Virtual Event" : event.location}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          onClick={() => onClick(event)}
          variant="default"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
