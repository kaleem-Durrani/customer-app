import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";

interface ShowToast {
  (
    variant: "outline" | "solid" | "accent" | undefined,
    action: "error" | "warning" | "success" | "info" | "attention" | undefined,
    title: string,
    description: string,
    duration: number
  ): void;
}

const GlobalToast = () => {
  const toast = useToast();

  const show: ShowToast = (variant, action, title, description, duration) => {
    toast.show({
      placement: "top",
      duration: duration,
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action={action} variant={variant}>
            <VStack space="xs">
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return { show };
};

export default GlobalToast;
