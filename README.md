# Celestia Blockchain Insights
A Next.js application that analyzes Celestia blockchain transactions and provides blockchain insights using the OpenAI API.

## Overview
This application allows users to:
- Generate reports on Celestia blockchain transactions
- Review high-value transactions and staking activity
- Receive AI-powered insights on market trends and potential investment opportunities
- Explore transaction details by clicking on them

## Features
- 🔍 Analyze high-value transactions on the Celestia blockchain
- 📊 View staking activity and trends
- 🤖 AI-generated investment insights using OpenAI
- 📱 Fully responsive design for all devices
- ⚡ Fast, server-side rendering with Next.js

## Tech Stack
Frontend: Next.js, React, TypeScript, Tailwind CSS
UI Components: Shadcn UI
Data Fetching: Axios
API Integration: Celenium API, OpenAI API
Styling: Tailwind CSS

## Getting Started

### Prerequisites
- Node 18.x or later
- npm, yarn, or pnpm
- OpenAI API key

### Installation
Clone the repository

```bash
git clone https://github.com/yourusername/celestia-ainvestments.git
cd celestia-ainvestments
```

Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

Create a `.env` file in the root directory with your OpenAI API key

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000 with your browser to see the application.

## Features
1. **Initial Form:** Users start by configuring their parameters -
   - Number of transactions to analyze
   - Minimum transaction value in TIA
2. **Loading State:** After submitting the form, users see a loading spinner with funny blockchain-related messages.
3. **Report View:** Once data is fetched, users will see -
   - AI-generated insights about market trends and investment opportunities
   - High-value transactions table
   - Staking activity table
4. **Option to generate a new report**: Users can generate a new report with different parameters by clicking the "Generate Report" button.
5. **Transaction Details:** Users can click on any transaction to view more details on the Celenium explorer.

## How It Works

### Data Flow
![Data Flow](https://res.cloudinary.com/dacofvu8m/image/upload/v1741118054/CleanShot_2025-03-04_at_14.53.53_2x_ymuocu.png)

### Key Components
- **Form**: Collects user parameters for the report
- **DataTable**: Displays transaction data in a paginated table, with the `Columns` component defining the table columns.
- **API Routes**: Handle data fetching and AI processing

## Development

### Project Structure
src/
├── app/
│   ├── api/
│   │   ├── insights/
│   │   │   └── route.ts       # OpenAI API integration
│   │   └── transactions/
│   │       ├── requests.ts    # Client-side API functions
│   │       └── route.ts       # Celenium API integration
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page component
├── components/
│   ├── Columns.tsx            # Table column definitions
│   ├── DataTable.tsx          # Reusable data table component
│   ├── Form.tsx               # Input form component
│   └── ui/                    # UI components from shadcn/ui
└── types/
    └── index.ts               # TypeScript type definitions

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## Starting Production Server

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer
The insights provided by this application are not financial advice. Always do your own research before making investment decisions.
