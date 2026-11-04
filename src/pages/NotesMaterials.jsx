import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "../components/TeacherSidebar";
import {
  deletePublishedMaterialFile,
  getPublishedMaterialFile,
  savePublishedMaterialFile,
} from "../utils/publishedMaterials";

const materialsStorageKey = "published_teacher_materials";
const maxMaterialSize = 20 * 1024 * 1024;

export default function NotesMaterials() {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [type, setType] = useState("All Types");
  const [showUpload, setShowUpload] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [formError, setFormError] = useState("");
  const [actionError, setActionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const [newMaterial, setNewMaterial] = useState({
    title: "",
    subject: "Mathematics",
    topic: "",
    type: "PDF",
    description: "",
  });

  useEffect(() => {
    let savedTeacher;

    try {
      const storedTeacher = localStorage.getItem("current_teacher");
      savedTeacher = storedTeacher ? JSON.parse(storedTeacher) : null;
    } catch {
      setActionError("Unable to read the saved teacher profile.");
    }

    const teacherIsLoggedIn =
      localStorage.getItem("teacherLoggedIn") !== null &&
      localStorage.getItem("teacherLoggedIn") !== "false";

    if (savedTeacher) {
      setTeacher(savedTeacher);
      try {
        const savedMaterials = JSON.parse(localStorage.getItem(materialsStorageKey) || "[]");
        if (!Array.isArray(savedMaterials)) {
          throw new Error("Published materials must be a list.");
        }
        setMaterials(savedMaterials);
      } catch {
        setActionError("Unable to load saved materials. The published materials record may be corrupted.");
      }
    } else if (teacherIsLoggedIn) {
      setTeacher({
        name: localStorage.getItem("teacherName") || "Teacher",
      });
      try {
        const savedMaterials = JSON.parse(localStorage.getItem(materialsStorageKey) || "[]");
        if (!Array.isArray(savedMaterials)) {
          throw new Error("Published materials must be a list.");
        }
        setMaterials(savedMaterials);
      } catch {
        setActionError("Unable to load saved materials. The published materials record may be corrupted.");
      }
    } else {
      navigate("/teacher-login", { replace: true });
    }
  }, [navigate]);

  if (!teacher) {
    return <div style={{ padding: 24 }}>Loading teacher profile...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("current_teacher");
    localStorage.removeItem("teacherLoggedIn");
    navigate("/teacher-login");
  };

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(search.toLowerCase()) ||
      material.topic.toLowerCase().includes(search.toLowerCase());

    const matchesSubject =
      subject === "All Subjects" || material.subject === subject;

    const matchesType = type === "All Types" || material.type === type;

    return matchesSearch && matchesSubject && matchesType;
  });

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!newMaterial.title.trim()) {
      setFormError("Please enter material title.");
      return;
    }
    if (!selectedFile) {
      setFormError("Select the PDF or material file you want to publish.");
      return;
    }
    if (selectedFile.size > maxMaterialSize) {
      setFormError("The material file must be 20 MB or smaller.");
      return;
    }
    if (newMaterial.type === "PDF" && selectedFile.type !== "application/pdf") {
      setFormError("Choose a PDF file when the material type is PDF.");
      return;
    }

    setIsSaving(true);
    setFormError("");
    const materialId = `material-${globalThis.crypto?.randomUUID?.() || Date.now()}`;
    const material = {
      id: materialId,
      title: newMaterial.title.trim(),
      subject: newMaterial.subject,
      className: `Class ${teacher.class || 6}th`,
      type: newMaterial.type,
      topic: newMaterial.topic.trim() || "General",
      description: newMaterial.description.trim(),
      fileName: selectedFile.name,
      fileType: selectedFile.type || "application/octet-stream",
      uploaded: "Just now",
      icon:
        newMaterial.type === "PDF"
          ? "📕"
          : newMaterial.type === "Video"
            ? "🎥"
            : newMaterial.type === "Worksheet"
              ? "📝"
              : "📘",
    };

    try {
      await savePublishedMaterialFile(materialId, selectedFile);
      const updatedMaterials = [material, ...materials];
      localStorage.setItem(materialsStorageKey, JSON.stringify(updatedMaterials));
      setMaterials(updatedMaterials);
    } catch (error) {
      try {
        await deletePublishedMaterialFile(materialId);
      } catch {
        // Keep the original save error visible; a partially saved orphan is not listed as published.
      }
      setFormError(error.message || "Unable to save the material. Please try again.");
      setIsSaving(false);
      return;
    }

    setNewMaterial({
      title: "",
      subject: "Mathematics",
      topic: "",
      type: "PDF",
      description: "",
    });
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    setShowUpload(false);
    setIsSaving(false);
    alert("Material published successfully!");
  };

  const openMaterial = async (material) => {
    setActionError("");
    try {
      const file = await getPublishedMaterialFile(material.id);
      if (!file) {
        throw new Error("The file for this material is not available. Please upload and publish it again.");
      }
      const fileUrl = URL.createObjectURL(file);
      setPreviewMaterial(material);
      setPreviewUrl(fileUrl);
    } catch (error) {
      setActionError(error.message || "Unable to open this material.");
    }
  };

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
    setPreviewMaterial(null);
  };

  const downloadMaterial = async (material) => {
    setActionError("");
    try {
      const file = await getPublishedMaterialFile(material.id);
      if (!file) {
        throw new Error("The file for this material is not available. Please upload and publish it again.");
      }
      const fileUrl = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = material.fileName || material.title;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 60_000);
    } catch (error) {
      setActionError(error.message || "Unable to download this material.");
    }
  };

  const deleteMaterial = async (material) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this material?"
    );

    if (confirmDelete) {
      try {
        const updatedMaterials = materials.filter((item) => item.id !== material.id);
        localStorage.setItem(materialsStorageKey, JSON.stringify(updatedMaterials));
        await deletePublishedMaterialFile(material.id);
        setMaterials(updatedMaterials);
        setActionError("");
      } catch (error) {
        setActionError(error.message || "Unable to delete this material.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        background: "#F8FAFC",
        color: "#0F172A",
        width: "100%",
      }}
    >
      <TeacherSidebar onLogout={handleLogout} />

      <main
        style={{
          flex: 1,
          marginLeft: "250px",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <header
          style={{
            height: "64px",
            background: "#fff",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700 }}>
              Notes &amp; Study Materials
            </h2>
            <p style={{ fontSize: "11.5px", color: "#64748B" }}>
              Manage and publish learning resources for Class 6th students
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#F1F5F9",
                padding: "6px 12px",
                borderRadius: "20px",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  background: "#059669",
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                👩‍🏫
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#334155",
                }}
              >
                {teacher.name || "Teacher"}
              </span>
            </div>
          </div>
        </header>

        <div
          style={{
            padding: "30px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#fff",
              padding: "20px 24px",
              borderRadius: "14px",
              border: "1px solid #E2E8F0",
            }}
          >
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
                Study Materials Library
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748B",
                  margin: "4px 0 0",
                }}
              >
                Upload, organize and share learning materials with your students.
              </p>
            </div>

            <button
              onClick={() => {
                setFormError("");
                setShowUpload(true);
              }}
              style={{
                background: "#059669",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              + Upload New Material
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "16px",
            }}
          >
            <div style={summaryCardStyle}>
              <div style={{ fontSize: "24px" }}>📚</div>
              <div>
                <span style={summaryLabelStyle}>Total Materials</span>
                <div style={summaryNumberStyle}>{materials.length}</div>
              </div>
            </div>

            <div style={summaryCardStyle}>
              <div style={{ fontSize: "24px" }}>📄</div>
              <div>
                <span style={summaryLabelStyle}>PDF Notes</span>
                <div style={summaryNumberStyle}>
                  {materials.filter((material) => material.type === "PDF").length}
                </div>
              </div>
            </div>

            <div style={summaryCardStyle}>
              <div style={{ fontSize: "24px" }}>📝</div>
              <div>
                <span style={summaryLabelStyle}>Worksheets</span>
                <div style={summaryNumberStyle}>
                  {
                    materials.filter(
                      (material) => material.type === "Worksheet"
                    ).length
                  }
                </div>
              </div>
            </div>

            <div style={summaryCardStyle}>
              <div style={{ fontSize: "24px" }}>🎥</div>
              <div>
                <span style={summaryLabelStyle}>Videos</span>
                <div style={summaryNumberStyle}>
                  {
                    materials.filter((material) => material.type === "Video")
                      .length
                  }
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "16px 20px",
              borderRadius: "14px",
              border: "1px solid #E2E8F0",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="🔍 Search notes, chapters or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1",
                fontSize: "13px",
                outline: "none",
              }}
            />

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={selectStyle}
            >
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
              <option>Social Studies</option>
              <option>Computer</option>
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={selectStyle}
            >
              <option>All Types</option>
              <option>PDF</option>
              <option>Notes</option>
              <option>Worksheet</option>
              <option>Video</option>
            </select>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              overflowX: "auto",
            }}
          >
            {actionError && (
              <div role="alert" style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", padding: "12px 16px", borderRadius: 10, fontSize: 13 }}>
                {actionError}
              </div>
            )}
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <h3 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>
                Published Materials ({filteredMaterials.length})
              </h3>
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
                textAlign: "left",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#F8FAFC",
                    color: "#64748B",
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  <th style={tableHeaderStyle}>Material</th>
                  <th style={tableHeaderStyle}>Subject</th>
                  <th style={tableHeaderStyle}>Class</th>
                  <th style={tableHeaderStyle}>Type</th>
                  <th style={tableHeaderStyle}>Uploaded</th>
                  <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredMaterials.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: "#64748B",
                      }}
                    >
                      <div style={{ fontSize: "30px", marginBottom: "8px" }}>
                        📂
                      </div>
                      <strong>No materials found</strong>
                      <p style={{ fontSize: "12px", margin: "4px 0 0" }}>
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredMaterials.map((material) => (
                    <tr
                      key={material.id}
                      style={{ borderBottom: "1px solid #F1F5F9" }}
                    >
                      <td
                        style={{
                          ...tableCellStyle,
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span style={{ fontSize: "20px" }}>
                          {material.icon}
                        </span>
                        <div>
                          <strong
                            style={{ display: "block", color: "#0F172A" }}
                          >
                            {material.title}
                          </strong>
                          <small style={{ color: "#64748B" }}>
                            {material.topic}
                          </small>
                        </div>
                      </td>
                      <td style={{ ...tableCellStyle, fontWeight: 600 }}>
                        {material.subject}
                      </td>
                      <td style={tableCellStyle}>
                        <span style={classBadgeStyle}>{material.className}</span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={typeBadgeStyle}>{material.type}</span>
                      </td>
                      <td style={{ ...tableCellStyle, color: "#64748B" }}>
                        {material.uploaded}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "center" }}>
                        <button
                          onClick={() => openMaterial(material)}
                          style={actionButtonStyle}
                          title="View"
                          aria-label={`View ${material.title}`}
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => downloadMaterial(material)}
                          style={actionButtonStyle}
                          title="Download"
                          aria-label={`Download ${material.title}`}
                        >
                          ⬇️
                        </button>
                        <button
                          onClick={() => deleteMaterial(material)}
                          style={actionButtonStyle}
                          title="Delete"
                          aria-label={`Delete ${material.title}`}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showUpload && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 300,
            padding: "16px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "440px",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
                Upload Study Material
              </h3>
              <button
                onClick={() => setShowUpload(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
                aria-label="Close upload dialog"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleUpload}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div>
                <label style={formLabelStyle}>Material Title</label>
                <input
                  type="text"
                  placeholder="Example: Fractions – Chapter 4"
                  value={newMaterial.title}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      title: e.target.value,
                    })
                  }
                  style={formInputStyle}
                  required
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div>
                  <label style={formLabelStyle}>Subject</label>
                  <select
                    value={newMaterial.subject}
                    onChange={(e) =>
                      setNewMaterial({
                        ...newMaterial,
                        subject: e.target.value,
                      })
                    }
                    style={{ ...formInputStyle, width: "100%" }}
                  >
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Social Studies</option>
                    <option>Computer</option>
                  </select>
                </div>

                <div>
                  <label style={formLabelStyle}>Material Type</label>
                  <select
                    value={newMaterial.type}
                    onChange={(e) =>
                      setNewMaterial({
                        ...newMaterial,
                        type: e.target.value,
                      })
                    }
                    style={{ ...formInputStyle, width: "100%" }}
                  >
                    <option>PDF</option>
                    <option>Notes</option>
                    <option>Worksheet</option>
                    <option>Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={formLabelStyle}>Chapter / Topic</label>
                <input
                  type="text"
                  placeholder="Example: Fractions"
                  value={newMaterial.topic}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      topic: e.target.value,
                    })
                  }
                  style={formInputStyle}
                />
              </div>

              <div>
                <label style={formLabelStyle}>Description</label>
                <textarea
                  rows="2"
                  placeholder="Write a short description..."
                  value={newMaterial.description}
                  onChange={(e) =>
                    setNewMaterial({
                      ...newMaterial,
                      description: e.target.value,
                    })
                  }
                  style={formInputStyle}
                />
              </div>

              <div>
                <label style={formLabelStyle}>PDF / Material File</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={newMaterial.type === "PDF" ? "application/pdf,.pdf" : ".pdf,image/*,video/*"}
                  onChange={(event) => {
                    setSelectedFile(event.target.files?.[0] || null);
                    setFormError("");
                  }}
                  style={{ ...formInputStyle, width: "100%" }}
                  required
                />
                <small style={{ display: "block", color: "#64748B", marginTop: 4 }}>
                  Required. Maximum file size: 20 MB.
                </small>
                {selectedFile && (
                  <small style={{ display: "block", color: "#047857", marginTop: 4 }}>
                    Selected: {selectedFile.name}
                  </small>
                )}
              </div>
              {formError && (
                <div role="alert" style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", padding: "10px 12px", borderRadius: 8, fontSize: 12 }}>
                  {formError}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "8px",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowUpload(false);
                    setFormError("");
                  }}
                  disabled={isSaving}
                  style={{
                    background: "#E2E8F0",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    background: "#059669",
                    color: "#fff",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {isSaving ? "Publishing..." : "Upload & Publish ✓"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {previewMaterial && previewUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Preview ${previewMaterial.title}`}
          onClick={closePreview}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 400,
            padding: "16px",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{ background: "#fff", borderRadius: 12, width: "min(100%, 1000px)", height: "min(90vh, 800px)", display: "flex", flexDirection: "column", overflow: "hidden" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>
              <strong>{previewMaterial.title}</strong>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => downloadMaterial(previewMaterial)} style={{ background: "#059669", color: "#fff", border: 0, borderRadius: 6, padding: "8px 12px", cursor: "pointer" }}>
                  Download
                </button>
                <button type="button" onClick={closePreview} aria-label="Close preview" style={{ background: "#E2E8F0", border: 0, borderRadius: 6, padding: "8px 12px", cursor: "pointer" }}>
                  Close
                </button>
              </div>
            </div>
            <iframe title={previewMaterial.title} src={previewUrl} style={{ border: 0, flex: 1, width: "100%" }} />
          </div>
        </div>
      )}
    </div>
  );
}

const summaryCardStyle = {
  background: "#fff",
  border: "1px solid #E2E8F0",
  padding: "18px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const summaryLabelStyle = {
  fontSize: "12px",
  color: "#64748B",
  fontWeight: 600,
};

const summaryNumberStyle = {
  fontSize: "20px",
  fontWeight: 800,
};

const selectStyle = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1",
  fontSize: "13px",
  outline: "none",
};

const tableHeaderStyle = {
  padding: "12px 24px",
};

const tableCellStyle = {
  padding: "14px 24px",
};

const classBadgeStyle = {
  background: "#E2E8F0",
  padding: "3px 8px",
  borderRadius: "6px",
  fontSize: "11px",
  fontWeight: 600,
};

const typeBadgeStyle = {
  background: "#DCFCE7",
  color: "#15803D",
  padding: "3px 8px",
  borderRadius: "6px",
  fontSize: "11px",
  fontWeight: 700,
};

const actionButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  marginRight: "8px",
};

const formLabelStyle = {
  fontSize: "12px",
  fontWeight: 600,
  display: "block",
  marginBottom: "4px",
};

const formInputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1",
  fontSize: "13px",
  outline: "none",
};