
import { useState, useEffect } from "react";
import { Event, EventFiltersState } from "@/lib/types";
import { mockEvents } from "@/data/mockEvents";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import EventDetailModal from "@/components/EventDetailModal";
import EventForm from "@/components/EventForm";
import EventTabs from "@/components/EventTabs";
import EventSorter from "@/components/EventSorter";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { ListFilter, LayoutGrid, List } from "lucide-react";

const Index = () => {
  // State for events
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  
  // State for tabs and filters
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [sortOption, setSortOption] = useState<"date-asc" | "date-desc" | "name-asc" | "name-desc">("date-asc");
  
  // State for filters
  const [filters, setFilters] = useState<EventFiltersState>({
    search: "",
    type: "all",
    college: "All Colleges",
    startDate: null,
    endDate: null,
    isVirtual: null,
  });
  
  // State for selected event
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update filter type when tab changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      type: activeTab as any
    }));
  }, [activeTab]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...events];
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.college.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by event type
    if (filters.type && filters.type !== "all") {
      result = result.filter((event) => event.type === filters.type);
    }
    
    // Filter by college
    if (filters.college && filters.college !== "All Colleges") {
      result = result.filter((event) => event.college === filters.college);
    }
    
    // Filter by start date
    if (filters.startDate) {
      const startDate = filters.startDate.getTime();
      result = result.filter((event) => {
        const eventDate = new Date(event.date).getTime();
        return eventDate >= startDate;
      });
    }
    
    // Filter by virtual/in-person
    if (filters.isVirtual !== null) {
      result = result.filter((event) => event.isVirtual === filters.isVirtual);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortOption === "date-desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOption === "name-asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    
    setFilteredEvents(result);
  }, [events, filters, sortOption]);

  // Calculate event counts for each category
  const eventCounts = events.reduce((counts: Record<string, number>, event) => {
    counts.all = (counts.all || 0) + 1;
    counts[event.type] = (counts[event.type] || 0) + 1;
    return counts;
  }, {});

  // Handle event selection
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };
  
  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  // Handle adding a new event
  const handleAddEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="page-container py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">Event Horizon</h1>
              <p className="text-muted-foreground">Discover college tech events in one place</p>
            </div>
            <EventForm onSubmit={handleAddEvent} />
          </div>
        </div>
      </header>

      <main className="page-container py-6">
        {/* Tabs */}
        <EventTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          counts={eventCounts} 
        />
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)} 
              className="flex gap-1 bg-background"
            >
              <ListFilter className="h-4 w-4" />
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </Button>
            
            <EventSorter value={sortOption} onChange={setSortOption} />
          </div>
          
          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value) => value && setViewMode(value as "grid" | "list")}
            className="bg-background"
          >
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <EventFilters 
            filters={filters}
            onFilterChange={setFilters}
          />
        )}
        
        {filteredEvents.length > 0 ? (
          <div className="mt-8">
            <div className={`${viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "flex flex-col gap-4"}`}
            >
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={handleEventClick}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <svg
                className="w-10 h-10 text-muted-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.5 9.4 7.55 4.24"></path>
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <path d="M3.29 7 12 12l8.71-5"></path>
                <path d="M12 22V12"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-1">No events found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or add a new event.
            </p>
          </div>
        )}
      </main>

      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
