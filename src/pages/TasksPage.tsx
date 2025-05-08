import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useProjectContext } from "../context/ProjectContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import { Link } from "react-router-dom";

const TasksPage = () => {
  const { projects, workers } = useProjectContext();
  // Flatten tasks across all projects
  const tasksWithProject = projects.flatMap((project) =>
    project.tasks.map((task) => ({ ...task, projectName: project.name }))
  );

  // Compute log counts per task
  const { logs } = useProjectContext();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">Overview of all project tasks.</p>
      </div>

      {tasksWithProject.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No tasks have been created yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Logs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasksWithProject.map((task) => {
              const assignedNames = task.assignedWorkerIds
                .map((id) => workers.find((w) => w.id === id)?.name)
                .filter(Boolean)
                .join(", ");
              const status = task.completed
                ? "Completed"
                : task.subtasks.length > 0
                ? "In Progress"
                : "Not Started";
              const logCount = logs.filter((l) => l.taskId === task.id).length;
              return (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.projectName}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{assignedNames}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>
                    <Link
                      to={`/tasks/${task.id}/logs`}
                      className="text-blue-600 hover:underline"
                    >
                      {logCount} log{logCount !== 1 ? 's' : ''}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TasksPage;
