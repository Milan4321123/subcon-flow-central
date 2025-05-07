
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowUpIcon, ArrowDownIcon, PhoneIcon, MailIcon, CalendarIcon } from "lucide-react";

const Dashboard = () => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to SubCon360, your project management hub.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Leads" 
          value="24" 
          description="This month" 
          trend="up" 
          percentage="12%"
        />
        <MetricCard 
          title="Qualified Leads" 
          value="8" 
          description="This month" 
          trend="up" 
          percentage="8%"
        />
        <MetricCard 
          title="Active Projects" 
          value="5" 
          description="In progress" 
          trend="down" 
          percentage="3%"
        />
        <MetricCard 
          title="Workers Assigned" 
          value="12" 
          description="Currently active" 
          trend="up" 
          percentage="5%"
        />
      </div>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Recent Activity</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Follow-ups</CardTitle>
            <CardDescription>Your latest lead interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Activity 
                icon={<PhoneIcon className="h-4 w-4" />}
                title="Call with John Doe"
                company="ABC Construction"
                time="2 hours ago"
                description="Discussed project timeline and budget"
              />
              <Activity 
                icon={<MailIcon className="h-4 w-4" />}
                title="Email sent to Sarah Johnson"
                company="Johnson Builders"
                time="Yesterday"
                description="Sent proposal for new project"
              />
              <Activity 
                icon={<CalendarIcon className="h-4 w-4" />}
                title="Meeting scheduled with Mike Brown"
                company="Brown & Associates"
                time="2 days ago"
                description="Site visit scheduled for next week"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Tasks Due Soon</CardTitle>
            <CardDescription>Upcoming deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Task 
                title="Submit permit application" 
                project="Riverfront Complex" 
                dueDate="Tomorrow"
                priority="high"
              />
              <Task 
                title="Order construction materials" 
                project="Oakwood Heights" 
                dueDate="In 2 days"
                priority="medium"
              />
              <Task 
                title="Schedule electrical inspection" 
                project="Downtown Lofts" 
                dueDate="In 3 days"
                priority="medium"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down";
  percentage: string;
}

const MetricCard = ({ title, value, description, trend, percentage }: MetricCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          {trend === "up" ? (
            <div className="flex items-center text-green-500 text-xs font-medium">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              {percentage}
            </div>
          ) : (
            <div className="flex items-center text-red-500 text-xs font-medium">
              <ArrowDownIcon className="h-3 w-3 mr-1" />
              {percentage}
            </div>
          )}
        </div>
        <div className="mt-2">
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityProps {
  icon: React.ReactNode;
  title: string;
  company: string;
  time: string;
  description: string;
}

const Activity = ({ icon, title, company, time, description }: ActivityProps) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-muted p-2 rounded-full">
        {icon}
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">{title}</p>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-xs text-muted-foreground">{company}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

interface TaskProps {
  title: string;
  project: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

const Task = ({ title, project, dueDate, priority }: TaskProps) => {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };
  
  return (
    <div className="p-3 border rounded-md">
      <div className="flex items-center justify-between mb-1">
        <p className="font-medium">{title}</p>
        <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{project}</p>
      <div className="flex items-center mt-2">
        <CalendarIcon className="h-3 w-3 mr-1 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Due {dueDate}</span>
      </div>
    </div>
  );
};

export default Dashboard;
