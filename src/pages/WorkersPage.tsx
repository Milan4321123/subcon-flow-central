
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WorkersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workers</h1>
        <p className="text-muted-foreground">Manage your workforce and assign them to projects.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Workers Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Workers module will be implemented in future sprints.</p>
          <p className="text-muted-foreground mt-2">
            This module will allow you to manage your workers, their skills, and availability.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkersPage;
