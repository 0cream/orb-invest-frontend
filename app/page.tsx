"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";

export default function HomePage() {
  const { ready, authenticated, login, logout, user, exportWallet } = usePrivy();
  const [isExporting, setIsExporting] = useState(false);

  async function handleExportPrivateKey() {
    setIsExporting(true);
    try {
      // Export specifically for Solana embedded wallet
      await exportWallet();
    } catch (error) {
      console.error("Error exporting private key:", error);
    } finally {
      setIsExporting(false);
    }
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 px-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Welcome</h1>
            <p className="text-lg text-white/90">
              Connect your wallet to continue
            </p>
          </div>
          
          <button
            onClick={login}
            className="w-full rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Connect Wallet
          </button>
        </div>
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
