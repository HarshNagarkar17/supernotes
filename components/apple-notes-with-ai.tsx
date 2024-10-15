"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Trash2,
  Search,
  Menu,
  MessageSquare,
  Send,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function Component() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAIMode, setIsAIMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulating fetching notes from an API
    const fetchedNotes: Note[] = [
      {
        id: "1",
        title: "The Art of Coding",
        content:
          "Coding is more than just writing lines of instructions for a computer to follow—it's a creative process of problem-solving and innovation. At its core, coding involves breaking down complex problems into manageable steps, using logic and precision to create solutions",
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Understanding Database Sharding",
        content: `Database sharding is a method of distributing data across multiple databases to enhance performance, scalability, and reliability. It involves splitting a large dataset into smaller, more manageable pieces, called "shards," which are stored on different servers or nodes`,
        updatedAt: new Date(),
      },
    ];
    setNotes(fetchedNotes);
    setSelectedNote(fetchedNotes[0]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      updatedAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsAIMode(false);
    setIsSidebarOpen(false);
  };

  const updateNote = (id: string, title: string, content: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, content, updatedAt: new Date() } : note
    );
    setNotes(updatedNotes);
    setSelectedNote({
      ...selectedNote!,
      title,
      content,
      updatedAt: new Date(),
    });
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setSelectedNote(updatedNotes[0] || null);
    setIsAIMode(false);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getFakeAIResponse(inputMessage),
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const getFakeAIResponse = (userMessage: string): string => {
    console.log({ userMessage });
    const responses = [
      "That's an interesting point about your note. Can you elaborate?",
      "I've analyzed your note and found some key insights. Would you like to hear them?",
      "Your note reminds me of a similar topic. Shall we explore it further?",
      "I've noticed a pattern in your notes. Would you like me to explain?",
      "Based on your note, here's a suggestion for further research.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <motion.div
        className={`bg-white w-80 p-6 shadow-lg fixed lg:relative inset-y-0 left-0 z-30 transform lg:transform-none lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        initial={false}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Supernotes</h1>
          <button
            onClick={createNote}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            <PlusCircle size={24} />
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <ul className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <motion.li
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => {
                    setSelectedNote(note);
                    setIsAIMode(false);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedNote?.id === note.id
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <h3 className="font-semibold truncate">{note.title}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {note.content}
                  </p>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold flex-1">
            {selectedNote?.title || "No Note Selected"}
          </h2>
          {selectedNote && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAIMode(!isAIMode)}
                className={`text-gray-500 hover:text-gray-700 transition-colors ${
                  isAIMode ? "text-blue-500" : ""
                }`}
              >
                <MessageSquare size={24} />
              </button>
              <button
                onClick={() => deleteNote(selectedNote.id)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={24} />
              </button>
            </div>
          )}
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedNote ? (
              isAIMode ? (
                <motion.div
                  key="ai-mode"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-3/4 p-3 rounded-lg ${
                            message.sender === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Ask about your note..."
                      className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="edit-mode"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    value={selectedNote.title}
                    onChange={(e) =>
                      updateNote(
                        selectedNote.id,
                        e.target.value,
                        selectedNote.content
                      )
                    }
                    className="w-full text-3xl font-bold bg-transparent border-b border-gray-300 pb-2 focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    value={selectedNote.content}
                    onChange={(e) =>
                      updateNote(
                        selectedNote.id,
                        selectedNote.title,
                        e.target.value
                      )
                    }
                    className="w-full h-[calc(100vh-250px)] text-lg bg-transparent resize-none focus:outline-none"
                    placeholder="Start typing your note here..."
                  />
                </motion.div>
              )
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>Select a note or create a new one</p>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
