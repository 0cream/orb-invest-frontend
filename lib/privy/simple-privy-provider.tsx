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
          theme: "dark",
          accentColor: "#FF4D3D",
          showWalletLoginFirst: false,
        },
        loginMethods: ["email"],
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

