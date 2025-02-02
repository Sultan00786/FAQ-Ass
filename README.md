# FAQ Management System

This project is a FAQ Management System built using Node.js, Express, Prisma, and Docker. It allows a multilingual FAQ service where users can create and fetch FAQs in three languages: English (en), Hindi (hi), and French (fr) using the Google Translation API. The application supports language-based FAQ retrieval, allowing users to specify their preferred language when making requests.

To enhance performance and reduce redundant API calls, Redis is implemented for caching frequently requested FAQs. This ensures faster response times for repeated queries. The application is containerized using Docker for seamless deployment and scalability.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- npm (Node Package Manager)

## Configuration

### 1. Clone the Repository

```bash
git clone https://github.com/Sultan00786/FAQ-Ass.git
```

### 2. Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```plaintext
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=8000
GOOGLE_APPLICATION_CREDENTIALS="PATH_TO_GOOGLE_TRANSLATE_KEY"
REDIS_HOST=redis
REDIS_PORT=6379
```

Ensure that you replace `username`, `password`, `database_name`, and `PATH_TO_GOOGLE_TRANSLATE_KEY` with your actual credentials and file path.

## 3. Update `docker-compose.yml`
Modify your `docker-compose.yml` file to include the required volumes:

```yaml
volumes:
  - .:/usr/src/app
  - /usr/src/app/node_modules
  - [YOUR_GOOGLE_TRANSLATE_KEY_PATH]:/usr/src/app/keys
```

Replace `[YOUR_GOOGLE_TRANSLATE_KEY_PATH]` with the actual local path to your Google Translate key file.

## 4. Build Docker Image
Run the following command to build your Docker image in `./` directory:

```bash
docker-compose build
```

This command will build the necessary Docker image for your application.

## 5. Run the Docker Container
Start the Docker container using the following command:

```bash
docker-compose up
```

This will launch your application inside the Docker container.

## Access the Application
Once the container is running, you can access the application at:

```
http://localhost:8000
```

Ensure that all dependencies and configurations are set correctly before running the application.

