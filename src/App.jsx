import { useState } from "react";

import TaskItem from "./components/TaskItem";
import TaskModal from "./components/TaskModal";
import { useTaskManager } from "./hooks/useTaskManager";
import { CiFilter, CiSearch } from "react-icons/ci";
import { LuArrowUpDown } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";

function App() {
  const { tasks, loading, actions, state } = useTaskManager();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);

  const OPTIONS = [
    { value: "All", label: "All Status" },
    { value: "Pending", label: "Pending" },
    { value: "Done", label: "Completed" },
  ];
  const DateOptions = [
    { value: "date", label: "Date" },
    { value: "name", label: "Name" },
  ];

  const handleOpenAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (editingTask) {
      actions.editTask({ ...editingTask, ...formData });
    } else {
      actions.addTask(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans text-gray-900">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight text-center ">
            Task Tracker
          </h1>
        </header>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <CiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={state.search}
              onChange={(e) => actions.setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 justify-between">
            <div className="relative">
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              >
                <CiFilter size={20} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {OPTIONS.find((o) => o.value === state.filter)?.label}
                </span>
              </div>

              {open && (
                <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {OPTIONS.map((opt) => (
                    <li
                      key={opt.value}
                      onClick={() => {
                        // state.filter(opt.value);
                        actions.setFilter(opt.value);
                        setOpen(false);
                      }}
                      className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative group">
              <div
                onClick={() => setOpens(!opens)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              >
                <LuArrowUpDown size={17} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {DateOptions.find((o) => o.value === state.sort)?.label}
                </span>
              </div>
              {opens && (
                <ul className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {DateOptions.map((opt) => (
                    <li
                      key={opt.value}
                      onClick={() => {
                        actions.setSort(opt.value);
                        setOpens(false);
                      }}
                      className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition active:scale-95"
            >
              <FiPlus size={18} />
              <span className="hidden sm:inline font-medium">Add</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-10 text-gray-400">
              <div class="relative flex justify-center ">
                <div class="w-12 h-12 rounded-full absolute border border-solid border-gray-200"></div>
                <div class="w-12 h-12 rounded-full animate-spin absolute border border-solid border-cyan-500 border-t-transparent"></div>
              </div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <p className="text-gray-500">No tasks found. Try adding one!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={actions.toggleStatus}
                onEdit={handleOpenEdit}
                onDelete={actions.deleteTask}
              />
            ))
          )}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </div>
  );
}

export default App;
