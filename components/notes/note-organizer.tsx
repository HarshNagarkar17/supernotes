"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const NoteOrganizer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
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
            {/* <ProfileBanner /> */}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto"></div>
      </main>
    </div>
  );
};

export default NoteOrganizer;
