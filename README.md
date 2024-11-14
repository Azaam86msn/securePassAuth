---

# SecurePassAuth

A Node.js server application demonstrating secure password hashing and verification using bcrypt. This project includes both asynchronous and synchronous hashing methods, making it a great starting point for implementing secure user authentication.

## Features

- Asynchronous and synchronous password hashing with bcrypt
- Password verification with hashed values
- Easy setup for secure password management in Node.js applications

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Azaam86msn/securePassAuth.git
   cd securePassAuth
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Run the server:

   ```bash
   node server.js
   ```

2. Open your terminal to view the hashed passwords and comparison results.

## Code Structure

- **Asynchronous Hashing**: Uses `bcrypt.hash` to hash a password asynchronously and `bcrypt.compare` to verify.
- **Synchronous Hashing**: Uses `bcrypt.hashSync` for synchronous hashing and `bcrypt.compareSync` for verification.

## Example Output

When running the server, you should see output similar to:

```plaintext
Async Hash: <hashed_password>
Async Compare (should be true): true
Async Compare with different password (should be false): false
Sync Hash: <hashed_password>
Sync Compare (should be true): true
Sync Compare with different password (should be false): false
```

## Requirements

- Node.js
- Bcrypt library (`npm install bcrypt`)

## License

This project is licensed under the MIT License.

---
