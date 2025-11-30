"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import type { ReactNode } from "react";

interface SimplePrivyProviderProps {
  children: ReactNode;
}

export function SimplePrivyProvider({ children }: SimplePrivyProviderProps) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          walletChainType: "solana-only",
          theme: "light",
          accentColor: "#676FFF",
        },
        loginMethods: ["email", "google", "twitter", "wallet"],
        embeddedWallets: {
          createOnLogin: "all-users",
          requireUserPasswordOnCreate: false,
          solana: {
            createOnLogin: "all-users",
          },
          ethereum: {
            createOnLogin: "off",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

