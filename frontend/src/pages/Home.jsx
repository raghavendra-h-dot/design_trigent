import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import TrigentLogo from "../images/Trigent_Logo_Color-without-tagline.svg";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Redirect to login if no token
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Navigate to /search with query
  const handleSearchRedirect = () => {
    const query = encodeURIComponent(searchQuery.trim());
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 px-3">
      <h1 className="text-center mb-4">
        <img src={TrigentLogo} alt="Trigent Logo" width="650" height="50" />
      </h1>

      {/* ✅ Search Bar */}
      <InputGroup className="mt-3 w-50 w-md-75 w-sm-100">
        <Form.Control
          type="text"
          placeholder="Search images by filename..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchRedirect()}
        />
        <Button variant="primary" onClick={handleSearchRedirect}>
          Search
        </Button>
      </InputGroup>

      {/* ✅ Upload Your Assets Button */}
      <div className="mt-4">
        <Button variant="secondary" onClick={() => navigate("/upload")}>
          Upload your Assets
        </Button>
      </div>
    </div>
  );
};

export default Home;
