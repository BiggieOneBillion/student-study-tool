"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSubmitBtn from "@/hooks/use-submit-btn";
import generateContent from "@/lib/test-key-2";
import { useGlobal } from "@/hooks/use-global";
import { useKeyStore } from "@/store/api-store";

const formSchema = z.object({
  api_key: z.string().min(15).max(100),
});

export default function ApiKeyCheck() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });


  const {
    SubmitBtn,
    handleBtnText,
    handleIsLoadingFalse,
    handleIsLoadingTrue,
  } = useSubmitBtn({ initialText: "Verify Key" });

  const [isError, setIsError] = useState(false);

  const context = useGlobal()

  const setKey = useKeyStore(state => state.setKey)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsError(false);
    handleIsLoadingTrue();
    handleBtnText("Submitting");
    try {
      // const response = await run("Hello chart?", values.api_key);
      const response = await generateContent(values.api_key);
      if (response.status) {
        toast.success("Key is working");
        handleBtnText("re-routing");
        context?.setIsApiKeyWorking(true) // This is for now. Later we would store the api key value in zustand store and reuse it when making a call.
        // ! SAVE THE API KEY.
        setKey(values.api_key)
        // Refresh the browser window
        window.location.reload(); //! we have to look for a better solution
      }
    } catch (error) {
      setIsError(true);
      handleIsLoadingFalse();
      handleBtnText("Try again");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-4 rounded-lg border bg-white px-5 py-10"
      >
        <FormField
          control={form.control}
          name="api_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your gemini Api-Key</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your own personal gemini api key"
                  className="w-[400px]"
                  type="text"
                  {...field}
                />
              </FormControl>
              {isError && (
                <FormDescription className="text-red-700">
                  Key authentication failed, please provide another key.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3">
          <div className="w-[150px]">
            <SubmitBtn />
          </div>
          {/* <DefaultKeyBtn /> */}
        </div>
      </form>
    </Form>
  );
}
