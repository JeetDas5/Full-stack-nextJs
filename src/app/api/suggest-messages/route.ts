/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAApG79d5Y96BKd9blPIj3Gr-XUFtIQpmU",
      method: "post",
      data: {
        contents: [
          {
            parts: [
              {
                text: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
              },
            ],
          },
        ],
      },
    });

    const aiResponse = response.data.candidates[0].content.parts[0].text;

    return NextResponse.json({ success: true, message: aiResponse });
  } catch (error) {
    console.error("Error in API call:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}
