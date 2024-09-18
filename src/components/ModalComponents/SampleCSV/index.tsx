import React from "react";
import "./SampleCSV.scss";
import Button from "../../Button";

interface ISampleCsv {
  onPickFile: () => void;
  columns: string[];
}

const SampleCsv: React.FC<ISampleCsv> = ({ onPickFile, columns }) => {
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
        <Button varient="secondary">Download sample CSV</Button>
      </div>
    </div>
  );
};

export default SampleCsv;
