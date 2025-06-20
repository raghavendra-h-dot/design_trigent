// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Row, Col, Form, Dropdown } from "react-bootstrap";
// import TrigentLogo from "../images/Trigent_Logo_Color-without-tagline.svg";
// import TrigentLogoReversed from "../images/Trigent_Logo_Reversed-without-tagline (1).svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSearch,
//   faMicrophone,
//   faMoon,
//   faSun,
//   faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// const SearchResults = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const initialQuery = new URLSearchParams(location.search).get("q") || "";

//   const [searchQuery, setSearchQuery] = useState(initialQuery);
//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [userInitial, setUserInitial] = useState("U");
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#ffffff";
//     document.body.style.color = theme === "dark" ? "#ffffff" : "#000000";
//   }, [theme]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         const response = await axios.get("http://localhost:5000/upload/home", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const name = response.data.user?.name?.trim();
//         const initial =
//           name && typeof name === "string" ? name.charAt(0).toUpperCase() : "U";
//         setUserInitial(initial);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setUserInitial("U");
//       }
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/upload/images?q=${searchQuery}&timestamp=${Date.now()}`
//         );
//         if (res.data.length === 0) {
//           setMessage("No results found.");
//           setImages([]);
//         } else {
//           setImages(res.data);
//           setMessage("");
//         }
//       } catch (err) {
//         console.error("Error fetching:", err);
//         setMessage("Something went wrong.");
//       }
//     };

//     if (searchQuery) fetchImages();
//   }, [searchQuery]);

//   const handleMicClick = () => {
//     if (!SpeechRecognition) {
//       alert("Speech recognition is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     setIsListening(true);
//     recognition.start();

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setSearchQuery(transcript);
//       setIsListening(false);
//     };

//     recognition.onerror = (event) => {
//       console.error("Mic error:", event.error);
//       setIsListening(false);
//     };

//     recognition.onend = () => setIsListening(false);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault(); // <-- key part for both enter and click
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate("/login");
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   const renderPDFLink = (filePath, fileName) => (
//     <div className="text-center my-3">
//       <a
//         href={filePath}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="btn btn-outline-primary"
//       >
//         View PDF: {fileName}
//       </a>
//     </div>
//   );

//   return (
//     <div
//       className={`container-fluid min-vh-100 ${
//         theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"
//       }`}
//     >
//       {/* Header Row */}
//       <div className="row align-items-center g-3 mt-3 mb-4">
//         {/* Logo */}
//         <div className="col-12 col-md-auto text-center text-md-start">
//           <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
//             <img
//               src={theme === "dark" ? TrigentLogoReversed : TrigentLogo}
//               alt="Trigent"
//               height="45"
//             />
//           </span>
//         </div>

//         {/* Search bar with form */}
//         <div className="col-12 col-md d-flex justify-content-center">
//           <Form onSubmit={handleSearch} className="w-100 w-md-75">
//             <div
//               className="input-group shadow-sm"
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "50px",
//               }}
//             >
//               <Form.Control
//                 type="text"
//                 placeholder="Search images..."
//                 className={`border-0 ps-4 py-2 ${
//                   theme === "dark" ? "bg-dark text-light" : "bg-white"
//                 }`}
//                 style={{ borderRadius: "50px 0 0 50px" }}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="input-group-text bg-transparent border-0"
//                 style={{ borderRadius: 0, cursor: "pointer", color: "#888" }}
//                 title="Search"
//               >
//                 <FontAwesomeIcon icon={faSearch} />
//               </button>
//               <span
//                 className="input-group-text bg-transparent border-0"
//                 style={{
//                   borderRadius: "0 50px 50px 0",
//                   cursor: "pointer",
//                   color: isListening ? "red" : "#888",
//                 }}
//                 onClick={handleMicClick}
//                 title="Voice Search"
//               >
//                 <FontAwesomeIcon icon={faMicrophone} />
//               </span>
//             </div>
//           </Form>
//         </div>

//         {/* Theme & Avatar */}
//         <div className="col-12 col-md-auto d-flex justify-content-center justify-content-md-end gap-3">
//           <button
//             className="btn btn-outline-secondary btn-sm"
//             onClick={toggleTheme}
//           >
//             <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
//           </button>
//           <Dropdown align="end">
//             <Dropdown.Toggle
//               variant="primary"
//               className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center"
//               style={{ width: "40px", height: "40px", border: "none" }}
//             >
//               {userInitial}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={handleLogout}>
//                 <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
//                 Logout
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>

//       {/* Results Section */}
//       {images.length > 0 && (
//         <h5 className="text-center mb-3">
//           Search Results for:{" "}
//           <span className="text-primary">"{searchQuery}"</span>
//         </h5>
//       )}

//       {message && <p className="text-danger text-center">{message}</p>}

//       <Row className="mt-3">
//         {images.map((img) => {
//           const fileUrl = `http://localhost:5000/${img.filepath}`;
//           if (img.filepath.endsWith(".pdf")) {
//             return (
//               <Col key={img.id} xs={12}>
//                 {renderPDFLink(fileUrl, img.filename)}
//               </Col>
//             );
//           }

//           return (
//             <Col key={img.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
//               <div
//                 className="bg-white rounded shadow d-flex align-items-center justify-content-center"
//                 style={{ height: "180px", padding: "10px" }}
//               >
//                 <img
//                   src={fileUrl}
//                   alt={img.filename}
//                   className="img-fluid"
//                   style={{
//                     objectFit: "contain",
//                     maxHeight: "100%",
//                     maxWidth: "100%",
//                   }}
//                 />
//               </div>
//             </Col>
//           );
//         })}
//       </Row>
//     </div>
//   );
// };

// export default SearchResults;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Form, Dropdown } from "react-bootstrap";
import TrigentLogo from "../images/Trigent_Logo_Color-without-tagline.svg";
import TrigentLogoReversed from "../images/Trigent_Logo_Reversed-without-tagline (1).svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMicrophone,
  faMoon,
  faSun,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuery = new URLSearchParams(location.search).get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [userInitial, setUserInitial] = useState("U");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [fileTypeFilter, setFileTypeFilter] = useState("all");

  const fileTypes = [
    { label: "All", value: "all" },
    { label: "Images", value: "image" },
    { label: "Icons", value: "icon" },
    { label: "PDFs", value: "pdf" },
  ];

  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#ffffff";
    document.body.style.color = theme === "dark" ? "#ffffff" : "#000000";
  }, [theme]);

  useEffect(() => {
    setUserInitial("T"); // default name Test User
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/upload/images?q=${searchQuery}&timestamp=${Date.now()}`
        );
        if (res.data.length === 0) {
          setMessage("No results found.");
          setImages([]);
        } else {
          setImages(res.data);
          setMessage("");
        }
      } catch (err) {
        console.error("Error fetching:", err);
        setMessage("Something went wrong.");
      }
    };

    if (searchQuery) fetchImages();
  }, [searchQuery]);

  const handleMicClick = () => {
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Mic error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const renderPDFLink = (filePath, fileName) => (
    <div className="text-center my-3">
      <a
        href={filePath}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline-primary"
      >
        View PDF: {fileName}
      </a>
    </div>
  );

  const filterByType = (file) => {
    const ext = file.filepath?.split(".").pop().toLowerCase();
    if (fileTypeFilter === "image") {
      return ["jpg", "jpeg", "png", "webp", "bmp", "gif"].includes(ext);
    }
    if (fileTypeFilter === "icon") {
      return ["svg", "ico"].includes(ext);
    }
    if (fileTypeFilter === "pdf") {
      return ext === "pdf";
    }
    return true;
  };

  return (
    <div className={`container-fluid min-vh-100 ${theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`}>
      {/* Header */}
      <div className="row align-items-center g-3 mt-3 mb-4">
        <div className="col-12 col-md-auto text-center text-md-start">
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <img
              src={theme === "dark" ? TrigentLogoReversed : TrigentLogo}
              alt="Trigent"
              height="45"
            />
          </span>
        </div>

        {/* Search bar */}
        <div className="col-12 col-md d-flex justify-content-center">
          <Form onSubmit={handleSearch} className="w-100 w-md-75">
            <div className="input-group shadow-sm" style={{ border: "1px solid #ccc", borderRadius: "50px" }}>
              <Form.Control
                type="text"
                placeholder="Search files..."
                className={`border-0 ps-4 py-2 ${theme === "dark" ? "bg-dark text-light" : "bg-white"}`}
                style={{ borderRadius: "50px 0 0 50px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="input-group-text bg-transparent border-0" style={{ borderRadius: 0 }}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <span
                className="input-group-text bg-transparent border-0"
                style={{
                  borderRadius: "0 50px 50px 0",
                  cursor: "pointer",
                  color: isListening ? "red" : "#888",
                }}
                onClick={handleMicClick}
              >
                <FontAwesomeIcon icon={faMicrophone} />
              </span>
            </div>
          </Form>
        </div>

        {/* Avatar & Theme */}
        <div className="col-12 col-md-auto d-flex justify-content-center justify-content-md-end gap-3">
          <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
          </button>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="primary"
              className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px", border: "none" }}
            >
              {userInitial}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* 🔥 FILTER TABS VISIBLE */}
      <div className="d-flex border-bottom px-3 mb-3" style={{ overflowX: "auto" }}>
        {fileTypes.map((type) => (
          <div
            key={type.value}
            onClick={() => setFileTypeFilter(type.value)}
            className={`me-4 pb-2 ${fileTypeFilter === type.value
              ? "fw-bold border-bottom border-3 border-dark"
              : "text-muted"}`}
            style={{ cursor: "pointer", fontSize: "14px" }}
          >
            {type.label}
          </div>
        ))}
      </div>

      {/* Results Header */}
      {images.length > 0 && (
        <h5 className="text-center mb-3">
          Search Results for: <span className="text-primary">"{searchQuery}"</span>
        </h5>
      )}
      {message && <p className="text-danger text-center">{message}</p>}

      {/* Results */}
      <Row className="mt-3">
        {images.filter(filterByType).map((img) => {
          const fileUrl = `http://localhost:5000/${img.filepath}`;
          const ext = img.filepath?.split(".").pop().toLowerCase();

          if (ext === "pdf") {
            return (
              <Col key={img.id} xs={12}>
                {renderPDFLink(fileUrl, img.filename)}
              </Col>
            );
          }

          return (
            <Col key={img.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
              <div className="bg-white rounded shadow d-flex align-items-center justify-content-center" style={{ height: "180px", padding: "10px" }}>
                <img
                  src={fileUrl}
                  alt={img.filename}
                  className="img-fluid"
                  style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SearchResults;

