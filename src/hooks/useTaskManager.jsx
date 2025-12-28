import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { taskApi } from "../api/api";

export function useTaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  // Load initial data
  useEffect(() => {
    async function loadTasks() {
      setLoading(true);
      const data = await taskApi.fetchTasks();
      setTasks(data);
      setLoading(false);
    }
    loadTasks();
  }, []);

  const addTask = async (taskData) => {
    const newTask = await taskApi.createTask(taskData);
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = async (task) => {
    const updated = await taskApi.updateTask(task);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await taskApi.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "done" ? "pending" : "done";
    await editTask({ ...task, status: newStatus });
  };

  // Derived State (Filtered & Sorted)
  const processedTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        // 1. Filter by Status
        if (filter === "Pending") return t.status === "pending";
        if (filter === "Done") return t.status === "done";
        return true;
      })
      .filter((t) => {
        // 2. Filter by Search (Debounced)
        if (!debouncedSearch) return true;
        return t.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      })
      .sort((a, b) => {
        // 3. Sort
        if (sort === "date") return new Date(a.dueDate) - new Date(b.dueDate);
        if (sort === "name") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [tasks, filter, sort, debouncedSearch]);

  return {
    tasks: processedTasks,
    loading,
    actions: {
      addTask,
      editTask,
      deleteTask,
      toggleStatus,
      setFilter,
      setSort,
      setSearch,
    },
    state: { filter, sort, search },
  };
}
