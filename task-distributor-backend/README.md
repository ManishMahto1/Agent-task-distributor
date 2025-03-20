# Task Distributor Backend

This is the backend for the Task Distributor application. It provides APIs for managing tasks and distributing them among agents.

## Features

- **User Authentication**: Secure login and registration .
- **Agent Management**: Add, edit, and delete agents.
- **Task Management**: Upload tasks .
- **Task Distribution**: Distribute tasks among agents.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT**: JSON Web Tokens for authentication.
- **bcryptjs**: Password hashing.
- **dotenv**: Environment variable management.
- **multer**: File upload handling.
- **winston**: Logging.
- **zod**: Schema validation.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/ManishMahto1/task-distributor-backend.git
    cd task-distributor-backend
    ```

2. Install dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```properties
    MONGO_URI=mongodb://localhost:27017/task-distributor
    JWT_SECRET= jwt_secret
    PORT=5000
    ```

### Running the Application

To start the development server:

```sh
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5000`.

### Building for Production

To build the application for production:

```sh
npm run build
# or
yarn build
```

### API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a task by ID
- `PUT /api/tasks/:id` - Update a task by ID
- `DELETE /api/tasks/:id` - Delete a task by ID
- `POST /api/agents` - Add a new agent
- `GET /api/agents` - Get all agents
- `GET /api/agents/:id` - Get an agent by ID
- `PUT /api/agents/:id` - Update an agent by ID
- `DELETE /api/agents/:id` - Delete an agent by ID

### Project Structure

```plaintext
src/
├── controllers/         # Route controllers
├── models/              # Mongoose models
├── routes/              # Express routes
├── services/            # Service functions
├── utils/               # Utility functions
├── middlewares/         # Express middlewares
├── server.ts            # Entry point

```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.