"use client";
import { useState } from "react";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { Box, Button, Input, Stack, Typography } from "@mui/material";

interface IFileUploadButton {
  label?: string;
  accept?: string;
  uploadType?: "single" | "multiple";
  onFileUpload: (files: File[]) => void;
}

const PHFileUploader = ({
  label,
  accept,
  uploadType = "single",
  onFileUpload,
}: IFileUploadButton) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFileUpload(Array.from(files));
    }
  };

  return (
    <Box>
      <Input
        type="file"
        inputProps={{ accept: accept, multiple: uploadType === "multiple" }}
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          {label || "Upload file"}
        </Button>
      </label>
    </Box>
  );
};

export default PHFileUploader;
