/* eslint-disable @typescript-eslint/no-unused-vars */
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  console.log("Inside GET messages");

  // Get session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new Response(
      JSON.stringify({ success: false, message: "Not authenticated" }),
      { status: 401 }
    );
  }

  const _user = session.user;
  if (!_user._id) {
    return new Response(
      JSON.stringify({ success: false, message: "User ID not found" }),
      { status: 400 }
    );
  }

  const userId = new mongoose.Types.ObjectId(_user._id);

  try {
    // Aggregation pipeline
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]).exec();

    // Check if user and messages exist
    if (!user || user.length === 0 || !user[0]?.messages?.length) {
      return new Response(
        JSON.stringify({ success: true, message: "No messages found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messages: user[0].messages }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while fetching messages:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to get messages" }),
      { status: 500 }
    );
  }
}
