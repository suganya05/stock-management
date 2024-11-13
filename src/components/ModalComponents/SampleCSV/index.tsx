import React from "react";
import "./SampleCSV.scss";
import Button from "../../Button";

interface ISampleCsv {
  onPickFile: () => void;
  columns: string[];
  onSampleDownload?: any[];
  sampleFileName?: string;
}

const SampleCsv: React.FC<ISampleCsv> = ({
  onPickFile,
  columns,
  onSampleDownload,
  sampleFileName,
}) => {
  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]).join(",") + "\n";
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    return headers + rows;
  };

  const downloadCSV = () => {
    if (onSampleDownload && sampleFileName) {
      const csvContent = convertToCSV(onSampleDownload);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        sampleFileName ? sampleFileName + ".csv" : "sample.csv"
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="sample-csv">
      <h3>Uploading CSV File</h3>
      <p>This parsing system parses and looks for the following structure:</p>
      <table className="csv-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Column Name</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((d, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn-container">
        <Button varient="primary" onClick={onPickFile}>
          Pick a file
        </Button>
        <Button varient="secondary" onClick={downloadCSV}>
          Download sample CSV
        </Button>
      </div>
    </div>
  );
};

export default SampleCsv;
