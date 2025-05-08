import React, { useState, FormEvent, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectContext, Task, Subtask } from "../context/ProjectContext";
import { v4 as uuidv4 } from "uuid";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, setProjects, workers } = useProjectContext();
  const project = projects.find((p) => p.id === id);

  // State for new task
  const [taskForm, setTaskForm] = useState({ title: "", dueDate: "", workerIds: [] as string[], hoursWorked: 0 });
  // State for new subtasks per task
  const [subtaskForms, setSubtaskForms] = useState<{
    [taskId: string]: { title: string; dueDate: string; workerIds: string[]; hoursWorked: number };
  }>({});

  if (!project) return <div>Project not found</div>;

  const updateProject = (update: typeof project) => {
    setProjects(projects.map((p) => (p.id === update.id ? update : p)));
  };

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, selectedOptions } = e.target as HTMLSelectElement;
    if (name === "workerIds") {
      const chosen = Array.from(selectedOptions).map((o) => o.value);
      setTaskForm({ ...taskForm, workerIds: chosen });
    } else if (name === "hoursWorked") {
      setTaskForm({ ...taskForm, hoursWorked: Number(value) });
    } else {
      setTaskForm({ ...taskForm, [name]: value });
    }
  };

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!taskForm.title || !taskForm.dueDate) return;
    const newTask: Task = {
      id: uuidv4(),
      title: taskForm.title,
      dueDate: taskForm.dueDate,
      assignedWorkerIds: taskForm.workerIds,
      completed: taskForm.hoursWorked > 0,
      hoursWorked: taskForm.hoursWorked || 0,
      subtasks: []
    };
    updateProject({ ...project, tasks: [...project.tasks, newTask] });
    setTaskForm({ title: "", dueDate: "", workerIds: [], hoursWorked: 0 });
  };

  const handleSubtaskChange = (taskId: string, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, selectedOptions } = e.target as HTMLSelectElement;
    const current = subtaskForms[taskId] || { title: "", dueDate: "", workerIds: [], hoursWorked: 0 };
    if (name === "workerIds") {
      const chosen = Array.from(selectedOptions).map((o) => o.value);
      setSubtaskForms({ ...subtaskForms, [taskId]: { ...current, workerIds: chosen } });
    } else if (name === "hoursWorked") {
      setSubtaskForms({ ...subtaskForms, [taskId]: { ...current, hoursWorked: Number(value) } });
    } else {
      setSubtaskForms({ ...subtaskForms, [taskId]: { ...current, [name]: value, workerIds: current.workerIds } });
    }
  };

  const handleAddSubtask = (taskId: string, e: FormEvent) => {
    e.preventDefault();
    const form = subtaskForms[taskId];
    if (!form?.title || !form.dueDate) return;
    const newSub: Subtask = {
      id: uuidv4(),
      title: form.title,
      dueDate: form.dueDate,
      assignedWorkerIds: form.workerIds,
      completed: form.hoursWorked > 0,
      hoursWorked: form.hoursWorked || 0
    };
    const updatedTasks = project.tasks.map((t) =>
      t.id === taskId ? { ...t, subtasks: [...t.subtasks, newSub] } : t
    );
    updateProject({ ...project, tasks: updatedTasks });
    setSubtaskForms({ ...subtaskForms, [taskId]: { title: "", dueDate: "", workerIds: [], hoursWorked: 0 } });
  };

  return (
    <div className="space-y-6 p-4">
      <Button variant="link" onClick={() => navigate(-1)}>&larr; Back to Projects</Button>
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="text-muted-foreground">{project.description}</p>
      <p className="text-sm">Started: {project.startDate}</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-2 mb-4" onSubmit={handleAddTask}>
            <div className="flex gap-2 flex-wrap">
              <Input name="title" placeholder="Task title" value={taskForm.title} onChange={handleTaskChange} required />
              <Input name="dueDate" type="date" value={taskForm.dueDate} onChange={handleTaskChange} required />
              <Input name="hoursWorked" type="number" placeholder="Hours worked" value={taskForm.hoursWorked || ""} onChange={handleTaskChange} required />
              <select name="workerIds" multiple value={taskForm.workerIds} onChange={handleTaskChange} className="border rounded p-2">
                {workers.map((w) => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
              <Button type="submit">Add Task</Button>
            </div>
          </form>

          {project.tasks.map((task) => (
            <Card key={task.id} className="mt-4">
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                <p>Assigned: {task.assignedWorkerIds.map((id) => workers.find((w) => w.id === id)?.name).join(", ")}</p>

                {/* Subtasks */}
                <div className="mt-4">
                  <h3 className="font-semibold">Subtasks</h3>
                  <ul className="list-disc ml-5">
                    {task.subtasks.map((sub) => (
                      <li key={sub.id}>
                        {sub.title} (Due: {sub.dueDate}) Assigned: {sub.assignedWorkerIds.map((id) => workers.find((w) => w.id === id)?.name).join(", ")}
                      </li>
                    ))}
                  </ul>

                  <form className="space-y-2 mt-2" onSubmit={(e) => handleAddSubtask(task.id, e)}>
                    <div className="flex gap-2 flex-wrap">
                      <Input name="title" placeholder="Subtask title" value={subtaskForms[task.id]?.title || ""} onChange={(e) => handleSubtaskChange(task.id, e)} required />
                      <Input name="dueDate" type="date" value={subtaskForms[task.id]?.dueDate || ""} onChange={(e) => handleSubtaskChange(task.id, e)} required />
                      <Input name="hoursWorked" type="number" placeholder="Hours worked" value={subtaskForms[task.id]?.hoursWorked || ""} onChange={(e) => handleSubtaskChange(task.id, e)} required />
                      <select name="workerIds" multiple value={subtaskForms[task.id]?.workerIds || []} onChange={(e) => handleSubtaskChange(task.id, e)} className="border rounded p-2">
                        {workers.map((w) => (
                          <option key={w.id} value={w.id}>{w.name}</option>
                        ))}
                      </select>
                      <Button type="submit">Add Subtask</Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetailsPage;
