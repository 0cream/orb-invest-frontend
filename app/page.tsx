"use client";

import { usePrivy, useSolanaWallets } from "@privy-io/react-auth";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets: solanaWallets, exportWallet: exportSolanaWallet } = useSolanaWallets();
  const [isExporting, setIsExporting] = useState(false);
  
  // Get the Solana wallet address
  const solanaWallet = solanaWallets[0];
  const solanaAddress = solanaWallet?.address;

  // Automatically trigger login when page loads and user is not authenticated
  // If user closes modal, it will re-open after a short delay
  useEffect(() => {
    if (ready && !authenticated) {
      const timer = setTimeout(() => {
        login();
      }, 300);
      return () => clearTimeout(timer);
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
      <div className="flex min-h-screen items-center justify-center bg-black">
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <div className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Your Wallet</h1>
            <p className="text-gray-400">Securely manage your keys</p>
          </div>

          {/* User Info Card */}
          <div className="rounded-3xl bg-[#1a1a1a] border border-[#FF4D3D]/20 p-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Solana Wallet Address</p>
              <p className="text-white font-mono text-sm break-all">
                {solanaAddress || "No wallet connected"}
              </p>
            </div>

            {user?.email && (
              <div className="space-y-2 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{user.email.address}</p>
              </div>
            )}

            {user?.twitter && (
              <div className="space-y-2 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-400">Twitter</p>
                <p className="text-white">@{user.twitter.username}</p>
              </div>
            )}
          </div>

          {/* Export Private Key Button */}
          <div className="space-y-4">
            <button
              onClick={handleExportPrivateKey}
              disabled={isExporting}
              className="w-full rounded-2xl bg-[#FF4D3D] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#ff3d2d] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? "Exporting..." : "Export Solana Private Key"}
            </button>
            
            <p className="text-center text-sm text-gray-500">
              ⚠️ Never share your private key with anyone
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full rounded-2xl bg-[#1a1a1a] border border-gray-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#2a2a2a] active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center text-gray-600 text-sm">
        <p>Orb Wallet • Powered by Privy</p>
      </div>
    </div>
  );
}
