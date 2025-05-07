
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">View insights and analytics about your business.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Reports Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Reports module will be implemented in future sprints.</p>
          <p className="text-muted-foreground mt-2">
            This module will provide insights into lead conversion rates, project profitability, and worker utilization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
