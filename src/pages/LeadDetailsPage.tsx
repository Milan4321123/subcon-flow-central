
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  CalendarIcon,
  BuildingIcon,
  MapPinIcon,
  UserIcon,
  EditIcon,
  PlusIcon,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "qualified" | "lost";
  source: string;
  created: string;
  nextFollowUp?: string;
  address?: string;
  notes?: string;
  contactPerson?: string;
}

interface Activity {
  id: string;
  type: "email" | "call" | "meeting" | "note";
  date: string;
  subject: string;
  description: string;
}

// Mock data for a single lead
const mockLead: Lead = {
  id: "1",
  name: "John Smith",
  company: "ABC Construction",
  email: "john@abcconstruction.com",
  phone: "+1 (555) 123-4567",
  status: "contacted",
  source: "Website Inquiry",
  created: "2025-04-28",
  nextFollowUp: "2025-05-10",
  address: "123 Main St, Suite 101, Boston, MA 02108",
  notes: "Interested in a commercial renovation project for their office space. Budget is approximately $250,000.",
  contactPerson: "John Smith (CEO)"
};

// Mock activities for the lead
const mockActivities: Activity[] = [
  {
    id: "1",
    type: "email",
    date: "2025-05-05",
    subject: "Initial Inquiry Response",
    description: "Sent information about our services and requested a follow-up call."
  },
  {
    id: "2",
    type: "call",
    date: "2025-05-03",
    subject: "Introduction Call",
    description: "Discussed project requirements and timeline. Client is interested in starting within 2 months."
  },
  {
    id: "3", 
    type: "meeting",
    date: "2025-04-30",
    subject: "Initial Consultation",
    description: "Met with client to discuss their renovation needs. They need approximately 5,000 sq ft renovated."
  },
  {
    id: "4",
    type: "note",
    date: "2025-04-28",
    subject: "Lead Creation",
    description: "Lead created from website inquiry form."
  }
];

const LeadDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lead] = useState<Lead>(mockLead);
  const [activities] = useState<Activity[]>(mockActivities);

  const getStatusBadgeVariant = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return "default";
      case "contacted":
        return "secondary";
      case "qualified":
        return "success";
      case "lost":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "email":
        return <MailIcon className="h-4 w-4" />;
      case "call":
        return <PhoneIcon className="h-4 w-4" />;
      case "meeting":
        return <CalendarIcon className="h-4 w-4" />;
      case "note":
        return <EditIcon className="h-4 w-4" />;
      default:
        return <EditIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/leads">
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{lead.name}</h1>
            <p className="text-muted-foreground">{lead.company}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Log Activity
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Lead Information</CardTitle>
                <Badge variant={getStatusBadgeVariant(lead.status) as any}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <BuildingIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Company:</span>
                  <span className="ml-1 font-medium">{lead.company}</span>
                </div>
                <div className="flex items-center text-sm">
                  <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Contact:</span>
                  <span className="ml-1 font-medium">{lead.contactPerson || lead.name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MailIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Email:</span>
                  <a href={`mailto:${lead.email}`} className="ml-1 font-medium hover:underline">
                    {lead.email}
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Phone:</span>
                  <a href={`tel:${lead.phone}`} className="ml-1 font-medium hover:underline">
                    {lead.phone}
                  </a>
                </div>
                {lead.address && (
                  <div className="flex items-start text-sm">
                    <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Address:</span>
                    <span className="ml-1 font-medium">{lead.address}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center text-sm">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Created:</span>
                  <span className="ml-1 font-medium">{lead.created}</span>
                </div>
                {lead.nextFollowUp && (
                  <div className="flex items-center text-sm">
                    <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Next Follow-up:</span>
                    <span className="ml-1 font-medium">{lead.nextFollowUp}</span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  <span className="text-muted-foreground">Source:</span>
                  <span className="ml-1 font-medium">{lead.source}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{lead.notes || "No notes available."}</p>
              <Button variant="ghost" size="sm" className="mt-4">
                <EditIcon className="h-3 w-3 mr-2" />
                Add Note
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-2/3">
          <Tabs defaultValue="activities" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="activities" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Activity History</h2>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="relative p-6">
                    {activities.length > 0 ? (
                      <div className="space-y-8">
                        {activities.map((activity, index) => (
                          <div key={activity.id} className="relative pl-8">
                            {index < activities.length - 1 && (
                              <div className="absolute left-3.5 top-3 h-full w-px bg-border" />
                            )}
                            <div className="absolute left-0 top-1.5 rounded-full border bg-background p-1.5 text-muted-foreground">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">{activity.subject}</p>
                                <Badge variant="outline" className="text-xs">
                                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                </Badge>
                              </div>
                              <time className="text-xs text-muted-foreground">{activity.date}</time>
                              <p className="mt-2 text-sm">{activity.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No activities recorded yet.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="files" className="min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 rounded-full bg-muted p-6 w-16 h-16 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <path d="M13 2v7h7" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">No files uploaded</h3>
                <p className="text-muted-foreground text-sm mb-4">Upload documents or files related to this lead</p>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="tasks" className="min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 rounded-full bg-muted p-6 w-16 h-16 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                    <path d="m8 12 3 3 6-6" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">No tasks created</h3>
                <p className="text-muted-foreground text-sm mb-4">Create tasks to track work related to this lead</p>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsPage;
