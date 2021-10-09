import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function UserProfile() {
  
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/61438b01dc85106ef4db31cd`)
      .then((res) => {
        const data = res.data;
        setUser({ name: data.name, email: data.email });
      })
      .catch(() => {
        alert("Error retrieving User");
      });
  }, []);

  return (
    <div>
    </div>
  );
}

export default UserProfile;
