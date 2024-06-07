"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatBubble from "@/components/chat/chatBubble";
import { Paperclip, LoaderPinwheel } from "lucide-react";
import { CornerDownLeft } from "lucide-react";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import useAskQuestion from "@/hooks/useAskQuestion";
import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
});
const resourceFormSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL.",
  })
});

import { chatStore } from "@/store/store";
import useUploadResource  from "@/hooks/useUploadResource";
import { resourceStore } from "@/store/store";

const Board = () => {
  const { toast } = useToast();
  const { response, error: resourceUploadError, loading: resourceLoading, uploadResource } = useUploadResource()
  const { resources, addResource } = resourceStore();

  const {
    response: responseData,
    error,
    loading,
    askQuestion,
  } = useAskQuestion();

  const { chats, addSentMessage, addReceivedMessage } = chatStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });
  const resourceForm = useForm<z.infer<typeof resourceFormSchema>>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      addSentMessage(values.question);
      const response = await askQuestion(values.question);

      console.log(response);
      if (response) {
        addReceivedMessage(response.answer.kwargs.content);
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  }
  async function onSubmitResourceForm(
    values: z.infer<typeof resourceFormSchema>
  ) {
    console.log(values);
    try {
      const response = await uploadResource(values.url);

      console.log(response);
      if (response) {
        addResource(values.url);
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  }

  return (
    <div className="h-svh sm:h-full">
      <Tabs defaultValue="ask" className="board-responsive">
        <TabsList className="grid w-full grid-cols-2 bg-transparent border border-current">
          <TabsTrigger
            value="ask"
            className="data-[state=active]:bg-slate-500 data-[state=active]:text-white"
          >
            Ask
          </TabsTrigger>
          <TabsTrigger
            value="resource"
            className="data-[state=active]:bg-slate-500 data-[state=active]:text-white"
          >
            Upload Resource
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ask">
          <Card className="bg-slate-800 text-white border-none pb-5">
            <CardHeader>
              <CardTitle>Let's Chat 💬</CardTitle>
              <CardDescription>
                What questions are on your mind? Ask away!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex-grow overflow-auto">
              <div className="w-full min-h-full h-64">
                {chats &&
                  chats.map((chat, index) => (
                    <ChatBubble
                      key={index}
                      type={chat.type}
                      message={chat.message}
                    />
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full pt-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex w-full items-center space-x-2">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="question"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Ask the question"
                                  {...field}
                                  className="w-full bg-slate-600 ring-slate-500 focus:ring-slate-500 border-none"
                                />
                              </FormControl>

                              <FormMessage className="absolute z-50" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <LoaderPinwheel className="animate-spin" />
                        ) : (
                          <>
                            {" "}
                            Ask
                            <CornerDownLeft size={15} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="resource">
          <Card className="bg-slate-800 text-white border-none">
            <CardHeader>
              <CardTitle>Let's Upload your resource ⬆️</CardTitle>
              <CardDescription>
                What resources do you have to share? Upload them here!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex-grow overflow-auto">
              <div className="w-full min-h-full h-64">
                {resources &&
                  resources.map((resource, index) => (
                    <ChatBubble key={index} type="sent" message={resource} />
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full pt-2">
                <Form {...resourceForm}>
                  <form
                    onSubmit={resourceForm.handleSubmit(onSubmitResourceForm)}
                  >
                    <div className="flex w-full items-center space-x-2">
                      <div className="flex-1">
                        <FormField
                          control={resourceForm.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="enter the URL of the web resource"
                                  {...field}
                                  className="w-full bg-slate-600 ring-slate-500 focus:ring-slate-500 border-none"
                                />
                              </FormControl>

                              <FormMessage className="absolute z-50" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" disabled={resourceLoading}>
                        {resourceLoading ? (
                          <LoaderPinwheel className="animate-spin" />
                        ) : (
                          <>
                            {" "}
                            Upload <Paperclip size={15} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Board;
