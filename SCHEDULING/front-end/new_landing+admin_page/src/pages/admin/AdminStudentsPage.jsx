import React, { useEffect, useState } from "react";

/* -------- API root (change for prod) -------- */
const API = "http://localhost:4000";

const numeric8 = (v) => v.replace(/[^0-9]/g, "").slice(0, 8);

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [sid, setSid] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    fetch(`${API}/schedules/`)
      .then((r) => (r.ok ? r.json() : []))
      .then((schedules) => {
        const uniq = {};
        schedules.forEach((sch) =>
          sch.entries.forEach((e) => {
            const id = e.employee.employeeId;
            uniq[id] = {
              id,
              studentId: id,
              firstName: e.employee.firstName,
              lastName: e.employee.lastName,
              isInternational: false,
              maxHours: 0,
              priority: 0,
              synced: true, // already in DB
            };
          })
        );
        setStudents(Object.values(uniq));
      })
      .catch(() => {}); // ignore if backend down
  }, []);

  /* ---------- add row locally ---------- */
  const handleAdd = (e) => {
    e.preventDefault();
    setStatusMsg("");                           // clear old toast

    const row = {
      id: Date.now().toString(),
      studentId: sid,
      firstName: first.trim(),
      lastName: last.trim(),
      isInternational: false,
      maxHours: 0,
      priority: 0,
      synced: false,                            // pending
    };
    setStudents((prev) => [...prev, row]);
    setFirst("");
    setLast("");
    setSid("");
  };

  const patch = (id, obj) =>
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...obj } : s))
    );

  const fireUpdateAPI = (stu) => {
    fetch(`${API}/update-parameters/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        updates: [
          {
            student_id: stu.studentId,
            max_hours: stu.maxHours,
            f1_status: stu.isInternational,
            priority: stu.priority,
          },
        ],
      }),
    }).catch(() => console.log("update-parameters offline"));
  };

  const submitNew = () => {
    const pending = students.filter((s) => !s.synced);
    if (!pending.length) return alert("No new students to submit.");

    const idsJustSent = pending.map((p) => p.studentId);

    const body = {
      listofstudents: pending.map((s) => ({
        student_id: s.studentId,
        student_email: `${s.studentId}@umb.edu`,
      })),
    };

    fetch(`${API}/admin-form/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        /* mark only those rows we posted */
        setStudents((prev) =>
          prev.map((s) =>
            idsJustSent.includes(s.studentId) ? { ...s, synced: true } : s
          )
        );
        setStatusMsg("✅ New students saved!");
      })
      .catch(() => setStatusMsg("⚠︎ Could not reach backend."));
  };

  return (
    <div className="p-3">
      <h2>Manage Students</h2>

      {/* add form */}
      <form className="row g-2 align-items-end mb-3" onSubmit={handleAdd}>
        <div className="col-sm-3">
          <label className="form-label">First</label>
          <input
            className="form-control"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            required
          />
        </div>
        <div className="col-sm-3">
          <label className="form-label">Last</label>
          <input
            className="form-control"
            value={last}
            onChange={(e) => setLast(e.target.value)}
            required
          />
        </div>
        <div className="col-sm-3">
          <label className="form-label">Student ID</label>
          <input
            className="form-control"
            value={sid}
            onChange={(e) => setSid(numeric8(e.target.value))}
            maxLength={8}
            inputMode="numeric"
            required
          />
        </div>
        <div className="col-sm-3">
          <button className="btn btn-primary w-100">Add (local)</button>
        </div>
      </form>

      {/* submit button */}
      <button
        className="btn btn-success mb-3"
        disabled={!students.some((s) => !s.synced)}
        onClick={submitNew}
      >
        Submit New Students → DB
      </button>

      {statusMsg && <div className="alert alert-info py-2">{statusMsg}</div>}

      {/* table */}
      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Intl?</th>
              <th>Max Hours</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.firstName} {s.lastName}</td>
                <td>
                  {s.synced ? (
                    <span className="badge bg-success">✔︎</span>
                  ) : (
                    <span className="badge bg-danger">📌 Pending</span>
                  )}
                </td>

                <td>
                  <select
                    value={s.isInternational ? "Yes" : "No"}
                    onChange={(e) => {
                      if (!s.synced) return;
                      const intl = e.target.value === "Yes";
                      const capped = Math.min(intl ? 20 : 40, s.maxHours || 0);
                      const row = { ...s, isInternational: intl, maxHours: capped };
                      patch(s.id, row);
                      fireUpdateAPI(row);
                    }}
                    disabled={!s.synced}
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{ width: 80 }}
                    min="0"
                    max={s.isInternational ? 20 : 40}
                    value={s.maxHours}
                    onChange={(e) => {
                      if (!s.synced) return;
                      const row = { ...s, maxHours: Number(e.target.value) };
                      patch(s.id, row);
                      fireUpdateAPI(row);
                    }}
                    disabled={!s.synced}
                  />
                </td>

                <td>
                  <input   
                    type="number"
                    className="form-control form-control-sm"
                    style={{ width: 60 }}
                    min="0"
                    max="5"    
                    value={s.priority}
                    onChange={(e) => {
                      if (!s.synced) return;
                      const row = { ...s, priority: Number(e.target.value) };
                      patch(s.id, row);
                      fireUpdateAPI(row);
                    }}
                    disabled={!s.synced}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
