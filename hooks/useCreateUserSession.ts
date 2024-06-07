import { useState, useEffect } from "react";
import axios from "axios";
import {userStore} from "@/store/store";

const useCreateUserSession = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const {updateUserSessionId} = userStore();

  const uri = process.env.API_URL || "http://localhost:5000";
  const url = `${uri}/user`;

  console.log(url);

  const createSession = async () => {
    setLoading(true);
      try {
        
    
          const userId = localStorage.getItem("userId");
          if (userId) {
                updateUserSessionId(userId);
            return userId;
          }
          
        const res = await axios.post(url, {});
        
        const newUser = res.data;
          setResponse(newUser);
          console.log(newUser);
          localStorage.setItem("userId", newUser);
            updateUserSessionId(newUser);

      return newUser;
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  return { response, error, loading, createSession };
};

export default useCreateUserSession;
