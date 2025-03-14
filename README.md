# Panache

> An open-source newsletter platform, designed for creators. Built on top of Resend

## Technology Stack

- [AdonisJS v6](https://adonisjs.com) - Full-featured Node.js web framework
- [React](https://react.dev) - Frontend UI library
- [Inertia.js](https://inertiajs.com) - Modern monolithic architecture
- [PostgreSQL](https://www.postgresql.org) - Open source database
- [TailwindCSS](https://tailwindcss.com) - Utility-first CSS framework
- [Docker](https://www.docker.com) - Containerization platform

## Development setup

1. **Prerequisites**

   - Docker and Docker Compose
   - Node.js 20 or higher
   - npm

2. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/panache.git
   cd panache
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env` file with the following:

   ```env
   PORT=3333
   HOST=0.0.0.0
   NODE_ENV=development
   APP_KEY=generate-a-random-key
   DRIVE_DISK=local
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=panache
   RESEND_API_KEY=your-resend-api-key
   ```

4. **Start the development environment**

   ```bash
   # Start PostgreSQL database
   docker compose up -d

   # Install dependencies
   npm install

   # Run migrations
   npm run ace migration:run

   # Start the development server
   npm run dev
   ```

5. **Access the application**
   - Reach the development server at http://localhost:3333

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

Panache is licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE). This means that if you modify and use this software, you must:

- Make the complete source code available to any network user
- Include the original license and copyright notice
- State significant changes made to the software
- License any derivative works under AGPL-3.0
