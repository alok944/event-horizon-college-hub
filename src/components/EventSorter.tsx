
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownAZ, ArrowUpAZ, Calendar, CalendarDays, ChevronDown } from "lucide-react";

type SortOption = "date-asc" | "date-desc" | "name-asc" | "name-desc";

interface EventSorterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const EventSorter = ({ value, onChange }: EventSorterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2 bg-background">
          {value === "date-asc" && (
            <>
              <Calendar className="h-4 w-4" />
              <span>Oldest First</span>
            </>
          )}
          {value === "date-desc" && (
            <>
              <CalendarDays className="h-4 w-4" />
              <span>Newest First</span>
            </>
          )}
          {value === "name-asc" && (
            <>
              <ArrowUpAZ className="h-4 w-4" />
              <span>A-Z</span>
            </>
          )}
          {value === "name-desc" && (
            <>
              <ArrowDownAZ className="h-4 w-4" />
              <span>Z-A</span>
            </>
          )}
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onChange("date-desc")}>
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>Newest First</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("date-asc")}>
          <Calendar className="mr-2 h-4 w-4" />
          <span>Oldest First</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("name-asc")}>
          <ArrowUpAZ className="mr-2 h-4 w-4" />
          <span>Name (A-Z)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("name-desc")}>
          <ArrowDownAZ className="mr-2 h-4 w-4" />
          <span>Name (Z-A)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventSorter;
