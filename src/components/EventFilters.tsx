
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { EventFiltersState } from "@/lib/types";
import { colleges, eventTypes } from "@/data/mockEvents";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventFiltersProps {
  filters: EventFiltersState;
  onFilterChange: (filters: EventFiltersState) => void;
}

const EventFilters = ({ filters, onFilterChange }: EventFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (field: keyof EventFiltersState, value: any) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleReset = () => {
    onFilterChange({
      search: "",
      type: "all",
      college: "All Colleges",
      startDate: null,
      endDate: null,
      isVirtual: null,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-4 sticky top-0 z-10 border-b">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex-grow">
            <Input
              placeholder="Search events..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
          
          <div className="hidden lg:flex flex-wrap gap-3 items-center">
            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.college}
              onValueChange={(value) => handleFilterChange("college", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select College" />
              </SelectTrigger>
              <SelectContent>
                {colleges.map((college) => (
                  <SelectItem key={college} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !filters.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.startDate ? (
                      format(filters.startDate, "PPP")
                    ) : (
                      <span>From date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.startDate || undefined}
                    onSelect={(date) => handleFilterChange("startDate", date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-center gap-3">
              <Label htmlFor="virtual-switch" className="cursor-pointer">Virtual only</Label>
              <Switch
                id="virtual-switch"
                checked={filters.isVirtual === true}
                onCheckedChange={(checked) => handleFilterChange("isVirtual", checked ? true : null)}
              />
            </div>
            
            {(filters.search !== "" || 
              filters.type !== "all" || 
              filters.college !== "All Colleges" || 
              filters.startDate !== null ||
              filters.isVirtual !== null) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        </div>
        
        {isOpen && (
          <div className="lg:hidden grid grid-cols-1 gap-3 mt-2 pb-2">
            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.college}
              onValueChange={(value) => handleFilterChange("college", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select College" />
              </SelectTrigger>
              <SelectContent>
                {colleges.map((college) => (
                  <SelectItem key={college} value={college}>
                    {college}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDate ? (
                    format(filters.startDate, "PPP")
                  ) : (
                    <span>From date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDate || undefined}
                  onSelect={(date) => handleFilterChange("startDate", date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="virtual-switch-mobile" className="cursor-pointer">Virtual events only</Label>
              <Switch
                id="virtual-switch-mobile"
                checked={filters.isVirtual === true}
                onCheckedChange={(checked) => handleFilterChange("isVirtual", checked ? true : null)}
              />
            </div>
            
            {(filters.search !== "" || 
              filters.type !== "all" || 
              filters.college !== "All Colleges" || 
              filters.startDate !== null ||
              filters.isVirtual !== null) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                <span>Reset filters</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventFilters;
