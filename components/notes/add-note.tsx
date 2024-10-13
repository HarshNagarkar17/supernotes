import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface Props {
  handleSetNewNote: (title: string, content: string) => void;
  newNote: { title: string; content: string };
  addNote: () => void;
  isSubmitting: boolean;
}

const AddNote = ({
  handleSetNewNote,
  newNote,
  addNote,
  isSubmitting,
}: Props) => {
  const isFormValid =
    newNote.content.trim() !== "" && newNote.title.trim() !== "";

  const handleAddNewNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) addNote();
  };

  return (
    <Card className="mb-4 bg-blue-500 text-white hover:bg-blue-600 transition-colors ">
      <CardHeader>
        <CardTitle className="flex items-center">
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Note
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleAddNewNote}>
        <CardContent>
          <Input
            placeholder="Note Title"
            className="mb-2 bg-white/20 border-white/30 placeholder-white/70"
            value={newNote.title}
            name="title"
            onChange={(e) => handleSetNewNote(e.target.name, e.target.value)}
          />
          <Textarea
            placeholder="Note Content"
            className="bg-white/20 border-white/30 placeholder-white/70"
            rows={3}
            name="content"
            value={newNote.content}
            onChange={(e) => handleSetNewNote(e.target.name, e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-white text-blue-500 hover:bg-blue-50 cursor-pointer"
            disabled={!isFormValid}
            type="submit"
          >
            {isSubmitting ? "Adding note..." : "Add Note"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddNote;
