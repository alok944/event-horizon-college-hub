
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EventType } from "@/lib/types";

interface EventTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  counts: Record<string, number>;
}

const EventTabs = ({ activeTab, onTabChange, counts }: EventTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="w-full flex justify-between md:justify-start mb-4 bg-gray-100 dark:bg-gray-800 p-1">
        <TabsTrigger value="all" className="flex-1 md:flex-none">
          All Events
          <span className="ml-1 text-xs rounded-full bg-primary/10 px-2 py-0.5">
            {counts.all || 0}
          </span>
        </TabsTrigger>
        <TabsTrigger value="hackathon" className="flex-1 md:flex-none">
          Hackathons
          <span className="ml-1 text-xs rounded-full bg-purple-500/10 px-2 py-0.5">
            {counts.hackathon || 0}
          </span>
        </TabsTrigger>
        <TabsTrigger value="workshop" className="flex-1 md:flex-none">
          Workshops
          <span className="ml-1 text-xs rounded-full bg-blue-500/10 px-2 py-0.5">
            {counts.workshop || 0}
          </span>
        </TabsTrigger>
        <TabsTrigger value="tech_talk" className="flex-1 md:flex-none">
          Tech Talks
          <span className="ml-1 text-xs rounded-full bg-green-500/10 px-2 py-0.5">
            {counts.tech_talk || 0}
          </span>
        </TabsTrigger>
        <TabsTrigger value="career_fair" className="flex-1 md:flex-none">
          Career Fairs
          <span className="ml-1 text-xs rounded-full bg-amber-500/10 px-2 py-0.5">
            {counts.career_fair || 0}
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default EventTabs;
