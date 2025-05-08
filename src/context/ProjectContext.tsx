import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

// Data types
export type Worker = { id: string; name: string };
export type Subtask = {
  id: string;
  title: string;
  dueDate: string;
  assignedWorkerIds: string[];
  completed: boolean;
  hoursWorked: number;
};
export type Task = {
  id: string;
  title: string;
  dueDate: string;
  assignedWorkerIds: string[];
  completed: boolean;
  hoursWorked: number;
  subtasks: Subtask[];
};
export type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  tasks: Task[];
};

interface ProjectContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  workers: Worker[];
  setWorkers: React.Dispatch<React.SetStateAction<Worker[]>>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  // Example static workers, can be replaced with dynamic logic
  const [workers, setWorkers] = useState<Worker[]>([
    { id: uuidv4(), name: "Alice" },
    { id: uuidv4(), name: "Bob" },
    { id: uuidv4(), name: "Charlie" },
  ]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, workers, setWorkers }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjectContext must be used within a ProjectProvider");
  return context;
};