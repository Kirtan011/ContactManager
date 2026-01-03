import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

export default function Form({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000"
      : "https://contactmanager-8any.onrender.com";

  // handle form data
  const handleForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/submit`, formData); //passing form data to the backend for validation and storing
      setFormData({ name: "", email: "", phone: "", message: "" });
      onSuccess();
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  //form
  return (
    <div className="w-full mt-12!  p-5!">
      <div className="rounded-2xl bg-white border border-slate-200 shadow-lg p-4!">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="bg-amber-200 rounded- mb-4! font-bold text-2xl! tracking-tight">
                Contact Info:
                <hr />
              </FieldLegend>

              <FieldDescription className="text-sm text-slate-500 mt-1">
                Fill all the contact details
              </FieldDescription>

              <FieldGroup className="space-y-4 mt-6">
                <Field>
                  <FieldLabel className="ml-2!">Name*</FieldLabel>
                  <Input
                    name="name"
                    placeholder="Kirtan Suthar"
                    value={formData.name}
                    onChange={handleForm}
                    required
                    className="h-9 rounded-lg"
                  />
                </Field>

                <Field>
                  <FieldLabel className="ml-2!">Email*</FieldLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="kirtan@email.com"
                    value={formData.email}
                    onChange={handleForm}
                    required
                    className="h-9 rounded-lg"
                  />
                </Field>

                <Field>
                  <FieldLabel className="ml-2!">Phone*</FieldLabel>
                  <Input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="9351452853"
                    value={formData.phone}
                    onChange={handleForm}
                    className="h-9 rounded-lg"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet className="mt-6">
              <Field>
                <FieldLabel className="ml-2!">Message(optional):</FieldLabel>
                <Textarea
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleForm}
                  className="min-h-[96px] rounded-lg resize-none"
                />
              </Field>
            </FieldSet>

            <Field orientation="horizontal" className="flex gap-3 pt-4">
              <Button className="flex-1 h-11 rounded-lg bg-green-600 hover:bg-slate-900 text-white">
                Submit
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-red-600 hover:bg-slate-900 h-11 text-white rounded-lg"
                onClick={() =>
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                  })
                }
              >
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
