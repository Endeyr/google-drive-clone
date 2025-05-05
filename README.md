# Google Drive Clone

A full-stack Google Drive clone built with Next.js 15, TypeScript, TailwindCSS, Clerk for authentication, Drizzle ORM for database access, and UploadThing for file uploads. Based on [Google Drive Clone Tutorial]("https://youtu.be/c-hKSbzooAg?si=wY6CduutI_VQ0dqv").

## Features

- ✅ User authentication with Clerk
- 📁 Upload and manage files with UploadThing
- 🧭 Dashboard UI with folder navigation
- 🗃️ Real-time database interaction with Drizzle ORM
- 🎨 Responsive design using Tailwind CSS
- 🔒 Protected routes and file access control
- 📦 Optimized build with Next.js App Router and Turbopack

## Tech Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS, `clsx`, `tailwind-merge`, `tailwindcss-animate`
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: Clerk
- **Database**: Drizzle ORM with MySQL
- **File Uploads**: UploadThing
- **Testing**: Jest, Testing Library
- **Linting & Formatting**: ESLint, Prettier
- **CI Tools**: Husky, Commitlint


## Getting Started

0. **Note:** This project uses [pnpm](https://pnpm.io). If you don't have it:
```bash
npm install -g pnpm
```

1. Clone the repository:

```bash
git clone https://github.com/Endeyr/google-drive-clone
```

2. Install dependencies: 

```bash
pnpm install
```

1. Create an `.env` file and copy variables from `env.example`, filling in with your own keys.

2. Run the development server:

```bash
pnpm run dev
```

The application will be available at http://localhost:3000.

## Scripts

- `dev`: Starts the development server
- `build`: Builds the application for production.
- `start`: Initiates the production server for your application.
- `lint`: Runs ESLint to check for code quality and style issues.
- `test`: Runs the test suite using Jest.
- `test:watch`: Runs the test suite using Jest and runs on changes.
- `prepare`: Runs husky prepare for first time setup.
- `format`: Runs Prettier to format code based on config.
- `format:fix`: Runs Prettier and changes code to fit config format.
- `db:generate`: Generate Drizzle ORM schema
- `db:migrate`: Apply new migrations
- `db:push`: Push schema to the database
- `db:studio`: Open Drizzle Studio GUI

## Dependencies

The project uses the following main dependencies:

- React: A JavaScript library for building user interfaces.
- React-Hook-Form: A library for managing forms in React with minimal re-rendering.
- Zod: A TypeScript-first schema declaration and validation library.

## Dev Dependencies

The development dependencies include tools and libraries to aid in development:

- Eslint: A tool for identifying and fixing problems in JavaScript code.
- Testing-library: A family of libraries to test UI components.
- Husky: A tool for improving git hooks.
- Jest: A testing framework for React applications.
- Prettier: An opinionated code formatter.
- Tailwindcss: A utility-first CSS framework for rapid UI development.
- Typescript: A typed superset of JavaScript that compiles to plain JavaScript.

## Project Structure

```bash
├── app/ # Next.js App Router (pages, layouts, and route handlers)
├── components/ # Reusable UI components
├── lib/ # Third-party library integrations/initializations
├── providers/ # React context providers
├── server/ # Server database functions
├── types/ # TypeScript type definitions
├── utils/ # Utility functions and helpers
├── jest.config.ts # Jest testing configuration
├── components.json # Setup file for ShadCn UI Library
└── __test__ # Test files directory
```

## DEMO

Demo found on [Netlify](https://eloquent-lokum-f587c6.netlify.app/).

## License

This project is licensed under the MIT License.