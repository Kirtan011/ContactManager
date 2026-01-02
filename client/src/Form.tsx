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

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/submit", formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-5xl! mb-5! tracking-tight! ">
              Contact Form
            </FieldLegend>
            <FieldDescription className="tracking-wide font-semibold ">
              Fill all the details
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Name
                </FieldLabel>
                <Input
                  name="name"
                  placeholder="Kirtan Suthar"
                  type="name"
                  value={formData.name}
                  onChange={handleForm}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Email
                </FieldLabel>
                <Input
                  name="email"
                  placeholder="kirtansuthar100@gmail.com"
                  type="email"
                  value={formData.email}
                  onChange={handleForm}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Phone Number
                </FieldLabel>
                <Input
                  name="phone"
                  placeholder="9351452853"
                  type="number"
                  value={formData.phone}
                  onChange={handleForm}
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Message (optional)
                </FieldLabel>
                <Textarea
                  name="message"
                  placeholder="Add your message"
                  className="resize-none"
                  value={formData.message}
                  onChange={handleForm}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button className="border-1! p-2! hover:bg-green-300" type="submit">
              Submit
            </Button>
            <Button
              className="border-1! p-2! hover:bg-red-300"
              variant="ghost"
              type="button"
            >
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
