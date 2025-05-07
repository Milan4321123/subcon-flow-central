
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ActivitiesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
        <p className="text-muted-foreground">Track and manage your lead interactions and follow-ups.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Activities Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Activities module will be implemented in future sprints.</p>
          <p className="text-muted-foreground mt-2">
            This module will allow you to track phone calls, emails, and meetings with your leads.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitiesPage;
