import React from "react";
import { useNavigate } from "react-router-dom";

function PageHeader({ title, description }) {

  const navigate = useNavigate();

  return (
    <div className="page-header">

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

    </div>
  );
}

export default PageHeader;