
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KnowledgeBasePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground">Access FAQs and documentation.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base Module</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Knowledge Base module will be implemented in future sprints.</p>
          <p className="text-muted-foreground mt-2">
            This module will provide a RAG-powered FAQ system to help you find answers quickly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBasePage;
