 Driver Dashboard (React + Vite)

A simple Admin-only management system built with React + Vite.
It allows the admin to manage drivers, routes, and view system statistics.
This project is designed mainly for practicing authentication, protected routes, and dashboard design.

## Tech Stack & Libraries

The project is built using:

- React 18 – UI library.

- Vite – Development & build tool.

- TailwindCSS – Responsive styling.

- React Router v6 – Routing & Protected Routes.

- localStorage – Store login session.

## Validation:

- zod + react hook form (for forms & validation).

- Font Awesome – For icons.

- Recharts – For statistics & charts.

## Features
 
- Admin-only login with email & password.

- Protected dashboard pages (accessible only when logged in).

- Logout clears session from localStorage.

## Driver Management

- Add a new driver (with validation).

- View a list of drivers.

- Driver details page with assigned routes.

- Delete a driver.

- Update driver info (future enhancement).

## Route Management

- Add a new route with:

Name

Origin & Destination

Start & End time

Status (Assigned, Unassigned, In Progress)

Priority (High, Medium, Low)

Notes

- View a list of routes.

- Route details page.


## Statistics

- Total drivers count.

- Number of active routes.

- Completed vs In-progress routes.

- Can be extended with charts/graphs (Recharts).

## Admin Credentials

To log in:

Email: admin@123.com

Password: admin123

Any other credentials will be rejected.



🚀 Run Locally

Clone the repo:

git clone https://github.com/lotfybasemmomamed/driver-dashboard-react.git 

cd driver-dashboard-react


- Install dependencies:
npm install


- Run development server:
npm run dev



## Validation

- Login form:

Valid email format.

Password matches admin credentials.

- Driver/Route forms:

Required fields (name, status, etc.).

Valid email/phone (for drivers).

Route status & priority must be selected.