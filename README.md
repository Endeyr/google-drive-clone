# Google Drive Clone

My google drive clone based on https://github.com/t3dotgg/drive-tutorial. 

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Endeyr/rs3-gim
```

2. Install dependencies: 

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Scripts

- dev # Starts the development server
- build # Builds the application for production.
- start # Initiates the production server for your application.
- lint # Runs ESLint to check for code quality and style issues.
- test # Runs the test suite using Jest.
- test:watch # Runs the test suite using Jest and runs on changes.
- prepare # Runs husky prepare for first time setup.
- format # Runs Prettier to format code based on config.
- format:fix # Runs Prettier and changes code to fit config format.

## Dependencies

The project uses the following main dependencies:

- React # A JavaScript library for building user interfaces.
- React-Hook-Form # A library for managing forms in React with minimal re-rendering.
- Zod # A TypeScript-first schema declaration and validation library.

## Dev Dependencies

The development dependencies include tools and libraries to aid in development:

- Eslint # A tool for identifying and fixing problems in JavaScript code.
- Testing-library # A family of libraries to test UI components.
- Husky # A tool for improving git hooks.
- Jest # A testing framework for React applications.
- Prettier # An opinionated code formatter.
- Tailwindcss # A utility-first CSS framework for rapid UI development.
- Typescript # A typed superset of JavaScript that compiles to plain JavaScript.

## Project Structure

```bash
├── app/ # Next.js App Router (pages, layouts, and route handlers)
├── components/ # Reusable UI components
├── data/ # Static data files and mock data
├── hooks/ # Custom React hooks
├── lib/ # Third-party library integrations/initializations
├── providers/ # React context providers
├── public/ # Static assets (images, fonts, etc.)
├── services/ # API services and external service integrations
├── types/ # TypeScript type definitions
├── utils/ # Utility functions and helpers
├── jest.config.ts # Jest testing configuration
├── components.json # Setup file for ShadCn UI Library
├── __mocks__ # Mock data for testing
└── __test__ # Test files directory
```

## DEMO

Demo found on [Netlify](https://eloquent-lokum-f587c6.netlify.app/).

## License

This project is licensed under the MIT License.