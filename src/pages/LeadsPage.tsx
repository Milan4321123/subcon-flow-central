
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, MoreHorizontalIcon, FilterIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    company: "ABC Construction",
    email: "john@abcconstruction.com",
    phone: "+1 (555) 123-4567",
    status: "new",
    source: "Website Inquiry",
    created: "2025-04-28",
    nextFollowUp: "2025-05-10",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "Johnson Builders",
    email: "sarah@johnsonbuilders.com",
    phone: "+1 (555) 987-6543",
    status: "contacted",
    source: "Referral",
    created: "2025-04-25",
    nextFollowUp: "2025-05-08",
  },
  {
    id: "3",
    name: "Michael Brown",
    company: "Brown & Associates",
    email: "michael@brownassociates.com",
    phone: "+1 (555) 456-7890",
    status: "qualified",
    source: "Trade Show",
    created: "2025-04-20",
  },
  {
    id: "4",
    name: "Emily Davis",
    company: "Davis Properties",
    email: "emily@davisproperties.com",
    phone: "+1 (555) 234-5678",
    status: "lost",
    source: "Cold Call",
    created: "2025-04-15",
  },
  {
    id: "5",
    name: "Robert Wilson",
    company: "Wilson Engineering",
    email: "robert@wilsoneng.com",
    phone: "+1 (555) 876-5432",
    status: "contacted",
    source: "LinkedIn",
    created: "2025-04-22",
    nextFollowUp: "2025-05-12",
  },
];

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Simulating API call with a slight delay
    const timer = setTimeout(() => {
      setLeads(mockLeads);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDelete = (id: string) => {
    setLeads(leads.filter((lead) => lead.id !== id));
    toast({
      title: "Lead deleted",
      description: "The lead has been removed from your list",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Manage and track your potential clients.</p>
        </div>
        <Button className="sm:w-auto w-full">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New Lead
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Status: All
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Statuses</DropdownMenuItem>
              <DropdownMenuItem>New</DropdownMenuItem>
              <DropdownMenuItem>Contacted</DropdownMenuItem>
              <DropdownMenuItem>Qualified</DropdownMenuItem>
              <DropdownMenuItem>Lost</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Your Leads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Source</TableHead>
                  <TableHead className="hidden lg:table-cell">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">
                        <Link to={`/leads/${lead.id}`} className="hover:underline">
                          {lead.name}
                        </Link>
                      </TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell className="hidden md:table-cell">{lead.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{lead.phone}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(lead.status) as any}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{lead.source}</TableCell>
                      <TableCell className="hidden lg:table-cell">{lead.created}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link to={`/leads/${lead.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                            <DropdownMenuItem>Log Activity</DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive" 
                              onClick={() => handleDelete(lead.id)}
                            >
                              Delete Lead
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {leads.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-6">
                          <div className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-muted-foreground"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </div>
                          <p className="text-muted-foreground">Loading leads...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6">
                          <div className="mb-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-muted-foreground"
                            >
                              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                              <line x1="12" y1="11" x2="12" y2="17" />
                              <line x1="9" y1="14" x2="15" y2="14" />
                            </svg>
                          </div>
                          <p className="text-muted-foreground">No leads match your search.</p>
                          <Button variant="outline" size="sm" className="mt-4" onClick={() => setSearchTerm("")}>
                            Clear Search
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsPage;
