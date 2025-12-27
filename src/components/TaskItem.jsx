import { CiCalendar } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import { FiCheckCircle, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const isDone = task.status === "done";

  return (
    <div
      className={` flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all ${
        isDone ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => onToggle(task)}
          className={`shrink-0 transition-colors ${
            isDone ? "text-green-500" : "text-gray-300 hover:text-blue-500"
          }`}
        >
          {isDone ? <FiCheckCircle size={24} /> : <FaRegCircle size={24} />}
        </button>

        <div className="flex flex-col">
          <span
            className={`font-medium text-gray-800 ${
              isDone ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <CiCalendar size={18} />
            <span>{task.dueDate}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2  ">
        <span
          className={`p-2 text-[0.9rem] rounded-lg  font-semibold transition-all ease-in-out duration-300 ${
            isDone
              ? "bg-green-50 hover:bg-green-100 text-green-800 "
              : "bg-yellow-50 hover:bg-yellow-100 text-yellow-400"
          }`}
        >
          {isDone ? "Completed" : "Pending"}
        </span>
        <button
          onClick={() => onEdit(task)}
          className="p-2  text-blue-600 hover:bg-blue-100 bg-blue-50 rounded-lg transition"
        >
          <FiEdit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-600 hover:bg-red-100 bg-red-50 rounded-lg transition"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}
