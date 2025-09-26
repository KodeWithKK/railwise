# RailWise

RailWise is a comprehensive railway information platform that provides real-time train tracking, PNR status checking, train search, and schedule information for Indian Railways. Built with a modern React frontend and Express.js backend, it offers a seamless user experience for planning and monitoring railway journeys.

## Features

- **Real-time Train Tracking**: Monitor live train status and location updates
- **PNR Status Check**: Check your PNR status instantly
- **Train Search**: Find trains between stations with flexible time windows
- **Train Schedule**: View detailed train schedules and routes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Fast API**: Powered by RapidAPI for reliable railway data

## Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Lucide React** for icons
- **Axios** for API calls

### Backend

- **Express.js** with TypeScript
- **Axios** for external API integration
- **RapidAPI** for IRCTC data
- **AWS Lambda** for serverless deployment

### Infrastructure

- **Terraform** for infrastructure as code
- **AWS Lambda** and **API Gateway** for backend deployment

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- AWS CLI (for deployment)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/KodeWithKK/railwise.git
cd rail-wise
```

2. Install client dependencies:

```bash
cd client
npm install
```

3. Install server dependencies:

```bash
cd ../server
npm install
```

### Development Workflow

1. Start the backend server:

```bash
cd server
npm run dev
```

The server will run on `http://localhost:3000` (or configured port).

2. Start the frontend development server:

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173` (default Vite port).

3. Open your browser and navigate to the client URL to use the application.

### Building for Production

1. Build the client:

```bash
cd client
npm run build
```

2. Build the server:

```bash
cd server
npm run build
```

## API Usage

The RailWise API provides endpoints for accessing Indian Railways data. All endpoints return JSON responses.

### Base URL

```
http://localhost:3000/api/v1/irctc
```

### Endpoints

#### Search Trains

**GET** `/search-train`

Search for trains between two stations within a specified time window.

**Query Parameters:**

- `source` (string, required): Source station code
- `destination` (string, required): Destination station code
- `hours` (string, required): Time window in hours

**Example:**

```bash
curl "http://localhost:3000/api/v1/irctc/search-train?source=NDLS&destination=LKO&hours=24"
```

#### Live Train Status

**GET** `/live-train-status`

Get real-time status of a train.

**Query Parameters:**

- `trainNumber` (string, required): Train number
- `startDay` (string, required): Journey start day

**Example:**

```bash
curl "http://localhost:3000/api/v1/irctc/live-train-status?trainNumber=12512&startDay=1"
```

#### PNR Status

**GET** `/pnr-status/{pnr}`

Check the status of a PNR number.

**Path Parameters:**

- `pnr` (string, required): 10-digit PNR number

**Example:**

```bash
curl "http://localhost:3000/api/v1/irctc/pnr-status/1234567890"
```

#### Train Schedule

**GET** `/train-schedule/{trainNumber}`

Get the complete schedule and route of a train.

**Path Parameters:**

- `trainNumber` (string, required): Train number

**Example:**

```bash
curl "http://localhost:3000/api/v1/irctc/train-schedule/12512"
```

### Response Format

All successful responses return JSON data from the IRCTC API. Error responses follow this format:

```json
{
  "error": "Error message"
}
```

### Error Codes

- `400`: Bad Request (missing required parameters)
- `500`: Internal Server Error (API or server issues)

## Deployment Guide

RailWise uses Terraform for infrastructure provisioning and AWS Lambda for serverless deployment.

### Prerequisites

- AWS CLI configured with appropriate permissions
- Terraform installed
- S3 bucket for Terraform state (configured in `main.tf`)

### Backend Deployment

1. Navigate to the server directory:

```bash
cd server
```

2. Build the application:

```bash
npm run build
```

3. Create a deployment package:

```bash
# Create build.zip containing the built application
# This step may require additional tooling like esbuild or webpack
```

4. Initialize Terraform:

```bash
cd terraform
terraform init
```

5. Plan the deployment:

```bash
terraform plan
```

6. Apply the deployment:

```bash
terraform apply
```

7. Note the output Lambda URL for API access.

### Frontend Deployment

The frontend can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **AWS Lambda + Terraform**: For a more infrastructure-as-code approach

1. Build the client:

```bash
cd client
npm run build
```

2. Deploy the `dist` folder to your hosting provider.

3. Update API calls to point to the deployed Lambda URL.

### Environment Variables

Create a `.env` file in the server directory with:

```
RAPIDAPI_KEY=your_rapidapi_key
NODE_ENV=prod
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Disclaimer

This application uses third-party APIs for railway information. Please ensure compliance with IRCTC terms of service and API usage policies.</content>
<parameter name="filePath">c:\Users\kumar\OneDrive\Documents\K3Workspace\rail-wise\README.md
