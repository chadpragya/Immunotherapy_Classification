// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Layout/Header';
// import Footer from './components/Layout/Footer';
// import Home from './pages/Home';
// import About from './pages/About';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Contact from './pages/Contact';
// import ProtectedRoute from './components/Layout/ProtectedRoute';

// function App() {
//   return (
//     <Router>
//       <div className="App font-urbanist">
//         <Header />
//         <main>
//           <Routes>
//             <Route path="/" element={
//               <ProtectedRoute>
//                    <Home />
//                 </ProtectedRoute>
           
//             <Route path="/about" element={<About />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/contact" element={<Contact />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import ProtectedRoute from './components/Layout/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App font-urbanist">
        <Header />
        <main>
          <Routes>
            {/* Protected Route Example */}
            {/* <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            /> */}

            {/* Public Routes */}
               <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
