import { useEffect, useState } from "react";

export const useAnimatedButtonState = (
  isDisabled: boolean,
  onComplete: () => void
) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // Reset animation state if disabled state changes
  useEffect(() => {
    if (isDisabled && status !== "idle") {
      setStatus("idle");
    }
  }, [isDisabled, status]);

  // Handle the animation sequence
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (status === "loading") {
      timer = setTimeout(() => {
        setStatus("success");

        // After showing success state, call the complete callback
        const successTimer = setTimeout(() => {
          onComplete();
        }, 600);

        return () => clearTimeout(successTimer);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [status, onComplete]);

  // In RN, handleClick just triggers the animation
  const handleClick = () => {
    if (!isDisabled && status === "idle") {
      setStatus("loading");
    }
  };

  return { status, handleClick };
};