import { Link } from "react-router-dom";
import useWorkers from "../hooks/useWorkers";

const Employees = () => {
  const { employees, removeWorkers } = useWorkers();

  return (
    <main className="main-container">
      <br />
      {
        <article>
          <h2 className="text-2xl">Employees list</h2>
          {employees?.length ? (
            <div>
              {employees.map((emp, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between mb-2"
                  >
                    <h2>{emp.firstname}</h2>
                    <button
                      onClick={() => removeWorkers(emp._id)}
                      className="bg-slate-200"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No employees to display</p>
          )}
        </article>
      }
      <br />
      <Link to="/" className="underline">
        Home
      </Link>
    </main>
  );
};

export default Employees;
