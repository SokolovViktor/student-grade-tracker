import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForms.jsx';
import StudentHome from './components/StudentHome.jsx';
import TeacherHome from './components/TeacherHome.jsx';
import Navbar from './components/Navbar.jsx';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginForm />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={user?.role === 'teacher' ? <TeacherHome /> : <StudentHome />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;