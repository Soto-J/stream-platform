"use client";

import { CopyButton } from "./copy-button";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type KeyCardProps = {
  value: string | null;
};

export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);

  const inputType = show ? "text" : "password";
  const buttonLabel = show ? "Hide" : "Show";

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="mt-2 shrink-0 font-semibold">Stream Key</p>

        <div className="w-full space-y-2">
          <div className="flex w-full items-center gap-x-2">
            <Input
              value={value || ""}
              type={inputType}
              disabled
              placeholder="Stream Key"
            />

            <CopyButton value={value || ""} />
          </div>

          <Button onClick={() => setShow(!show)} size="sm" variant="link">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
