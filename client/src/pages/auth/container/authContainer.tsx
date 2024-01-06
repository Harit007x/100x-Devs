import { toast } from "@/components/ui/use-toast";
import Login from "../login/login"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Register from "../register/register";
import { useState } from "react";

const AuthContainer = () => {
  const [switchForm, setSwitchForm] = useState<boolean>(false);
	const navigate = useNavigate();

  const handleLogin = async (formData: any) => {
    try{
      const response = await axios.post('http://localhost:3000/auth/login', formData, {
        withCredentials: true,
      });

      navigate('/kanban');
      
      toast({
        description: response.data.message,
      })
      
    }catch(error:any){
      toast({
        variant:"destructive",
        description: error.response.data?.customError,
      })
      console.log("error =", error)
    }
  }

  const handleRegister = async (formData:any) => {
    try{
      const response = await axios.post("http://localhost:3000/auth/signup", formData, {
        withCredentials: true,
      });

      handleSwitchForm()
      
      toast({
        description: response.data.message,
      })

    }catch(error:any){
      toast({
        variant:'destructive',
        description: error.response.data?.customError,
      })
      console.log("error =", error)
    }
  }

  const handleSwitchForm = () => {
    setSwitchForm(!switchForm)
  }

  return (
    <div>
      <Login
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        handleSwitchForm={handleSwitchForm}
        switchForm={switchForm}
      />
    </div>
  )
}

export default AuthContainer