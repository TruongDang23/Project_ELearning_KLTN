import { useEffect, useState } from "react"
import { admin } from "api"

export default function MasterDataDashboard() {
  const [data, setData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [currentType, setCurrentType] = useState("")
  const [inputValue, setInputValue] = useState("")

  const loadData = async() => {
    const masterData = await admin.loadMasterdata()
    setData(masterData.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAdd = (type) => {
    setData((prev) => ({
      ...prev,
      [type]: [...prev[type], inputValue]
    }))
    setOpenDialog(false)
    setInputValue("")
  }

  const handleDelete = (type, index) => {
    setData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", padding: "16px", backgroundColor: "#187BCE" }}>
      {Object.keys(data).map((type) => (
        <div key={type} style={{ background: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", padding: "16px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#187BCE" }}>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <div style={{ maxHeight: "320px", overflowY: "auto", border: "1px solid #ccc", borderRadius: "4px", marginTop: "8px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "1.6rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #ccc" }}>Name</th>
                  <th style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #ccc" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data[type].slice(0, 20).map((item, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{item}</td>
                    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                      <button style={{ backgroundColor: "#ff7f7f", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1.6rem" }} onClick={() => handleDelete(type, index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            style={{ marginTop: "8px", width: "100%", backgroundColor: "#187BCE", color: "white", padding: "8px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1.6rem" }}
            onClick={() => {
              setCurrentType(type)
              setOpenDialog(true)
            }}
          >
            + Add {type.slice(0, -1)}
          </button>
        </div>
      ))}

      {openDialog && (
        <>
          {/* Overlay */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 999
            }}
          ></div>

          {/* Popup */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              fontSize: "1.6rem",
              zIndex: 1000
            }}
          >
            <h3 style={{ color: "#187BCE" }}>Add New {currentType.slice(0, -1)}</h3>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Enter new ${currentType.slice(0, -1)}`}
              style={{ width: "100%", padding: "8px", marginTop: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "1.6rem" }}
            />
            <div style={{ marginTop: "8px", textAlign: "right" }}>
              <button
                style={{ marginRight: "8px", padding: "6px 12px", background: "#ccc", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1.6rem" }}
                onClick={() => setOpenDialog(false)}
              >
          Cancel
              </button>
              <button
                style={{ padding: "6px 12px", background: "#187BCE", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1.6rem" }}
                onClick={() => handleAdd(currentType)}
              >
          Add
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
