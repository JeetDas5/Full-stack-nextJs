"use client";
import React, { useState } from "react";
// assignment page
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCompletion } from 'ai/react';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { usePathname } from "next/navigation";

export default function SendMessage() {

  
  const [sending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const[message, setMessage]= useState<string>();
  // const params = useParams<{ username: string }>();
  const pathname = usePathname();
  const username = decodeURIComponent(pathname.split("/").pop() || "").substring(0);

  const { toast } = useToast();
  const initialMessageString = "what's the best day of your life?|| What's your favourite movie?||what's your dream job?";

  const parseStringMessages = (messageString: string): string[] =>{
    return messageString.split('||');
  };

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString, 
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setMessage(event.target.value);
  }

  const handleSendMessage = async ()=>{
    setIsLoading(true);
    setIsSending(true);
  //   try{
  //   const res = await axios.get<ApiResponse>('/api/accept-messages');
  //   console.log("response in accept messages is", res);
  //    if(res.data.isAcceptingMessages === true){
  //     const response = await axios.post<ApiResponse>('/api/send-message',{
  //       username : username,
  //       content : message
  //     });
  //     console.log("response in sending msg is", response);
  //     toast({
  //       title: "success",
  //       description: response.data.message,
  //       variant: "default",
  //     });
  //    }else{
  //     toast({
  //       title: "Not accepting messages",
  //       description: "user is not accepting messages",
  //       variant: "destructive",
  //     });
  //    }
  // }catch (error) {
  //     const axiosError = error as AxiosError<ApiResponse>;
  //     console.log("AxiosError while sending message is", axiosError);
  //     let errorMessage =
  //       axiosError.response?.data.message || "Error sending msg";
  //     toast({
  //       title: "Error sending message",
  //       description: errorMessage,
  //       variant: "destructive",
  //     });
  //   }
  //   finally {
  //     setIsSending(false);
  //     setIsLoading(false);
  //   }

  try{
    const response = await axios.post<ApiResponse>('/api/send-message',{
      username : username,
      content : message
    })
    toast({
      title: response.data.message,
      description: 'Message sent successfully',
      variant: 'default',
    });
  }catch(error){
    console.log("error in sending message is", error);
    const axiosError = error as AxiosError<ApiResponse>;
    let errorMessage = axiosError.response?.data.message || "User Not accepting messages";
    toast({
    title: "Error",
    description: errorMessage,
    variant: "destructive",
  });
  }finally{
    setIsSending(false);
    setIsLoading(false);
  }
}

  const fetchSuggestMessages = async ()=>{
    try{
      complete('');
    } catch (error){
      console.error('Error fetching messages:', error);
    }
  }

  const handleMessageClick = (msg: string) =>{
    setMessage(msg);
  }

  return (
    <div className="my-8 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl border mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center sm:px-8 md:px-8 lg:px-10">
        Public Profile Link
      </h1>

      <div className="mb-1 ml-20 mt-10">
      <h2 className="text-lg font-semibold mb-2">
  {`Send Anonymous Message to @${username}`}
</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="write your message"
            className="input input-bordered w-full lg:p-5 mr-2 border border-grey-500 bg-[#EEEDFF] p-[1.2rem]"
            onChange={handleInputChange}
            value={message}

          />
        </div>
        <div className="text-center">
          {sending ? (
            <>
              <Button className="mt-9" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            </>
          ) : (
            <>
              <Button className="mt-9 bg-[#818AE0]" disabled={sending} onClick={handleSendMessage}>
                Send It
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="ml-20 mt-12">
        <Button className="bg-[#818AE0]" onClick={fetchSuggestMessages}>Suggest Messages</Button>
        <h2 className="text-lg font-semibold mb-2 mt-4">
          click on any message below to see it.
        </h2>{" "}
      </div>
      {/* bottom card section  */}

      <div className="mx-auto mt-10 border border-grey-800 max-w-full px-4 sm:px-8 md:px-8 lg:px-10">
  {/* messages will come here */}
  <Card>
    <CardHeader>
      <h3 className="text-xl font-semibold text-center">Messages</h3>
    </CardHeader>
    <CardContent className="flex flex-col space-y-4">
      {error ? (
        <p className="text-blue-500">{error.message}</p>
      ) : (
        parseStringMessages(completion).map((msg, index) => (
          <Button
            onClick={() => handleMessageClick(msg)}
            key={index}
            variant={"outline"}
            className="mb-2 bg-[#EEEDFF] text-center w-full sm:max-w-full text-xs sm:text-sm break-words whitespace-break-spaces"
          >
            {msg}
          </Button>
        ))
      )}
    </CardContent>
  </Card>
</div>


    </div>
  );
}