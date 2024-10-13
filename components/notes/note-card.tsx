import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Note } from "./note-organizer";
import { Edit, Loader, Trash2 } from "lucide-react";

interface Props {
  note: Note;
  deletingNoteId: string;
  deleteNote: (id: string) => void;
}
const NoteCard = ({ note, deleteNote, deletingNoteId }: Props) => {
  return (
    <Card className="mb-4 bg-white dark:bg-gray-800 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{note.title}</span>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteNote(note.id)}
              disabled={deletingNoteId === note.id}
            >
              {deletingNoteId === note.id ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
          {note.content}
        </p>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
