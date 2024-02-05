import { ReceivedChatMessage } from "@livekit/components-react";

type ChatMessageProps = {
  data: ReceivedChatMessage;
};

export const ChatMessage = ({ data }: ChatMessageProps) => {
  return <div>ChatMessage</div>;
};
