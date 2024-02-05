type ChatProps = {
  viewerName: string;
  hostIdentity: string;
  hostName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
};

export const Chat = ({
  viewerName,
  hostIdentity,
  hostName,
  isFollowing,
  isChatEnabled,
}: ChatProps) => {
  return <div>ChatControl</div>;
};
