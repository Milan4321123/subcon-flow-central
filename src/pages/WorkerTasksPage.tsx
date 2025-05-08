import React, { useState } from "react";
import { useProjectContext } from "../context/ProjectContext";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";

const WorkerTasksPage = () => {
  const { projects, workers } = useProjectContext();
  const [currentWorkerId, setCurrentWorkerId] = useState<string>(workers[0]?.id || "");
  // flatten tasks across all projects
  const allTasks = projects.flatMap((project) =>
    project.tasks.map((t) => ({ ...t, projectName: project.name }))
  );
  const tasks = allTasks.filter((t) => t.assignedWorkerIds.includes(currentWorkerId));

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Your Tasks</h1>
      <p className="text-muted-foreground">Select your name and click a task to log work.</p>

      <div>
        <label className="font-medium mr-2">Worker:</label>
        <select
          value={currentWorkerId}
          onChange={(e) => setCurrentWorkerId(e.target.value)}
          className="border rounded p-2"
        >
          {workers.map((w) => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      {tasks.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No tasks assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You have no tasks assigned.</p>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Link to={`/worker/tasks/${task.id}`} className="text-blue-600 hover:underline">
                    {task.title}
                  </Link>
                </TableCell>
                <TableCell>{task.projectName}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.hoursWorked}</TableCell>
                <TableCell>{task.completed ? "Completed" : "Not Started"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default WorkerTasksPage;
