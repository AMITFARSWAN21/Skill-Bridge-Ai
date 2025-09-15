# 🚀 Skill-Bridge AI

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0+-6DB33F?style=flat&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python&logoColor=white)](https://python.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=flat&logo=mysql&logoColor=white)](https://mysql.com/)

**Skill-Bridge AI** is a comprehensive full-stack platform that revolutionizes career development through AI-powered resume analysis, intelligent job matching, personalized study questions, and dynamic learning roadmap generation.

## ✨ Features

### 🎯 Core Capabilities
- **AI-Powered Resume Analysis** - Get detailed ATS scores, match percentages, and actionable improvement suggestions
- **Smart Job Matching** - Discover relevant opportunities based on your profile and skills
- **Personalized Learning Roadmaps** - AI-generated study paths tailored to your career goals
- **Interactive Study Questions** - Topic-specific questions to enhance your learning journey
- **Secure Authentication** - JWT-based authentication with HTTP-only cookies
- **Responsive Design** - Seamless experience across desktop and mobile devices

### 🛡️ Security Features
- JWT token-based authentication
- HTTP-only cookie storage
- OTP verification system
- Password reset functionality
- Role-based access control

## 🏗️ Architecture

Skill-Bridge AI follows a modern microservices architecture with three main components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │ Spring Boot API │    │  Python AI      │
│   (Port 3000)    │◄──►│   (Port 8080)   │◄──►│  (Port 8000)    │
│                 │    │                 │    │                 │
│ • User Interface│    │ • Authentication│    │ • Resume Analysis│
│ • Dashboard     │    │ • Profile Mgmt  │    │ • Gemini API    │
│ • File Upload   │    │ • Data Storage  │    │ • Job Matching  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
skillbridge/
├── 🌐 frontend/              # React Frontend Application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # CSS/Tailwind styles
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── ⚙️ backend/               # Spring Boot Backend API
│   ├── src/main/java/com/authify/
│   │   ├── controller/      # REST API controllers
│   │   ├── entity/          # JPA entities & database models
│   │   ├── io/              # DTOs for requests/responses
│   │   ├── repository/      # JPA repositories
│   │   ├── service/         # Business logic layer
│   │   └── utils/           # JWT utilities & helpers
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── static/
│   ├── pom.xml
│   └── README.md
│
├── 🤖 python-service/        # AI-Powered Analysis Service
│   ├── app.py               # Flask application entry point
│   ├── gemini_analysis.py   # AI resume analysis logic
│   ├── pdf_parser.py        # PDF text extraction
│   ├── job_suggester.py     # Job matching algorithms
│   ├── models.py            # Response data models
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
│
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **Java** (JDK 17 or higher)
- **Python** (3.8 or higher)
- **MySQL** (8.0 or higher)
- **Git**

### 🛠️ Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/skillbridge-ai.git
cd skillbridge-ai
```

#### 2. 🗄️ Database Setup
```sql
-- Create MySQL database
CREATE DATABASE skillbridge_db;

-- Update backend/src/main/resources/application.properties with your DB credentials
spring.datasource.url=jdbc:mysql://localhost:3306/skillbridge_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

#### 3. 🤖 Python AI Service Setup
```bash
cd python-service

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env and add your Gemini API key:
# GEMINI_API_KEY=your_gemini_api_key_here

# Start the service
python app.py
```
🌐 **Service runs at:** `http://127.0.0.1:8000`

#### 4. ⚙️ Spring Boot Backend Setup
```bash
cd ../backend

# Install dependencies and run
./mvnw clean install
./mvnw spring-boot:run

# On Windows, use:
# mvnw.cmd clean install
# mvnw.cmd spring-boot:run
```
🌐 **API runs at:** `http://localhost:8080/api/v1.0`

#### 5. 🌐 React Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```
🌐 **Frontend runs at:** `http://localhost:3000`

## 📋 API Documentation

### 🔐 Authentication Endpoints
```http
POST /api/v1.0/auth/login          # User login
POST /api/v1.0/auth/register       # User registration
POST /api/v1.0/auth/logout         # User logout
POST /api/v1.0/auth/send-otp       # Send OTP for verification
POST /api/v1.0/auth/verify-otp     # Verify OTP
POST /api/v1.0/auth/resend-otp     # Resend OTP
POST /api/v1.0/auth/reset-password # Password reset
```

### 👤 Profile Management
```http
GET  /api/v1.0/profile            # Get user profile
POST /api/v1.0/profile            # Update user profile
GET  /api/v1.0/user/role/{email}  # Get user role by email
```

### 📄 Resume Analysis
```http
POST /api/v1.0/resume/analyze     # Analyze resume with AI
GET  /api/v1.0/resume/analyses    # Get all user analyses
```

### 🎯 AI Features
```http
POST /api/v1.0/ai/questions       # Generate study questions
POST /api/v1.0/ai/roadmap         # Generate learning roadmap
```

### 🤖 Python AI Service
```http
POST /analyze                     # Resume analysis endpoint
```

**Request Example:**
```json
{
  "resume": "base64_encoded_pdf_data",
  "jobDescription": "Software Engineer position requiring..."
}
```

**Response Example:**
```json
{
  "atsScore": 85,
  "matchPercentage": 78,
  "suggestions": [
    "Add more relevant keywords from the job description",
    "Improve formatting consistency",
    "Include quantifiable achievements"
  ],
  "jobMatches": [
    {
      "title": "Senior Software Engineer",
      "company": "TechCorp Inc.",
      "location": "San Francisco, CA"
    }
  ]
}
```

## 🔧 Technology Stack

### Frontend
- **React 18+** - Modern UI library
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing

### Backend
- **Java 17+** - Programming language
- **Spring Boot 3+** - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Data persistence
- **MySQL** - Relational database
- **JWT** - JSON Web Tokens for auth
- **Lombok** - Reduce boilerplate code
- **Maven** - Dependency management

### AI Service
- **Python 3.8+** - Programming language
- **Flask** - Lightweight web framework
- **Google Gemini API** - AI/ML processing
- **PyMuPDF** - PDF text extraction
- **Requests** - HTTP library
- **Python-dotenv** - Environment management

## 🔄 Development Workflow

1. **Start all services** in the correct order:
   ```bash
   # Terminal 1 - Python AI Service
   cd python-service && python app.py
   
   # Terminal 2 - Spring Boot Backend
   cd backend && ./mvnw spring-boot:run
   
   # Terminal 3 - React Frontend
   cd frontend && npm start
   ```

2. **Access the application** at `http://localhost:3000`

3. **API testing** available at `http://localhost:8080/api/v1.0`

## 🔒 Environment Configuration

### Backend Configuration
Create `backend/src/main/resources/application.properties`:
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/skillbridge_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

# JWT Configuration
app.jwtSecret=mySecretKey
app.jwtExpirationInMs=86400000

# Server Configuration
server.port=8080
```

### Python Service Configuration
Create `python-service/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_ENV=development
PORT=8000
```


