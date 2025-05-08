import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { useProjectContext } from "../context/ProjectContext";
import { formatDistanceToNow } from "date-fns";

const WorkerTaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, logs } = useProjectContext();
  // find task
  const allTasks = projects.flatMap((p) => p.tasks.map((t) => ({ ...t, projectName: p.name })));
  const task = allTasks.find((t) => t.id === id);
  const taskLogs = logs.filter((log) => log.taskId === id);
  if (!task) return <div>Task not found</div>;
  return (
    <div className="space-y-6 p-4">
      <Link to="/worker/tasks" className="text-sm text-blue-500 hover:underline">&larr; Back to Your Tasks</Link>
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-muted-foreground">Task description and information will appear here.</p>
      <p>Project: {task.projectName}</p>
      <p>Due: {task.dueDate}</p>
      <p>Hours allocated: {task.hoursWorked}</p>

      {/* TODO: retrieve and display task details, due date, project, assigned workers, and previous logs */}
      <Card>
        <CardHeader>
          <CardTitle>Work Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {taskLogs.length === 0 ? (
            <p className="text-muted-foreground">No logs yet. Start by uploading your work log.</p>
          ) : (
            <ul className="space-y-4">
              {taskLogs.map((log) => (
                <li key={log.id} className="border p-2 rounded">
                  <img src={log.photoUrl} alt="Work evidence" className="max-h-40 mb-2" />
                  <p><strong>Original:</strong> {log.statusTextOriginal}</p>
                  <p><strong>Translated:</strong> {log.statusTextTranslated}</p>
                  <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(log.timestamp))} ago</p>
                  <Link
                    to={`/worker/tasks/${task.id}/logs/${log.id}/edit`}
                    className="mt-2 inline-block text-blue-500 hover:underline text-sm"
                  >
                    Edit Log
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Link to={`/worker/tasks/${id}/logs`}>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Upload Work Log</button>
      </Link>
    </div>
  );
};

export default WorkerTaskDetailPage;
