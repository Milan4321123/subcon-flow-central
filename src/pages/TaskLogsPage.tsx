import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProjectContext } from "../context/ProjectContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { formatDistanceToNow } from "date-fns";

const TaskLogsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { logs, workers } = useProjectContext();
  const taskLogs = logs
    .filter((log) => log.taskId === id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6 p-4">
      <Link to="/tasks" className="text-sm text-blue-500 hover:underline">&larr; Back to Tasks</Link>
      <h1 className="text-2xl font-bold">Logs for Task {id}</h1>
      {taskLogs.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No work logs have been uploaded for this task.</p>
          </CardContent>
        </Card>
      ) : (
        taskLogs.map((log) => {
          const worker = workers.find((w) => w.id === log.workerId);
          return (
            <Card key={log.id} className="mb-4">
              <CardHeader>
                <CardTitle>
                  {worker?.name || "Unknown Worker"} &middot; {formatDistanceToNow(new Date(log.timestamp))} ago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img src={log.photoUrl} alt="Work evidence" className="max-h-40 mb-2 rounded" />
                <p><strong>Original:</strong> {log.statusTextOriginal}</p>
                <p><strong>Translated:</strong> {log.statusTextTranslated}</p>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default TaskLogsPage;
