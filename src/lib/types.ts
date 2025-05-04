
export type EventType = 'hackathon' | 'workshop' | 'tech_talk' | 'career_fair' | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string; // ISO string format
  endDate?: string; // Optional end date for multi-day events
  location: string;
  college: string;
  link?: string;
  image?: string;
  isVirtual: boolean;
}

export interface EventFiltersState {
  search: string;
  type: EventType | 'all';
  college: string;
  startDate: Date | null;
  endDate: Date | null;
  isVirtual: boolean | null;
}
