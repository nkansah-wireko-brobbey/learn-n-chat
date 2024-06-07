import { useToast } from "@/components/ui/use-toast";

export const useAppToaster = () => {
  const toast = useToast();

  const showToast = (message: string) => {
    // toast({
    //   title: "Scheduled: Catch up",
    //   description: "Friday, February 10, 2023 at 5:57 PM",
    // });
  };

  return { showToast };
};