# README for Serverless Function Platform

This project is a serverless function platform that allows users to dynamically run JavaScript serverless functions. Below is a guide on how to get started, set up, and use the platform.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (typically comes with Node.js)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/KrtinShet/serverless-function-nodejs.git
   cd serverless-function-nodejs
   ```

2. **Install Dependencies:**
   Navigate to the project directory and run:

   ```bash
   npm install
   ```

## Running the Server

1. **Start the Server:**
   From the project directory, run:

```bash
npm run start
```

This will start the server on the specified port (default is 500).

2. **Accessing the Platform:**
   Access the platform via `http://localhost:5000` (or the configured port) in your web browser.

## Usage

- **Deploying Functions:**
  Use the platform's UI to write and deploy serverless functions. Specify the route and HTTP method for each function.

- **Executing Functions:**
  Functions are executed by making HTTP requests (GET, POST, PUT, DELETE) to the specified route.

- **Editing Functions:**
  Functions can be edited and redeployed through the platform's UI.
