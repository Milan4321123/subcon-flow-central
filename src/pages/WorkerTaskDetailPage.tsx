import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
// import { useProjectContext } from "../context/ProjectContext";

const WorkerTaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="space-y-6 p-4">
      <Link to="/worker/tasks" className="text-sm text-blue-500 hover:underline">&larr; Back to Your Tasks</Link>
      <h1 className="text-2xl font-bold">Task Details (ID: {id})</h1>
      <p className="text-muted-foreground">Task description and information will appear here.</p>

      {/* TODO: retrieve and display task details, due date, project, assigned workers, and previous logs */}
      <Card>
        <CardHeader>
          <CardTitle>Work Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TODO: list uploaded logs: photo preview, status text, timestamp */}
          <p className="text-muted-foreground">No logs yet. Start by uploading your work log.</p>
        </CardContent>
      </Card>

      <Link to={`/worker/tasks/${id}/logs`}>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Upload Work Log</button>
      </Link>
    </div>
  );
};

export default WorkerTaskDetailPage;
