# My Spring Boot Application

This is a simple Spring Boot application that serves as a starting point for building web applications.

## Project Structure

```
my-springboot-app
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── SpringBootApplication.java
│   │   └── resources
│   │       ├── application.properties
│   │       └── static
│   │           └── index.html
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── SpringBootApplicationTests.java
├── mvnw
├── mvnw.cmd
└── pom.xml
```

## Prerequisites

- Java 11 or higher
- Maven

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-springboot-app
   ```

2. Build the project:
   ```
   ./mvnw clean install
   ```

3. Run the application:
   ```
   ./mvnw spring-boot:run
   ```

4. Open your browser and navigate to `http://localhost:8080` to see the application in action.

## Usage

This application serves a static HTML page located at `src/main/resources/static/index.html`. You can modify this file to change the landing page content.

## Running Tests

To run the tests, use the following command:
```
./mvnw test
```

## License

This project is licensed under the MIT License.