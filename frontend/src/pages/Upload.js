import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import TrigentLogo from "../images/Trigent_Logo_Color-without-tagline.svg";
import TrigentLogoReversed from "../images/Trigent_Logo_Reversed-without-tagline (1).svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [categories, setCategories] = useState([]);

  const [serviceOptions, setServiceOptions] = useState([
    { label: "AI", value: "AI" },
    { label: "Gen AI", value: "Gen AI" },
    { label: "Automation", value: "Automation" },
  ]);

  const [industryOptions, setIndustryOptions] = useState([
    { label: "T&C", value: "T&C" },
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Healthcare", value: "Healthcare" },
  ]);

  const [categoryOptions, setCategoryOptions] = useState([
    { label: "JPG", value: "JPG" },
    { label: "PNG", value: "PNG" },
    { label: "SVG", value: "SVG" },
    { label: "TIFF", value: "TIFF" },
    { label: "EPS", value: "EPS" },
    { label: "WebP", value: "WebP" },
    { label: "PDF", value: "PDF" },
  ]);

  const [client, setClient] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#ffffff";
    document.body.style.color = theme === "dark" ? "#ffffff" : "#000000";
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select files to upload");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("image", selectedFiles[i]);
    }

    formData.append("services", JSON.stringify(services.map((s) => s.value)));
    formData.append("industries", JSON.stringify(industries.map((i) => i.value)));
    formData.append("category", JSON.stringify(categories.map((c) => c.value)));
    formData.append("client", client);
    formData.append("otherInfo", otherInfo);
    formData.append("description", description);

    try {
      await axios.post("http://localhost:5000/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSelectedFiles(null);
      setUploadMessage("File uploaded successfully");

      setTimeout(() => {
        setUploadMessage("");
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div
      className={`container-fluid min-vh-100 py-4 ${
        theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"
      }`}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5 px-3">
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <img
            src={theme === "dark" ? TrigentLogoReversed : TrigentLogo}
            alt="Trigent"
            height="45"
          />
        </span>
        <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
        </button>
      </div>

      {/* Upload Form */}
      <div
        className="container border rounded-4 p-4 shadow-sm"
        style={{ maxWidth: "700px", backgroundColor: theme === "dark" ? "#1e1e1e" : "#f8f9fa" }}
      >
        <h3 className="mb-4 text-center">Upload Image with Metadata</h3>

        <h5 className="fw-bold mt-3">Assets Belong To</h5>

        {/* <h5 className="fw-bold">Service</h5>
        <CreatableSelect
          isMulti
          options={serviceOptions}
          value={services}
          onChange={(newValue) => setServices(newValue)}
          onCreateOption={(inputValue) => {
            const newOption = { label: inputValue, value: inputValue };
            setServiceOptions([...serviceOptions, newOption]);
            setServices([...services, newOption]);
          }}
          placeholder="Select or create services"
          className="mb-3"
        /> */}

        {/* <h5 className="fw-bold">Industry</h5>
        <CreatableSelect
          isMulti
          options={industryOptions}
          value={industries}
          onChange={(newValue) => setIndustries(newValue)}
          onCreateOption={(inputValue) => {
            const newOption = { label: inputValue, value: inputValue };
            setIndustryOptions([...industryOptions, newOption]);
            setIndustries([...industries, newOption]);
          }}
          placeholder="Select or create industries"
          className="mb-3"
        /> */}

        <h5 className="fw-bold">File Category</h5>
        <CreatableSelect
          isMulti
          options={categoryOptions}
          value={categories}
          onChange={(newValue) => setCategories(newValue)}
          onCreateOption={(inputValue) => {
            const newOption = { label: inputValue, value: inputValue };
            setCategoryOptions([...categoryOptions, newOption]);
            setCategories([...categories, newOption]);
          }}
          placeholder="Select or create file categories"
          className="mb-3"
        />

        <Form.Group className="mb-3">
          <Form.Label>Client</Form.Label>
          <Form.Control value={client} onChange={(e) => setClient(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Other Information</Form.Label>
          <Form.Control value={otherInfo} onChange={(e) => setOtherInfo(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Image</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" onClick={handleUpload}>
            Upload Image
          </Button>
        </div>

        {uploadMessage && (
          <p className="text-success fw-bold mt-3 text-center">{uploadMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
