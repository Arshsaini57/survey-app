// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Home, BookOpen, Users, Search, Contact, LogOut } from 'lucide-react';
// // import './Navbar.css';

// // const Navbar = () => {
// //   const [searchTerm, setSearchTerm] = useState('');

// //   return (
// //     <div className="navbar-wrapper">
// //       <h1 className="navbar-heading">Cognify</h1>
// //       <div className="navbar-container">
// //         <nav className="navbar">
// //           <Link to="/" className="navbar-link">
// //             <Home className="navbar-icon" size={18} /> Home
// //           </Link>
// //           <Link to="/about" className="navbar-link">
// //             <BookOpen className="navbar-icon" size={18} /> About Us
// //           </Link>
// //           <Link to="/surveys" className="navbar-link">
// //             <BookOpen className="navbar-icon" size={18} /> Surveys
// //           </Link>
// //           <Link to="/contact" className="navbar-link">
// //             <Contact className="navbar-icon" size={18} /> Contact
// //           </Link>
// //           <Link to="/users" className="navbar-link">
// //             <Users className="navbar-icon" size={18} /> Users
// //           </Link>
// //           <div className="navbar-search">
// //             <input
// //               type="text"
// //               placeholder="Search..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="navbar-search-input"
// //             />
// //             <Search className="navbar-search-icon" size={18} />
// //           </div>
// //           <Link to="/Login.js" className="navbar-link logout">
// //             <LogOut className="navbar-icon" size={18} /> LogIn
// //           </Link>
// //         </nav>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Home, BookOpen, Users, Search, Contact, LogOut } from 'lucide-react';
// import './Navbar.css';

// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check authentication status on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token); // Set state based on token presence
//   }, []);

//   return (
//     <div className="navbar-wrapper">
//       <h1 className="navbar-heading">Cognify</h1>
//       <div className="navbar-container">
//         <nav className="navbar">
//           <Link to="/" className="navbar-link">
//             <Home className="navbar-icon" size={18} /> Home
//           </Link>
//           <Link to="/about" className="navbar-link">
//             <BookOpen className="navbar-icon" size={18} /> About Us
//           </Link>
//           <Link to="/surveys" className="navbar-link">
//             <BookOpen className="navbar-icon" size={18} /> Surveys
//           </Link>
//           <Link to="/contact" className="navbar-link">
//             <Contact className="navbar-icon" size={18} /> Contact
//           </Link>
//           <Link to="/users" className="navbar-link">
//             <Users className="navbar-icon" size={18} /> Users
//           </Link>
//           <div className="navbar-search">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="navbar-search-input"
//             />
//             <Search className="navbar-search-icon" size={18} />
//           </div>
//           {isAuthenticated ? (
//             <>
//               <Link to="/dashboard" className="navbar-link logout">
//                 <LogOut className="navbar-icon" size={18} /> Dashboard
//               </Link>
//               <Link to="/create-survey" className="navbar-link logout">
//                 <LogOut className="navbar-icon" size={18} /> Create Survey
//               </Link>
//               <Link to="/edit-survey/1" className="navbar-link logout">
//                 <LogOut className="navbar-icon" size={18} /> Edit Survey
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="navbar-link logout">
//                 <LogOut className="navbar-icon" size={18} /> LogIn
//               </Link>
//               <Link to="/signup" className="navbar-link logout">
//                 <LogOut className="navbar-icon" size={18} /> SignUp
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Users, Search, Contact, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set state based on token presence
  }, []);

  return (
    <div className="navbar-wrapper">
      <h1 className="navbar-heading">Cognify</h1>
      <div className="navbar-container">
        <nav className="navbar">
          <Link to="/" className="navbar-link">
            <Home className="navbar-icon" size={18} /> Home
          </Link>
          <Link to="/about" className="navbar-link">
            <BookOpen className="navbar-icon" size={18} /> About Us
          </Link>
          <Link to="/surveys" className="navbar-link">
            <BookOpen className="navbar-icon" size={18} /> Surveys
          </Link>
          <Link to="/contact" className="navbar-link">
            <Contact className="navbar-icon" size={18} /> Contact
          </Link>
          <Link to="/users" className="navbar-link">
            <Users className="navbar-icon" size={18} /> Users
          </Link>
          <div className="navbar-search">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="navbar-search-input"
            />
            <Search className="navbar-search-icon" size={18} />
          </div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="navbar-link logout">
                <LogOut className="navbar-icon" size={18} /> Dashboard
              </Link>
              <Link to="/create-survey" className="navbar-link logout">
                <LogOut className="navbar-icon" size={18} /> Create Survey
              </Link>
              <Link to="/edit-survey/1" className="navbar-link logout">
                <LogOut className="navbar-icon" size={18} /> Edit Survey
              </Link>
            </>
          ) : (
            <>
              {/* <Link to="/login" className="navbar-link logout">
                <LogOut className="navbar-icon" size={18} /> LogIn
              </Link> */}
              <Link to="/signup" className="navbar-link logout">
                <LogOut className="navbar-icon" size={18} /> SignUp
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
