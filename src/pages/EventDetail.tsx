
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, MapPin, School, ArrowLeft } from "lucide-react";
import { format, parseISO } from "date-fns";
import { mockEvents } from "@/data/mockEvents";
import { Event } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchEvent = () => {
      setIsLoading(true);
      try {
        // Find the event from mock data - in a real app, this would be an API call
        const foundEvent = mockEvents.find(e => e.id === eventId);
        
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          toast({
            title: "Event not found",
            description: "The event you're looking for doesn't exist or has been removed.",
            variant: "destructive"
          });
          navigate('/'); // Redirect to home if event not found
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast({
          title: "Error loading event",
          description: "There was a problem loading the event details.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, navigate, toast]);

  const handleGoBack = () => {
    navigate('/');
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Event not found</h1>
          <p className="mb-4">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleGoBack}>Return to events</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="page-container py-6">
          <Button variant="ghost" onClick={handleGoBack} className="mb-4 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{event.title}</h1>
                <Badge className={getBadgeColor(event.type)}>
                  {getEventTypeLabel(event.type)}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <School className="h-4 w-4" />
                <span>{event.college}</span>
              </div>
            </div>
            {event.link && (
              <Button 
                className="gap-1 w-full md:w-auto" 
                onClick={() => window.open(event.link, "_blank")}
              >
                Visit Official Event Page
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="page-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event details */}
          <div className="col-span-2 space-y-6">
            {event.image && !imageError && (
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-auto"
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold">About This Event</h2>
              <div className="whitespace-pre-line">{event.description}</div>
            </div>
          </div>

          {/* Event metadata */}
          <div className="col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6 sticky top-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">When & Where</h2>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Date & Time</h3>
                    <p className="text-sm">{formatDate(event.date)}</p>
                    {event.endDate && (
                      <p className="text-sm mt-1">
                        {`Ends: ${formatDate(event.endDate)}`}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm">
                      {event.isVirtual ? "Virtual Event" : event.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Recommended Hackathon Platforms</h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="https://dorahacks.io/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                    >
                      DoraHacks
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://defolio.co/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                    >
                      Defolio
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://devpost.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                    >
                      Devpost
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </li>
                </ul>
              </div>
              
              {event.link && (
                <Button 
                  className="w-full gap-1" 
                  onClick={() => window.open(event.link, "_blank")}
                >
                  Register Now
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;
