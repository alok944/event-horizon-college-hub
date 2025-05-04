
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/lib/types";
import { Calendar, ExternalLink, MapPin, School } from "lucide-react";
import { format, parseISO } from "date-fns";

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailModal = ({ event, isOpen, onClose }: EventDetailModalProps) => {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "EEEE, MMMM d, yyyy 'at' h:mm a");
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start mb-1">
            <DialogTitle className="text-xl">{event.title}</DialogTitle>
            <Badge className={getBadgeColor(event.type)}>
              {getEventTypeLabel(event.type)}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <School className="h-4 w-4" />
            <span>{event.college}</span>
          </div>
        </DialogHeader>

        {event.image && (
          <div className="aspect-video overflow-hidden rounded-md mb-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        )}
        
        <div className="mb-4 space-y-4">
          <p className="whitespace-pre-line text-foreground">{event.description}</p>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-sm">{formatDate(event.date)}</p>
                {event.endDate && (
                  <p className="text-sm">
                    {event.endDate && `Ends: ${formatDate(event.endDate)}`}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm">
                  {event.isVirtual ? "Virtual Event" : event.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-between gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {event.link && (
            <Button
              className="gap-1"
              onClick={() => window.open(event.link, "_blank")}
            >
              Visit Event Page
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
