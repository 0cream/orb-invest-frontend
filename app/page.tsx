"use client";

import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { exportWallet: exportSolanaWallet } = useSolanaWallets();
  const [isExporting, setIsExporting] = useState(false);

  // Automatically trigger login when page loads and user is not authenticated
  useEffect(() => {
    if (ready && !authenticated) {
      login();
    }
  }, [ready, authenticated, login]);

  async function handleExportPrivateKey() {
    setIsExporting(true);
    try {
      // Export Solana embedded wallet specifically
      await exportSolanaWallet();
    } catch (error) {
      console.error("Error exporting private key:", error);
    } finally {
      setIsExporting(false);
    }
  }

  if (!ready || !authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Your Wallet</h1>
            <p className="text-white/80">Securely manage your keys</p>
          </div>

          {/* User Info Card */}
          <div className="rounded-3xl bg-white/10 backdrop-blur-lg p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-white/70">Solana Wallet Address</p>
              <p className="text-white font-mono text-sm break-all">
                {user?.wallet?.address || "No wallet connected"}
              </p>
            </div>

            {user?.email && (
              <div className="space-y-2 pt-4 border-t border-white/20">
                <p className="text-sm text-white/70">Email</p>
                <p className="text-white">{user.email.address}</p>
              </div>
            )}

            {user?.twitter && (
              <div className="space-y-2 pt-4 border-t border-white/20">
                <p className="text-sm text-white/70">Twitter</p>
                <p className="text-white">@{user.twitter.username}</p>
              </div>
            )}
          </div>

          {/* Export Private Key Button */}
          <div className="space-y-4">
            <button
              onClick={handleExportPrivateKey}
              disabled={isExporting}
              className="w-full rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? "Exporting..." : "Export Solana Private Key"}
            </button>
            
            <p className="text-center text-sm text-white/70">
              ⚠️ Never share your private key with anyone
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full rounded-2xl bg-white/10 backdrop-blur-lg px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-white/20 active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center text-white/60 text-sm">
        <p>Mobile Wallet App • Powered by Privy</p>
      </div>
    </div>
  );
}
