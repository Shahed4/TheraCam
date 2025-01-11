# TheraCam
TheraCam is a web application designed to revolutionize physical therapy by providing real-time feedback on exercise form. Built with user accessibility and effectiveness in mind, the platform is suitable for users of all ages. It leverages cutting-edge body tracking technology to ensure exercises are performed with proper form, helping users prevent injuries and achieve better results.

## Features
- User Accounts: Users can sign up and create personalized accounts.
- Exercise Form Tracking: Provides real-time feedback, highlighting:
- - Correct Form: Displayed in green.
- - Incorrect Form: Displayed in red.
- Interactive Interface: Simple and intuitive for users of all skill levels.
- Dual Server Functionality: Combines OpenPose for body tracking with Next.js for a seamless user experience.

## Tech Stack
- Frontend: Next.js
- Backend: OpenPose (real-time body tracking server)
- Styling: CSS Modules

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn

### Installation
1. Clone the repository:
- git clone https://github.com/Shahed4/TheraCam
2. Install dependencies:
- npm install | yarn install

## Running the Application
### Run Both Servers
To launch the application with both the OpenPose backend and Next.js frontend:
- npm run both

This will start:
- Backend Server (OpenPose)
- Frontend Server (Next.js)

Open http://localhost:3000 to access the application.
