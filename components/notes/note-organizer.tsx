"use client";
import React, { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import AddNote from "./add-note";
import NoteCard from "./note-card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNote, getNotes } from "@/app/(services)/_notes";
import ProfileBanner from "../profile-banner";
import AuthSessionProvider from "../AuthSessionProvider";

export interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesResponse {
  notes: Note[];
}

const NoteOrganizer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading, isError, data, isPending } = useQuery<
    NotesResponse,
    Error
  >({
    queryFn: getNotes,
    queryKey: ["get-notes"],
  });

  const addNewNoteMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) => createNote(data),
    mutationKey: ["create-note"],
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["get-notes"] });
    },
    onError(error) {
      console.log("failed to add new note", error);
    },
    onSettled() {
      setIsSubmitting(false);
    },
  });

  const addNewNote = () => {
    setIsSubmitting(true);
    addNewNoteMutation.mutate(newNote);
  };

  const handleSetNewNote = (name: string, value: string) => {
    setNewNote((prev) => ({ ...prev, [name]: value }));
  };

  const filteredNotes = useMemo(() => {
    return (
      data?.notes?.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? []
    );
  }, [data?.notes, searchTerm]);

  const memoizedNotes = useMemo(() => {
    return filteredNotes.map((note) => <NoteCard note={note} key={note.id} />);
  }, [filteredNotes]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <AuthSessionProvider>
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              NoteAI
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes..."
                  className="pl-8 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ProfileBanner />
            </div>
          </div>
        </header>
      </AuthSessionProvider>

      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <AddNote
              handleSetNewNote={handleSetNewNote}
              newNote={newNote}
              addNote={addNewNote}
              isSubmitting={isSubmitting}
            />
            {isLoading ? (
              <p>Loading notes...</p>
            ) : isError ? (
              <p>Error loading notes</p>
            ) : (
              memoizedNotes
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NoteOrganizer;
