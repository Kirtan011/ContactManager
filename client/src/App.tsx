import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { useState } from "react";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          <div className="flex justify-center lg:justify-start">
            <ContactForm onSuccess={() => setRefreshKey((k) => k + 1)} />
          </div>

          <div className="rounded-2xl bg-white shadow-lg p-6">
            <ContactList refreshKey={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
