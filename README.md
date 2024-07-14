# The Learning Club

The Learning Club provides learning resources each month around a specific topic. It then allows users to join group and attend events to discuss what they've learned a meet new people.

This repo contains the client application. The server application can be accessed [here](https://github.com/mirandajoy/the-learning-club-api/tree/main#readme).

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

3. Set up the database and backend server by following the instructions in [the-learning-club-api README.md](https://github.com/mirandajoy/the-learning-club-api/tree/main#readme).

4. Create a .env file in the root of the project
    ```sh
   touch .env
   ```

5. Set the VITE_API_URL equal to the local url you use to run the server-side code. Ex. VITE_API_URL=http://localhost:8080
    ```js
   VITE_API_URL=ENTER YOUR URL
   ```

6. Run the application locally
    ```sh
   npm run dev
   ```