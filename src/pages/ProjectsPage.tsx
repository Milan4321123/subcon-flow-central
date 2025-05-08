import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useProjectContext } from "../context/ProjectContext";
import { Link } from "react-router-dom";

// Data types
interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
}

const ProjectsPage = () => {
  const { projects, setProjects } = useProjectContext();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", startDate: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.startDate) return;
    setProjects([
      ...projects,
      { id: uuidv4(), name: form.name, description: form.description, startDate: form.startDate, tasks: [] },
    ]);
    setForm({ name: "", description: "", startDate: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your active and upcoming construction projects.</p>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>{showForm ? "Cancel" : "Create Project"}</Button>
      </div>
      {showForm && (
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleCreateProject}>
              <Input
                name="name"
                placeholder="Project Name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
              <Input
                name="startDate"
                type="date"
                placeholder="Start Date"
                value={form.startDate}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                rows={3}
              />
              <Button type="submit" className="w-full">Create</Button>
            </form>
          </CardContent>
        </Card>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No projects yet. Create your first project!
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id} className="block">
              <Card>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Start: {project.startDate}</p>
                  <p>{project.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;