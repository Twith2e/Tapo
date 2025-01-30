import React, { useState } from "react";
import axios from "axios";

export default function Pin() {
  const [pin, setPin] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/update-pin",
        { pin }
      );
      if (response) {
        console.log("pin updated");
      } else {
        console.log("an error occured while updating pin");
      }
    } catch (error) {
      console.log("an unexpected error occured");
    }
  };
  return (
    <div className="bg-red-500 h-screen p-4">
      <form action="" onSubmit={handleSubmit}>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          type="text"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
