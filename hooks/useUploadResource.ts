import { useState, useEffect } from "react";
import axios from "axios";
import { userStore } from "@/store/store";


const useUploadResource = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId } = userStore();


  const uri =
    process.env.API_URL ||
    "https://learn-n-chat-backend-k7qr5mn0f-nkansah-wireko-brobbeys-projects.vercel.app";
    const resourceApiUrl = `${uri}/resource`;
    
    console.log(resourceApiUrl)

  const uploadResource = async (url: string) => {
    const id = localStorage.getItem("userId");
    setLoading(true);
    try {
      console.log({ url, id });
      const res = await axios.post(resourceApiUrl, { url, id});
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

  return { response, error, loading, uploadResource };
};

export default useUploadResource;
