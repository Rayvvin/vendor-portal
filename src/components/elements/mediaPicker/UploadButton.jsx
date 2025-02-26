// UploadButton.js
import React from "react";
import { Button } from "@mui/material";
import { useDataProvider, useRefresh } from "react-admin";

const UploadButton = ({ onUploadSuccess }) => {
  const dataProvider = useDataProvider();
  const refresh = useRefresh();

  const handleUpload = (event) => {
    const files = event.target.files;
    const formData = new FormData();

    formData.append("file", files[0]); // Adjust for multiple files if needed

    dataProvider
      .create(
        "media",
        { data: formData },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then(() => {
        refresh();
        if (onUploadSuccess) onUploadSuccess();
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <Button variant="outlined" component="label">
      Upload Image
      <input type="file" hidden onChange={handleUpload} />
    </Button>
  );
};

export default UploadButton;
