import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";
// import { useProjectContext } from "../context/ProjectContext";
// import { Link } from "react-router-dom";

const WorkerTasksPage = () => {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Your Tasks</h1>
      <p className="text-muted-foreground">Click a task to view details and log your work.</p>

      {/* TODO: fetch tasks assigned to the current worker and list in a table */}
      <Card>
        <CardHeader>
          <CardTitle>No tasks assigned yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Once tasks are assigned, they will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerTasksPage;
