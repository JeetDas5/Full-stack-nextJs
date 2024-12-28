/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import dotenv from "dotenv";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { CardHeader, CardContent, Card } from "@/components/ui/card";

async function suggest() {
  dotenv.config();
  // if (!process.env.GEMINI_API_KEY) {
  //   throw new Error(
  //     "GEMINI_API_KEY is not defined in the environment variables."
  //   );
  // }

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.";
  const result = await model.generateContent(prompt);
  return result;
}

export default function SendMessage() {
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([
    "what's the best day of your life?",
    "What's your favourite movie?",
    "what's your dream job?",
  ]);
  const [message, setMessage] = useState<string>("");
  const [sending, setIsSending] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const pathname = usePathname();
  const username = decodeURIComponent(pathname.split("/").pop() || "");
  const { toast } = useToast();

  const parseStringMessages = (messageString: string): string[] => {
    return messageString.split("||");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    setIsSending(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content: message,
      });
      toast({
        title: response.data.message,
        description: "Message sent successfully",
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message || "User Not accepting messages";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const fetchSuggestMessages = async () => {
    setIsFetching(true);
    try {
      const result = await suggest();
      const parsedMessages = parseStringMessages(result.response.text());
      setSuggestedMessages(parsedMessages);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to fetch suggestions. Try again later.",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleMessageClick = (msg: string) => {
    setMessage(msg);
  };

  return (
    <div className="my-8 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl border mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Public Profile Link
      </h1>

      <div className="mb-1 ml-20 mt-10">
        <h2 className="text-lg font-semibold mb-2">
          {`Send Anonymous Message to @${username}`}
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Write your message"
            className="input input-bordered w-full lg:p-5 mr-2 border border-grey-500 bg-[#EEEDFF] p-[1.2rem]"
            onChange={handleInputChange}
            value={message}
          />
        </div>
        <div className="text-center">
          <Button
            className="mt-9 bg-[#818AE0]"
            disabled={sending}
            onClick={handleSendMessage}
          >
            {sending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Send It"
            )}
          </Button>
        </div>
      </div>
      <div className="ml-20 mt-12">
        <Button
          className="bg-[#818AE0]"
          onClick={fetchSuggestMessages}
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching Suggestions
            </>
          ) : (
            "Suggest Messages"
          )}
        </Button>
        <h2 className="text-lg font-semibold mb-2 mt-4">
          Click on any message below to see it.
        </h2>
      </div>

      <div className="mx-auto mt-10 border border-grey-800 max-w-full px-4 sm:px-8 md:px-8 lg:px-10">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-center">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {suggestedMessages.map((msg, index) => (
              <Button
                onClick={() => handleMessageClick(msg)}
                key={index}
                variant={"outline"}
                className="mb-2 bg-[#EEEDFF] text-center w-full sm:max-w-full text-xs sm:text-sm break-words whitespace-break-spaces"
              >
                {msg}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
