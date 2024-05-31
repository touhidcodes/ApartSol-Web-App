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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleFileUpload = () => {
    if (selectedFiles.length > 0) {
      onFileUpload(selectedFiles);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: "2px dashed #ff793f",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Button
          component="span"
          variant="text"
          startIcon={<CloudUploadIcon />}
          sx={{
            padding: "40px 20px",
          }}
        >
          <Input
            type="file"
            inputProps={{ accept: accept, multiple: uploadType === "multiple" }}
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">{label || "upload image"}</label>
        </Button>
      </Box>
      <Button onClick={handleFileUpload}>Upload</Button>
    </Stack>
  );
};

export default PHFileUploader;
