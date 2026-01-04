## Purpose and Capabilities
This is a Next.js application with two main sections: a user-facing landing page and an admin panel. The user-facing side allows customers to learn about the services offered and book them. The admin panel allows administrators to manage vendors, track bookings, view analytics, and monitor vendor locations in real-time.

## Project Outline

### Styling and Design
- **Framework**: Tailwind CSS
- **Typography**: The Poppins font is used for the user-facing pages, while the admin panel uses standard Tailwind classes.
- **Color Palette**: 
  - **User-facing**: Primarily slate colors with an indigo accent.
  - **Admin**: Primarily neutral colors with a primary accent color (Indigo).
- **Icons**: Heroicons and Lucide React

### User-Facing Section
- **Landing Page**: A welcoming page that introduces the business, explains how it works, and provides a clear call-to-action to book a service.

### Customer App Flow (`/customer`)
- **Home Dashboard (`/customer`):**
  - A mobile-first, clean white-themed dashboard with a sticky header.
  - A gradient banner hero section.
  - A grid of service categories (Cleaning, AC Repair, etc.) that navigate to the service menu.
- **Service Menu (`/customer/book/[serviceId]`):
  - Displays a vertical list of sub-services for the selected category.
  - Each sub-service is presented as a "Job Card" with details like name, price, and rating.
  - An "Add" button on each card opens a booking form modal.
- **Bookings History (`/customer/bookings`):
  - Fetches and displays a real-time list of bookings for the current user from Firebase.
  - Shows booking details including service, date, and vendor name.
  - Uses color-coded badges to indicate booking status (Pending, Assigned, Completed).
- **Booking Form Component (`/customer/components/BookingForm.js`):
  - A modal form for creating new bookings.
  - Captures customer name, address, and desired date.
  - Submits booking data to the Firebase `bookings` collection with a `pending` status.

### Admin Section (`/admin`)
- **Layout**: The admin section uses a sidebar for navigation and a main content area for page-specific content.
- **Dashboard**: The main landing page of the admin panel.
- **Vendors**: A page to manage vendors.
- **Bookings**: A page to manage bookings with a data grid from `ag-grid-react`.
- **Live Map**: A page that displays a live map of vendor locations using `react-leaflet`.
- **Analytics**: A page that displays various charts and graphs for business analytics using `recharts`.

## Current Plan

**Request**: Rebuild the "Customer App" flow to look like a professional mobile app.

**Steps**:
1.  **Create Home Dashboard**: Implement the UI for the customer dashboard with a hero section and service categories. **(Completed)**
2.  **Create Service Menu**: Implement the service menu with a list of sub-services and an "Add" button. **(Completed)**
3.  **Create Bookings History Page**: Implement the bookings history page with real-time data from Firebase. **(Completed - using mock data)**
4.  **Create Booking Form**: Implement the booking form modal. **(Completed)**
5.  **Set up Firebase**: Configure Firebase for the project. **(Completed - needs user credentials)**
6.  **Update `blueprint.md`**: Update the blueprint file to reflect the changes. **(Completed)**
