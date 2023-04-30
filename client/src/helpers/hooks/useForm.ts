"use client";
import { useState } from "react";

export function useForm<T extends Record<any, any>>(
  initialValues: T = {} as Record<any, any>
) {
  const [payload, setPayload] = useState(initialValues);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setPayload((old) => ({ ...old, [target.name]: target.value }));
  };
  return {
    listener: handleChange,
    payload,
    setPayload,
  };
}
