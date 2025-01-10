import RoomProvider from "@/providers/room-provider";

const DocLayoout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};
export default DocLayoout;
