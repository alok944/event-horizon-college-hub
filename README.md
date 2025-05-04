
# Event Horizon - College Event Aggregator Platform

Event Horizon is a web application that aggregates tech-focused college events such as hackathons, workshops, tech talks, and career fairs from various universities into a single platform. This makes it easy for students to discover and participate in events across different colleges.

## Features

- **Event Dashboard**: Browse upcoming tech events from multiple colleges
- **Advanced Filtering**: Filter events by type, college, date, and more
- **Search Functionality**: Find events by keywords
- **Event Submission**: Submit new events with detailed information
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Shadcn/UI Components
- React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd event-horizon
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

- `src/components/`: Contains all React components
- `src/data/`: Contains mock data for events
- `src/pages/`: Contains page components
- `src/lib/`: Contains utility functions and type definitions

## Key Components

1. **EventCard**: Displays individual event information in a card format
2. **EventFilters**: Provides filtering options for events
3. **EventForm**: Form for submitting new events
4. **EventDetailModal**: Displays detailed information about an event

## Mock Data

The application currently uses mock data to simulate events from various colleges. In a production environment, this would be replaced with real data from college websites or APIs.

## Future Enhancements

- User authentication system
- Ability to save/bookmark favorite events
- Calendar view of events
- Email notifications for upcoming events
- Integration with actual college event APIs
- Attendee RSVP functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
