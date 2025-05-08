import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjectContext, WorkLog } from "../context/ProjectContext";
import { v4 as uuidv4 } from "uuid";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const WorkerLogEditPage = () => {
  const { id, logId } = useParams<{ id: string; logId: string }>();
  const navigate = useNavigate();
  const { logs, setLogs, currentWorkerId } = useProjectContext();

  const existingLog = logs.find((l) => l.id === logId);
  const [photoUrl, setPhotoUrl] = useState<string>(existingLog?.photoUrl || "");
  const [statusText, setStatusText] = useState<string>(existingLog?.statusTextOriginal || "");

  useEffect(() => {
    if (!existingLog) {
      navigate(-1);
    }
  }, [existingLog, navigate]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPhotoUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!existingLog) return;
    const updatedLog: WorkLog = {
      ...existingLog,
      photoUrl,
      statusTextOriginal: statusText,
      statusTextTranslated: statusText + " (translated)",
      timestamp: new Date().toISOString(),
    };
    setLogs(logs.map((l) => (l.id === logId ? updatedLog : l)));
    navigate(-1);
  };

  return (
    <div className="space-y-6 p-4">
      <Button variant="link" onClick={() => navigate(-1)}>&larr; Back</Button>
      <h1 className="text-2xl font-bold">Edit Work Log</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Photo</CardTitle>
          </CardHeader>
          <CardContent>
            {photoUrl && <img src={photoUrl} alt="Work evidence" className="max-h-40 rounded mb-2" />}
            <Input type="file" accept="image/*" onChange={handlePhotoChange} />
          </CardContent>
        </Card>
        <div className="flex flex-col">
          <label className="font-medium">Status Update</label>
          <Textarea value={statusText} onChange={(e) => setStatusText(e.target.value)} required />
          <p className="text-sm text-muted-foreground">Original will be updated, translation refreshed.</p>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default WorkerLogEditPage;
