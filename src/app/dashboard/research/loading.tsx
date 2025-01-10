import LoadingSpinner from "@/components/loading-spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
