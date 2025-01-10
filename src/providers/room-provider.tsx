"use client";
import {
  RoomProvider as RoomProviderWrapper,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import LiveCursorProvider from "./livecursor-provider";
import LoadingSpinner from "@/components/loading-spinner";

const RoomProvider = ({
  children,
  roomId,
}: {
  children: React.ReactNode;
  roomId: string;
}) => {
  return (
    <RoomProviderWrapper
      id={roomId}
      initialPresence={{ cursor: { x: 0, y: 0 } }}
    >
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
};
export default RoomProvider;
