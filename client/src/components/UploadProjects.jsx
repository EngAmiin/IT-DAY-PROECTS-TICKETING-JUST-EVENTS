import React, { useState } from "react";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { read, utils } from "xlsx";

import { Code } from "@chakra-ui/react";
export default function UploadProjects() {
  const [fileData, setFileData] = useState(null);

  const handleFileUpload = async (fileWithMeta) => {

    const { file } = fileWithMeta;
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

      const headers = jsonData.shift(); // Remove the header row
      const nonEmptyRows = jsonData.filter((row) => row.length > 0);
      console.log(nonEmptyRows);
      if (nonEmptyRows.length === 0) {
        console.log("Excel data is empty");
        return;
      }
      const projects =
        jsonData.length > 0 &&
        jsonData.map((row) =>
          headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
          }, {})
        );

      setFileData(projects);
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <div>
      <Dropzone
        onChangeStatus={handleFileUpload}
        accept=".xlsx"
        multiple={false}
        maxFiles={1}
        inputContent="Drag and drop an Excel file contains your projects"
      />
      {fileData && (
        <div>
          <h3>Uploaded Products:</h3>
          <Code colorScheme="yellow" children="const data = {data ? a : b}" />
          <pre>{JSON.stringify(fileData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
