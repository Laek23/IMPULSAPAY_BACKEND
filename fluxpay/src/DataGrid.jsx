import { Table } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { useState } from "react";

function DataGrid({ data = [], columns = [] }) {
  const [filteredData, setFilteredData] = useState(data);

  return (
    <div className="p-4 bg-light rounded-4 shadow-sm">
      <div style={{ width: "85%", maxWidth: "1100px" }}>
        <SearchBar data={data} onResults={setFilteredData} />
      </div>

      <Table borderless hover responsive className="align-middle">
        <thead>
          <tr className="text-uppercase small">
            {columns.map((columna, index) => (
              <th
                key={index}
                className="fw-bold py-3"
                style={{ color: "#0A1F44" }}
              >
                {columna}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4"
                style={{ color: "#4A6FA5" }}
              >
                No hay datos
              </td>
            </tr>
          ) : (
            filteredData.map((row, index) => (
              <tr key={index} className="border-top">
                {row.map((campo, i) => (
                  <td
                    key={i}
                    className="py-3 fw-medium"
                    style={{ color: "#163172" }}
                  >
                    {typeof campo === "string" &&
                    campo.toLowerCase().includes("pendiente") ? (
                      <span
                        className="badge rounded-pill px-4 py-2"
                        style={{
                          backgroundColor: "#0A1F44",
                          color: "#FFFFFF",
                        }}
                      >
                        {campo}
                      </span>
                    ) : typeof campo === "string" &&
                      campo.toLowerCase().includes("curso") ? (
                      <span
                        className="badge rounded-pill px-4 py-2"
                        style={{
                          backgroundColor: "#1E3A8A",
                          color: "#FFFFFF",
                        }}
                      >
                        {campo}
                      </span>
                    ) : (
                      campo
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default DataGrid;