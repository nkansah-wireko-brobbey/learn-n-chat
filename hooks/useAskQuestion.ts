import { useState, useEffect } from "react";
import axios from "axios";
import { userStore } from "@/store/store";


const useAskQuestion = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId } = userStore();


  const uri =
    process.env.API_URL ||
    "https://learn-n-chat-backend-k7qr5mn0f-nkansah-wireko-brobbeys-projects.vercel.app" ||
    "http://localhost:5000";
    const url = `${uri}/question`;
    
    console.log(url)

  const askQuestion = async (question: string) => {
    const id = localStorage.getItem("userId");
    setLoading(true);
    try {
      console.log({ question, id });
      const res = await axios.post(url, { question, id});
        setResponse(res.data);
        
        return res.data;
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

  }, []);

  return { response, error, loading, askQuestion };
};

export default useAskQuestion;
