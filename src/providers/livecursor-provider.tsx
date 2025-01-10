"use client";

import FollowPointer from "@/components/follow-pointer";
import {
  useMyPresence,
  useOthers,
} from "@liveblocks/react/suspense";
import { PointerEvent } from "react";



const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [, updateMyPresence] = useMyPresence(); 

  const others = useOthers();


  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  };

  const handlePointerLeave = () => {
    updateMyPresence({ cursor: { x: 0, y: 0 } });
  };

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={{
              name: info?.name ?? "Unknown",
              avatar: info?.avatar ?? "default-avatar.png",
            }}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}
      {children}
    </div>
  );
};
export default LiveCursorProvider;
