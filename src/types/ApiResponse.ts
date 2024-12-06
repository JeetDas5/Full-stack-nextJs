import { Message } from "@/model/User";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingNMessages?: boolean;
  messages?: Array<Message>;
}
