import { toast } from "sonner";

/**
 * Centralized toast notifications with predefined options
 */
export const toastNotify = {
  /**
   * Show a success toast notification
   */
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
    });
  },

  /**
   * Show an error toast notification 
   */
  error: (error: unknown, fallbackMessage = "An unexpected error occurred") => {
    let message = fallbackMessage;
    
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    }
    
    toast.error(message, {
      duration: 5000,
    });
    
    // Log the full error to console
    console.error("Error details:", error);
  },

  /**
   * Show an info toast notification
   */
  info: (message: string) => {
    toast.info(message, {
      duration: 3000,
    });
  },

  /**
   * Show a warning toast notification
   */
  warning: (message: string) => {
    toast.warning(message, {
      duration: 4500,
    });
  },

  /**
   * Show a loading toast that can be updated
   */
  loading: (message: string): { id: string, update: (message: string) => void, success: (message: string) => void, error: (message: string) => void, info: (message: string) => void } => {
    const id = toast.loading(message);
    
    return {
      id: id.toString(),
      update: (message: string) => toast.loading(message, { id }),
      success: (message: string) => toast.success(message, { id }),
      error: (message: string) => toast.error(message, { id }),
      info: (message: string) => toast.info(message, { id }),
    };
  },

  /**
   * Show a promise toast that automatically updates based on promise resolution
   */
  promise: <T>(
    promise: Promise<T>,
    {
      loading = "Loading...",
      success = "Operation completed successfully",
      error = "Operation failed",
    }: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((error: unknown) => string);
    } = {}
  ) => {
    return toast.promise(promise, {
      loading,
      success: (data) => (typeof success === "function" ? success(data) : success),
      error: (err) => (typeof error === "function" ? error(err) : error),
    });
  },
}; 