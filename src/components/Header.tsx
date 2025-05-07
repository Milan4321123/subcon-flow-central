
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { BellIcon, PlusIcon, SearchIcon } from "lucide-react";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-background border-b h-16 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        {!isMobile && (
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-64 rounded-md border bg-background pl-9 pr-4 text-sm focus-visible:outline-none focus-visible:ring-1"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isMobile && (
          <Button size="sm" className="gap-1">
            <PlusIcon className="h-4 w-4" />
            <span>New Lead</span>
          </Button>
        )}
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <BellIcon className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-subcon-primary text-primary-foreground">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
