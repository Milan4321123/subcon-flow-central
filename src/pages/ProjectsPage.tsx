
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Manage your active and upcoming construction projects.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Projects Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Projects module will be implemented in future sprints.</p>
          <p className="text-muted-foreground mt-2">
            This module will allow you to create and manage projects converted from qualified leads.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsPage;
