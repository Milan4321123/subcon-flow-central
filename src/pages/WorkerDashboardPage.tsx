import React from "react";
import { useProjectContext } from "../context/ProjectContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const WorkerDashboardPage = () => {
  const {
    workers,
    logs,
    currentWorkerId,
    setCurrentWorkerId,
    projects
  } = useProjectContext();

  // Filter logs for current worker
  const myLogs = logs
    .filter((log) => log.workerId === currentWorkerId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Worker Dashboard</h1>
      <p className="text-muted-foreground">Summary of your tasks and performance.</p>

      <div>
        <label className="font-medium mr-2">You are:</label>
        <select
          className="border rounded p-2"
          value={currentWorkerId}
          onChange={(e) => setCurrentWorkerId(e.target.value)}
        >
          {workers.map((w) => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      <h2 className="text-2xl font-semibold">Your Log Feed</h2>
      {myLogs.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No activity yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You haven’t uploaded any work logs yet.</p>
          </CardContent>
        </Card>
      ) : (
        myLogs.map((log) => (
          <Card key={log.id} className="mb-4">
            <CardHeader>
              <CardTitle>
                <Link
                  to={`/worker/tasks/${log.taskId}`}
                  className="text-blue-600 hover:underline"
                >
                  Task {log.taskId}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img src={log.photoUrl} alt="Work evidence" className="max-h-40 mb-2 rounded" />
              <p><strong>Original:</strong> {log.statusTextOriginal}</p>
              <p><strong>Translated:</strong> {log.statusTextTranslated}</p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(log.timestamp))} ago
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default WorkerDashboardPage;
