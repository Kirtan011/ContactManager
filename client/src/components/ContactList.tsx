import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export default function ContactList({ refreshKey }: { refreshKey: number }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "https://contactmanager-8any.onrender.com";

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get<Contact[]>(`${API_URL}/get`); //fetch all contacts from backend
        setContacts(res.data);
      } catch {
        setError("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [refreshKey]);

  //handle Deletion of contact
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setSuccess("Contact deleted successfully");
    } catch {
      setError("Failed to delete contact");
    }
  };

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [success]);

  //some validations

  if (loading)
    return (
      <div className="flex items-center justify-center py-20 text-sm text-slate-500">
        Loading contacts…
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-20 text-sm text-red-500">
        {error}
      </div>
    );

  if (contacts.length === 0)
    return (
      <div className="flex items-center justify-center py-20 text-sm text-slate-500">
        No contacts yet
      </div>
    );

  //Contacts in table format
  return (
    <div className="flex h-full flex-col ">
      <div className="p-4!">
        <div className="mb-5 flex items-center justify-between ">
          <h2 className="flex text-2xl mt-12!  mb-4! tracking-tight font-bold bg-amber-200">
            <h2> Contact List :</h2>
          </h2>
          <h2 className="flex  mt-12! text-sm  mb-4! tracking-tight font-bold bg-gray-200">
            <p> Total contacts: {contacts.length}</p>
          </h2>
        </div>

        <div className="hidden md:block flex-1 overflow-auto">
          <div className="space-y-3">
            <Table className="border-separate border-spacing-y-3">
              <TableHeader>
                <TableRow className="bg-transparent">
                  <TableHead className="px-4 text-slate-500">Name</TableHead>
                  <TableHead className="text-slate-500">Email</TableHead>
                  <TableHead className="text-slate-500">Phone</TableHead>
                  <TableHead className="text-slate-500 w-[40%]">
                    Message
                  </TableHead>
                  <TableHead className="text-slate-500">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {success && (
                  <div className="mb-4 text-sm text-green-600 bg-green-50 p-2 rounded">
                    {success}
                  </div>
                )}
                {contacts.map((c) => (
                  <TableRow
                    key={c._id}
                    className=" bg-gray-100 shadow-sm   rounded-lg  hover:shadow-md transition"
                  >
                    <TableCell className="p-3! font-medium rounded-l-xl">
                      {c.name}
                    </TableCell>

                    <TableCell className="text-slate-600">{c.email}</TableCell>

                    <TableCell className="whitespace-nowrap">
                      {c.phone}
                    </TableCell>

                    <TableCell className="max-w-[420px] whitespace-normal break-words text-slate-600 rounded-r-xl">
                      {c.message || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="text-red-600 mr-2!  cursor-pointer hover:underline text-sm"
                      >
                        Delete contact
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="md:hidden  space-y-4">
          {contacts.map((c) => (
            <Card
              key={c._id}
              className="rounded-2xl m-4! border p-3! border-slate-200 shadow-sm"
            >
              <CardContent className="p-4 !mb-4 space-y-2 ">
                <div className="flex items-center justify-between">
                  <p className="font-bold py-3!">{c.name}</p>
                </div>
                <p className="text-slate-600">Email: {c.email}</p>
                <p>Contact number:{c.phone}</p>
                {c.message && (
                  <p className="pt-1 text-slate-500">
                    <strong>Message : </strong>
                    {c.message}
                  </p>
                )}
                <button
                  onClick={() => handleDelete(c._id)}
                  className="mt-3! text-sm  text-red-600"
                >
                  Delete Contact
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
