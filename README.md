#  Dynamic Event Calendar Application

A feature-rich calendar application built with React, offering intuitive event management and a sleek user interface.

## Features

- **Monthly Calendar View**: Navigate through months with ease.
- **Event Management**: Add, edit, and delete events effortlessly.
- **Drag and Drop**: Reschedule events by dragging them to different dates.
- **Time Conflict Detection**: Alerts for overlapping events when scheduling or rescheduling.
- **Event Filtering**: Search and filter events by keywords.
- **Responsive Design**: Fully responsive layout for various screen sizes.
- **Data Persistence**: Events are saved in local storage for data retention.
- **Export Functionality**: Export events for the current month as a JSON file.

## Running the App Locally

Follow these steps to run the app on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TheGhossst/Event-Calendar-React
   cd Event-Caldendar-React
   ```

2. **Install dependencies**:
   Make sure you have Node.js and npm installed on your machine. Then, run:
   ```bash
   npm i
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
  Open the link in your browser to access the app.


## Features in Detail

### Event Management
- **Add Event**: Click on a date to create a new event. Provide event details like title, description, and time.
- **Edit Event**: Click on an existing event to update its details.
- **Delete Event**: Remove an event by selecting it and clicking "Delete".

### Drag and Drop
Drag events across dates to reschedule them seamlessly. The app will automatically update the event details.

### Time Conflict Detection
Receive an alert if you attempt to schedule overlapping events, ensuring efficient time management.

### Event Filtering
Use the search bar to find events by title or keywords, helping you quickly locate specific events.

### Export Functionality
Export all events for the currently selected month as a JSON file for external use or backup.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **React-DnD**: For implementing drag-and-drop functionality.
- **CSS/Tailwind**: For styling the application.
- **LocalStorage**: For persisting user data locally.


