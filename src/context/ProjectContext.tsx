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
// Work log entries by workers
export type WorkLog = {
  id: string;
  taskId: string;
  workerId: string;   // which worker created the log
  photoUrl: string;
  statusTextOriginal: string;
  statusTextTranslated: string;
  timestamp: string;
};

interface ProjectContextType {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  workers: Worker[];
  setWorkers: React.Dispatch<React.SetStateAction<Worker[]>>;
  logs: WorkLog[];
  setLogs: React.Dispatch<React.SetStateAction<WorkLog[]>>;
  currentWorkerId: string;
  setCurrentWorkerId: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  // ← sample seed data ↓
  const sampleWorkers: Worker[] = [
    { id: uuidv4(), name: "John Doe" },
    { id: uuidv4(), name: "Jane Smith" }
  ];

  const sampleProjects: Project[] = [
    {
      id: uuidv4(),
      name: "Office Expansion",
      description: "Expand the west wing office space.",
      startDate: "2025-05-01",
      tasks: [
        {
          id: uuidv4(),
          title: "Lay Foundation",
          dueDate: "2025-06-30",
          assignedWorkerIds: [sampleWorkers[0].id],
          completed: false,
          hoursWorked: 0,
          subtasks: [
            {
              id: uuidv4(),
              title: "Dig Trench",
              dueDate: "2025-05-15",
              assignedWorkerIds: [sampleWorkers[1].id],
              completed: true,
              hoursWorked: 5
            }
          ]
        },
        {
          id: uuidv4(),
          title: "Frame Walls",
          dueDate: "2025-07-15",
          assignedWorkerIds: [sampleWorkers[1].id],
          completed: false,
          hoursWorked: 0,
          subtasks: []
        }
      ]
    },
    {
      id: uuidv4(),
      name: "Parking Lot Resurfacing",
      description: "Resurface the main parking lot surface.",
      startDate: "2025-04-15",
      tasks: []
    }
  ];

  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [workers, setWorkers] = useState<Worker[]>(sampleWorkers);
  const [currentWorkerId, setCurrentWorkerId] = useState<string>(workers[0]?.id || "");
  const [logs, setLogs] = useState<WorkLog[]>([]);
  // ↑ end seed data

  return (
    <ProjectContext.Provider
      value={{
        projects, setProjects,
        workers, setWorkers,
        logs, setLogs,
        currentWorkerId, setCurrentWorkerId,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjectContext must be used within a ProjectProvider");
  return context;
};