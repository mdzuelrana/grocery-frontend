import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("activating...");

  useEffect(() => {
    const activate = async () => {
      try {
        await API.post(`/users/activate/${uid}/${token}/`);
        setStatus("Your account has been activated successfully!");
      } catch (err) {
        console.error(err);
        setStatus("Activation failed or link expired.");
      }
    };
    activate();
  }, [uid, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-xl rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold">{status}</h2>
      </div>
    </div>
  );
}