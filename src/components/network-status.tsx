"use client"
import { useNetworkStatus } from "@/hooks/use-network-status";
import React from "react";

const NetworkStatus = () => {
  const isOnline = useNetworkStatus();

  return (
    <>
      {!isOnline && (
        <p className="flex items-center justify-center bg-red-400 py-1 text-red-900">
          No Network
        </p>
      )}
    </>
  );
};

export default NetworkStatus;
