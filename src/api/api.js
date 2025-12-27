const STORAGE_KEY = "task_tracker_data";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getLocalData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setLocalData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const taskApi = {
  fetchTasks: async () => {
    await delay(400);
    return getLocalData();
  },

  createTask: async (task) => {
    await delay(300);
    const tasks = getLocalData();
    const newTask = { ...task, id: crypto.randomUUID(), status: "pending" };
    tasks.push(newTask);
    setLocalData(tasks);
    return newTask;
  },

  updateTask: async (updatedTask) => {
    await delay(300);
    const tasks = getLocalData();
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      setLocalData(tasks);
      return updatedTask;
    }
    throw new Error("Task not found");
  },

  deleteTask: async (id) => {
    await delay(300);
    const tasks = getLocalData();
    const filtered = tasks.filter((t) => t.id !== id);
    setLocalData(filtered);
    return id;
  },
};
