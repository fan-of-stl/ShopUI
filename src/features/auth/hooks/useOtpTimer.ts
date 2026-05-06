import { useEffect, useState } from "react";

export const useOtpTimer = (initial = 30) => {
  const [seconds, setSeconds] = useState(initial);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const reset = () => setSeconds(initial);

  return { seconds, canResend: seconds === 0, reset };
};