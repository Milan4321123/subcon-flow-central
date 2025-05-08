import React, { useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const WorkerLogUploadPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<File | null>(null);
  const [statusText, setStatusText] = useState("");

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: upload photo and statusText, auto-translate into admin language via API
    // After success, navigate back to task detail
    navigate(-1);
  };

  return (
    <div className="space-y-6 p-4">
      <Button variant="link" onClick={() => navigate(-1)}>&larr; Back</Button>
      <h1 className="text-2xl font-bold">Upload Work Log (Task ID: {id})</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-medium">Photo Evidence</label>
          <Input type="file" accept="image/*" onChange={handlePhotoChange} required />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Status Update</label>
          <Textarea
            placeholder="Describe your work status in your language"
            value={statusText}
            onChange={(e) => setStatusText(e.target.value)}
            required
          />
          <p className="text-sm text-muted-foreground">
            This will be auto-translated for the admin dashboard.
          </p>
        </div>
        <Button type="submit">Submit Log</Button>
      </form>
    </div>
  );
};

export default WorkerLogUploadPage;
