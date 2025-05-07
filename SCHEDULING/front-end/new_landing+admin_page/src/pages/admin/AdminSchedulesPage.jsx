// ──────────────────────────────────────────────────────────────
// src/pages/admin/AdminSchedulesPage.jsx
// ──────────────────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin   from "@fullcalendar/daygrid";
import timeGridPlugin  from "@fullcalendar/timegrid";
import interaction     from "@fullcalendar/interaction";

const API = "http://localhost:4000";

/* ---------- 1. colour palette helper ---------- */
const palette = [
  "#2563EB", "#DC2626", "#059669", "#D97706",
  "#9333EA", "#14B8A6", "#F43F5E", "#4B5563",
];
const colorFor = (() => {
  const cache = {};
  return (id) => {
    if (!cache[id]) {
      const idx = Object.keys(cache).length % palette.length;
      cache[id] = palette[idx];
    }
    return cache[id];
  };
})();

/* ---------- 2. helpers to map schedule <‑‑> UI ---------- */
const toGrid = (schedule) => {
  const grid = {};
  schedule.entries.forEach((e) =>
    e.events.forEach((ev) => {
      const d   = new Date(ev.start);
      const key = `${d.getHours()}-${d.getDay()}`;    // "14-1" (Mon 2 pm)
      grid[key] = grid[key] || [];
      grid[key].push(`${e.employee.firstName} ${e.employee.lastName}`.trim());
    })
  );

  const rows=[];
  for (let h=8; h<17; h++){
    rows.push({
      hour:h,
      mon:grid[`${h}-1`]||[],
      tue:grid[`${h}-2`]||[],
      wed:grid[`${h}-3`]||[],
      thu:grid[`${h}-4`]||[],
      fri:grid[`${h}-5`]||[],
    });
  }
  return rows;
};

const rowsToEntries = (rows, employees) => {
  const byName={};
  employees.forEach(e=>{
    const full=`${e.firstName} ${e.lastName}`.trim();
    byName[full]=e;
  });

  const empEvents={};
  rows.forEach(r=>{
    Object.entries({1:r.mon,2:r.tue,3:r.wed,4:r.thu,5:r.fri})
      .forEach(([dow,list])=>{
        list.forEach(name=>{
          const emp=byName[name];
          if(!emp) return;
          const start=new Date();
          start.setHours(r.hour,0,0,0);
          const diff=(dow-start.getDay()+7)%7;
          start.setDate(start.getDate()+diff);
          const end=new Date(start.getTime()+60*60*1000);

          empEvents[emp.employeeId]=empEvents[emp.employeeId]||{
            employee:emp, events:[]
          };
          empEvents[emp.employeeId].events.push({
            start:start.toISOString(), end:end.toISOString()
          });
        });
      });
  });
  return Object.values(empEvents);
};

/* ---------- 3. component ---------- */
export default function AdminSchedulesPage() {
  /* state */
  const [employees, setEmployees] = useState([]);
  const [rows      , setRows]      = useState([]);
  const [fcEvents  , setFcEvents ] = useState([]);
  const [showCal   , setShowCal ]  = useState(true);

  /* controls */
  const [hours, setHours] = useState(120);
  const [staff, setStaff] = useState(2);
  const [k    , setK    ] = useState(3);

  /* load distinct employees (sidebar) */
  useEffect(()=>{
    fetch(`${API}/schedules/`)
      .then(r=> r.ok? r.json():[])
      .then(sch=>{
        const uniq={};
        sch.forEach(s=>s.entries.forEach(e=>uniq[e.employee.employeeId]=e.employee));
        setEmployees(Object.values(uniq));
      })
      .catch(()=>setEmployees([]));
  },[]);

  /* -------------- actions -------------- */
  const generateSchedules = () => {
    const qs = new URLSearchParams({
      employee_ids: employees.map(e=>e.employeeId).join(","),
      total_master_schedule_hours: hours,
      num_schedules_desired: k,
    });
    fetch(`${API}/generate-schedules/?${qs.toString()}`)
      .then(r=> r.ok? r.json():[])
      .then(schedules=>{
        if(!schedules.length){ alert("No schedules returned."); return; }
        const best=schedules[0];
        setRows(toGrid(best));

        /* build FullCalendar events with colour */
        const fc = best.entries.flatMap((entry)=>
          entry.events.map(ev=>({
            title:`${entry.employee.firstName} ${entry.employee.lastName}`,
            start:ev.start,
            end  :ev.end,
            color:colorFor(entry.employee.employeeId),
          }))
        );
        setFcEvents(fc);
      })
      .catch(()=>alert("Backend not reachable – generation failed"));
  };

  const saveSchedule = () => {
    if(!rows.length) return;

    const entries = rowsToEntries(rows, employees);
    const body    = { comment:"Saved from UI", entries };

    fetch(`${API}/save-schedule/`,{
      method:"PUT",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify(body),
    })
      .then(r=>{ if(!r.ok) throw new Error(); return r.json(); })
      .then(()=>alert("Schedule saved to DB"))
      .catch(()=>alert("Save failed"));
  };

  /* -------------- render -------------- */
  return(
    <div className="container-fluid p-4">
      <h2 className="mb-3">Admin – Schedules</h2>

      <div className="row">
        {/* ⬅︎ sidebar */}
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-header">Employees ({employees.length})</div>
            <ul className="list-group list-group-flush" style={{maxHeight:400,overflowY:"auto"}}>
              {employees.map(e=>(
                <li key={e.employeeId} className="list-group-item">
                  <span className="badge me-2" style={{
                    backgroundColor:colorFor(e.employeeId)
                  }}>&nbsp;</span>
                  {e.firstName} {e.lastName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ➡︎ main */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-header d-flex flex-wrap align-items-center gap-2">
              <label>
                Hours/week
                <input type="number" className="form-control form-control-sm ms-1"
                       style={{width:90}} value={hours}
                       onChange={e=>setHours(Number(e.target.value)||0)}/>
              </label>
              <label className="ms-3">
                Employees/shift
                <input type="number" className="form-control form-control-sm ms-1"
                       style={{width:90}} value={staff}
                       onChange={e=>setStaff(Math.max(1,Number(e.target.value)||1))}/>
              </label>
              <label className="ms-3">
                Schedules wanted
                <input type="number" className="form-control form-control-sm ms-1"
                       style={{width:90}} value={k}
                       onChange={e=>setK(Math.max(1,Number(e.target.value)||1))}/>
              </label>

              <button className="btn btn-sm btn-primary ms-3"
                      onClick={generateSchedules}
                      disabled={!employees.length}>
                Generate
              </button>
              <button className="btn btn-sm btn-success ms-2"
                      onClick={saveSchedule}
                      disabled={!rows.length}>
                Save
              </button>
              <button className="btn btn-sm btn-outline-secondary ms-auto"
                      onClick={()=>setShowCal(s=>!s)}
                      disabled={!rows.length}>
                {showCal? "Show table" : "Show calendar"}
              </button>
            </div>

            <div className="card-body">
              {!rows.length
                ? <p className="text-muted">Generate a schedule to see it here.</p>
                : showCal
                  ? (
                    <FullCalendar
                      plugins={[dayGridPlugin,timeGridPlugin,interaction]}
                      initialView="timeGridWeek"
                      headerToolbar={{
                        left:"prev,next today",
                        center:"title",
                        right:"dayGridMonth,timeGridWeek,timeGridDay"
                      }}
                      events={fcEvents}
                      height="auto"
                    />
                  )
                  : (
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>Time</th><th>Mon</th><th>Tue</th>
                            <th>Wed</th><th>Thu</th><th>Fri</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map(r=>(
                            <tr key={r.hour}>
                              <td className="fw-bold">{r.hour}:00</td>
                              <td>{r.mon.join(", ")}</td>
                              <td>{r.tue.join(", ")}</td>
                              <td>{r.wed.join(", ")}</td>
                              <td>{r.thu.join(", ")}</td>
                              <td>{r.fri.join(", ")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
