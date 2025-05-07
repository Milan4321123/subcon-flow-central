
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TasksPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">Manage project tasks and assignments.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tasks Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Tasks module will be implemented in future sprints.</p>
          <p className="text-muted-foreground mt-2">
            This module will allow you to create tasks, assign them to workers, and track progress.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksPage;
