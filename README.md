# Hotel Management System

## Description
This is a hotel management system designed for hotel employees to manage cabins, bookings, and guests efficiently. It provides features for user authentication, cabin management, booking management, guest management, and application-wide settings.
## Demo
[the wild oasis.webm](https://github.com/hamatoatef/the-wild-oasis/assets/88297240/ef98d205-b767-4c8d-ba3d-f200fe2cba5f)

## Features
- **User Authentication**:
  - Users need to log in to perform tasks.
  - New users can only be signed up within the application.
- **Profile Management**:
  - Users can upload an avatar, change their name, and password.
- **Cabin Management**:
  - Table view with all cabins showing photo, name, capacity, price, and discount.
  - CRUD operations for cabins including photo upload.
- **Booking Management**:
  - Table view with all bookings showing arrival and departure dates, status, paid amount, cabin, and guest data.
  - Filterable by booking status.
  - Additional booking data includes number of guests, number of nights, guest observations, and breakfast details.
  - CRUD operations for bookings.
- **Check-in and Check-out**:
  - Users can delete, check-in, or check-out a booking.
  - Accept payment on check-in and confirm payment receipt.
- **Guest Management**:
  - Manage guest data including full name, email, national ID, nationality, and country flag.
- **Dashboard**:
  - Displays important information for the last 7, 30, or 90 days.
  - Lists guests checking in and out on the current day.
  - Provides statistics on recent bookings, sales, check-ins, and occupancy rate.
  - Charts showing daily hotel sales and stay durations.
- **Application-wide Settings**:
  - Users can define settings such as breakfast price, min/max nights per booking, and max guests per booking.
- **Dark Mode**:
  - Supports dark mode for better user experience.

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js
- **Database**: PostgreSQL

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
