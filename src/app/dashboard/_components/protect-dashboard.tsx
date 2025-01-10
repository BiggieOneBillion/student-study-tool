// "use client";
// import { useAuthStore } from "@/store/user-store";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect, useState } from "react";

// export default function ProtectRouteDashboard({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [isHydrated, setIsHydrated] = useState(false);
//   // const rehydrated = useAuthStore!.persist!.hasHydrated(); // Check if the state is rehydrated
//   const details = useAuthStore((state) => state.details);
//   const router = useRouter();
//   const [content, setContent] = useState<ReactNode>(
//     <div className="flex h-screen w-full items-center justify-center">
//       <p className="text-xl text-black">...Loading</p>
//     </div>,
//   );

//   useEffect(() => {
//     if (!useAuthStore!.persist!.hasHydrated()) return; // Wait until the store is rehydrated

//     if (useAuthStore.persist.hasHydrated()) {
//       setIsHydrated(true);
//     }
//   }, []);

//   if (!isHydrated) {
//     return content;
//   }

//   if (isHydrated && details.email) {
//     setContent(children);
//   } else {
//     router.push("/sign-in");
//   }

//   // return content;
// }

"use client";
import { useAuthStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function ProtectRouteDashboard({
  children,
}: {
  children: ReactNode;
}) {
  const details = useAuthStore((state) => state.details);
  const hasHydrated = useAuthStore.persist?.hasHydrated() ?? false; // Avoid direct call inside render
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(hasHydrated);

  useEffect(() => {
    // Wait for rehydration
    if (!hasHydrated) return;

    setIsHydrated(true);
  }, [hasHydrated]);

  useEffect(() => {
    // Redirect only after hydration check
    if (isHydrated && !details?.email) {
      router.push("/sign-in");
    }
  }, [isHydrated, details?.email, router]);

  if (!isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-xl text-black">...Loading</p>
      </div>
    );
  }

  return <>{children}</>;
}
