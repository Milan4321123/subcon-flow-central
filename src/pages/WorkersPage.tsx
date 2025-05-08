import React, { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useProjectContext } from "../context/ProjectContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";

// Workers dashboard showing metrics per worker
const WorkersPage = () => {
  const { projects, workers } = useProjectContext();
  const [baseExp, setBaseExp] = useState<number>(0);

  // flatten tasks and subtasks
  const tasks = projects.flatMap((project) => project.tasks.map((t) => ({ ...t, projectName: project.name })));
  const subtasks = projects.flatMap((project) =>
    project.tasks.flatMap((t) => t.subtasks.map((st) => ({ ...st, projectName: project.name })))
  );

  const handleBaseExpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBaseExp(Number(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workers Dashboard</h1>
        <p className="text-muted-foreground">Overview of each worker's performance metrics.</p>
      </div>

      <div className="flex items-center gap-2">
        <label className="font-medium">Base Experience:</label>
        <Input
          type="number"
          value={baseExp}
          onChange={handleBaseExpChange}
          placeholder="e.g. 5"
          className="w-24"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Worker</TableHead>
            <TableHead>Completed Tasks</TableHead>
            <TableHead>Total Hours</TableHead>
            <TableHead>Experience</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workers.map((worker) => {
            // tasks
            const completedTasks = tasks.filter(
              (t) => t.completed && t.assignedWorkerIds.includes(worker.id)
            ).length;
            const completedSubtasks = subtasks.filter(
              (st) => st.completed && st.assignedWorkerIds.includes(worker.id)
            ).length;
            const totalCompleted = completedTasks + completedSubtasks;
            const totalHoursTasks = tasks
              .filter((t) => t.assignedWorkerIds.includes(worker.id))
              .reduce((sum, t) => sum + t.hoursWorked, 0);
            const totalHoursSubs = subtasks
              .filter((st) => st.assignedWorkerIds.includes(worker.id))
              .reduce((sum, st) => sum + st.hoursWorked, 0);
            const totalHours = totalHoursTasks + totalHoursSubs;
            const experience =
              totalCompleted > 0 ? totalHours / totalCompleted + baseExp : baseExp;

            return (
              <TableRow key={worker.id}>
                <TableCell>{worker.name}</TableCell>
                <TableCell>{totalCompleted}</TableCell>
                <TableCell>{totalHours}</TableCell>
                <TableCell>{experience.toFixed(1)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkersPage;
