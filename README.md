# 🔐 Face Recognition Attendance Admin System

A comprehensive web-based admin panel for managing face recognition-based attendance systems. Built with React and modern web technologies to provide a seamless experience for administrators to manage students, track attendance, and analyze data.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 👥 Student Management
- Add, edit, and delete student records
- Upload and manage student profile photos
- Bulk import/export student data via Excel
- Advanced search and filtering capabilities

### 📊 Attendance Tracking
- Real-time face recognition-based attendance
- View attendance records with detailed timestamps
- Generate attendance reports (daily, weekly, monthly)
- Export attendance data to Excel/PDF formats

### 📈 Analytics & Reports
- Interactive charts and graphs for attendance analysis
- Student-wise attendance statistics
- Class-wise performance metrics
- Downloadable reports in multiple formats

### 🎛️ Admin Dashboard
- Comprehensive overview of system statistics
- Real-time attendance monitoring
- Quick access to recent activities
- System health and performance metrics

### 🔒 Security & Authentication
- Secure admin login system
- Role-based access control
- Session management
- Data encryption and protection

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Material-UI (MUI)** - Comprehensive UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Chart.js & Recharts** - Data visualization
- **Axios** - HTTP client for API calls

### Face Recognition
- **Face-API.js** - JavaScript face recognition library
- **React Webcam** - Camera integration

### Development Tools
- **CRACO** - Create React App Configuration Override
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS post-processing
- **Autoprefixer** - CSS vendor prefixing

### Additional Libraries
- **Date-fns** - Date manipulation utilities
- **File-saver** - Client-side file downloading
- **EmailJS** - Email integration
- **XLSX** - Excel file processing

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** with camera access
- **Backend API** (for full functionality)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishwabhishek/Admin_FaceRecogniton.git
   cd Admin_FaceRecogniton
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_FACE_API_MODEL_URL=/models
REACT_APP_EMAIL_SERVICE_ID=your_service_id
REACT_APP_EMAIL_TEMPLATE_ID=your_template_id
REACT_APP_EMAIL_PUBLIC_KEY=your_public_key
```

### API Configuration

Update the API endpoints in your configuration files to match your backend server:

- Base URL for API calls
- Authentication endpoints
- File upload endpoints
- Face recognition model paths

## 🎯 Usage

### Starting the Application

1. **Development Mode**
   ```bash
   npm start
   ```
   Runs the app in development mode on `http://localhost:3000`

2. **Windows Development** (with legacy OpenSSL support)
   ```bash
   npm run start:win
   ```

3. **Production Build**
   ```bash
   npm run build
   ```
   Creates an optimized production build

### Key Features Usage

1. **Student Registration**
   - Navigate to Students section
   - Click "Add Student" 
   - Fill in student details and capture/upload photo
   - Save student record

2. **Attendance Monitoring**
   - Go to Attendance Dashboard
   - Enable camera for real-time recognition
   - Monitor attendance as students are recognized
   - Generate reports as needed

3. **Data Export**
   - Select desired date range
   - Choose export format (Excel/PDF)
   - Download generated report

## 📁 Project Structure

```
adminFaceReco/
├── public/
│   ├── index.html
│   ├── models/           # Face recognition models
│   └── assets/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Main page components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── services/        # API service functions
│   ├── context/         # React context providers
│   ├── assets/          # Images, icons, etc.
│   └── styles/          # CSS and styling files
├── build/               # Production build output
├── config-overrides.js  # CRACO configuration
├── craco.config.js      # CRACO configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

## 🔌 API Integration

This frontend application requires a backend API for full functionality. Key API endpoints include:

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/profile` - Get admin profile

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/reports` - Generate reports



## 🤝 Contributing

We welcome contributions to improve the Face Recognition Attendance Admin System!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow React best practices and hooks patterns
- Use TypeScript for type safety (if applicable)
- Write unit tests for critical components
- Follow the existing code style and conventions
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Face-API.js for face recognition capabilities
- Material-UI team for the excellent component library
- React community for the amazing ecosystem
- All contributors and users of this project

## 📞 Support

For support, email vishwakarmabhishek2004@gmail.com or create an issue on GitHub.

## 🚀 Deployment

### Development Deployment
```bash
npm start
```

### Production Deployment
```bash
npm run build
# Deploy the build folder to your web server
```

### Docker Deployment (if applicable)
```bash
# Add Docker configuration if needed
docker build -t face-recognition-admin .
docker run -p 3000:3000 face-recognition-admin
```

---

**Made with ❤️ for modern attendance management systems**
# Admin_FaceRecogniton

