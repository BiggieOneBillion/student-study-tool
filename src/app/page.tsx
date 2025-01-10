// import { Button } from "@headlessui/react";
// import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return null;
  // return (
  //   <div className="flex h-[100vh] flex-col items-center justify-center">
  //     <h1 className="font-mono text-3xl">Home Page</h1>
  //     <Link href={"/sign-in"}>
  //       <Button className="capitalize">Click to sign in</Button>
  //     </Link>
  //   </div>
  // );
}
