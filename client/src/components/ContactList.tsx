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

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get<Contact[]>("http://localhost:3000/get"); //fetch all contacts from backend
        setContacts(res.data);
      } catch {
        setError("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [refreshKey]);

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
      <div className="mb-5 flex items-center justify-between ">
        <h2 className="text-2xl mt-12!  mb-4! tracking-tight font-bold bg-amber-200">
          Contacts List:
        </h2>
        <span className="mr-4!">{contacts.length} contacts</span>
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
              </TableRow>
            </TableHeader>

            <TableBody>
              {contacts.map((c) => (
                <TableRow
                  key={c._id}
                  className=" bg-white shadow-sm rounded-xl  hover:shadow-md transition"
                >
                  <TableCell className="px-4 py-4 font-medium rounded-l-xl">
                    {c.name}
                  </TableCell>

                  <TableCell className="text-slate-600">{c.email}</TableCell>

                  <TableCell className="whitespace-nowrap">{c.phone}</TableCell>

                  <TableCell className="max-w-[420px] whitespace-normal break-words text-slate-600 rounded-r-xl">
                    {c.message || "—"}
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
            className="rounded-2xl m-4! border p-12 border-slate-200 shadow-sm"
          >
            <CardContent className="p-4 !mb-4 space-y-2 ">
              <div className="flex items-center justify-between">
                <p className="font-bold">{c.name}</p>
                <span className="text-xs text-slate-400 ">Contact</span>
              </div>
              <p className="text-slate-600">email: {c.email}</p>
              <p>Contact number:{c.phone}</p>
              {c.message && (
                <p className="pt-1 text-slate-500">
                  <strong>Message : </strong>
                  {c.message}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
