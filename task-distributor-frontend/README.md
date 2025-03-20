# Task Distributor Frontend

This is the frontend for the Task Distributor application, built with React, Redux, TypeScript, and Tailwind CSS. The application allows administrators to manage agents and distribute tasks efficiently.

## Features

- **Dashboard**: Overview of the system with quick stats.
- **Agent Management**: Add, edit, and delete agents.
- **Task Management**: Upload and manage tasks.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used

- **React**: For building the user interface.
- **Redux**: For state management.
- **TypeScript**: For type safety.
- **Tailwind CSS**: For styling.
- **Framer Motion**: For animations.
- **Lucide React**: For icons.
- **Axios**: For making HTTP requests.
- **React Router**: For routing.
- **Headless UI**: For accessible UI components.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ManishMahto1/task-distributor-frontend.git
   cd task-distributor-frontend



2. Install dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```




   ### Running the Application

To start the development server:

```sh
npm run dev

```

The application will be available at `http://localhost:5173/`.

### Building for Production

To build the application for production:

```sh
npm run build
# or
yarn build
```


### Project Structure

```plaintext
src/
├── components/          # Reusable components
│   ├── dashboard/       # Dashboard-specific components
│   └── shared/          # Shared components (e.g., Toast, ErrorBoundary)
├── pages/               # Page components
├── routes/              # Application routes
├── services/            # API service functions
├── store/               # Redux store and slices
├── types/               # TypeScript types
├── App.tsx              # Main application component
├── main.tsx             # Entry point
├── index.css            # Global styles

```



## License

This project is licensed under the ISC License.