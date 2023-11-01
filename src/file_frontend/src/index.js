import { file_backend } from "../../declarations/file_backend";


async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (file) {
    // Validate file name
    const fileName = file.name;
    // You may want to sanitize the fileName if needed before sending it to the backend

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/uploadFile", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again later.");
    }
  } else {
    alert("Please select a file to upload.");
  }
}

async function getAllFiles() {
  try {
    const response = await fetch("/api/getAllFiles");
    const data = await response.json();

    if (data.status) {
      const fileList = document.getElementById("fileList");
      fileList.innerHTML = "";
      data.data.forEach(({ uuid, fileName }) => {
        const listItem = document.createElement("li");
        listItem.textContent = `UUID: ${uuid}, File Name: ${fileName}`;
        fileList.appendChild(listItem);
      });
    } else {
      alert("Failed to fetch files.");
    }
  } catch (error) {
    console.error("Error fetching files:", error);
    alert("Error fetching files. Please try again later.");
  }
}