export const createNote = async (data: { title: string; content: string }) => {
  const response = await fetch("/api/create-note", {
    method: "POST",
    body: JSON.stringify({ title: data.title, content: data.content }),
  });

  if (!response.ok) throw new Error("failed to create note");

  return await response.json();
};

export const getNotes = async () => {
  const response = await fetch("/api/get-notes", { method: "POST" });

  if (!response.ok) throw new Error("failed to fetch tasks");

  return await response.json();
};

export const deleteNote = async (id: string) => {
  const response = await fetch(`/api/delete-note/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("failed to delete task");
  return await response.json();
};
