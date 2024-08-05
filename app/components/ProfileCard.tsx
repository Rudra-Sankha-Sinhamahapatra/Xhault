/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button as PrimaryButton, TabButton } from "./Button";
import { useEffect, useState } from "react";
import { useTokens } from "../api/hooks/useTokens";
import { TokenList } from "./TokenList";
import { Swap } from "./Swap";

type Tab = "tokens" | "send" | "add_funds" | "swap" | "withdraw";

const tabs: { id: Tab; name: string }[] = [
  { id: "tokens", name: "Tokens" },
  { id: "send", name: "Send" },
  { id: "add_funds", name: "Add funds" },
  { id: "withdraw", name: "Withdraw" },
  { id: "swap", name: "Swap" },
];

export default function ProfileCard({ publicKey }: { publicKey: string }) {
  const session = useSession();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<Tab>("tokens");

  if (session.status === "loading") {
    return <div>Loading ....</div>;
  }

  if (!session.data?.user) {
    router.push("/");
    return null;
  }

  return (
    <div className="pt-7 flex justify-center">
      <div className="max-w-2xl bg-white rounded shadow w-full mb-10">
        <Greeting
          name={session.data?.user?.name || ""}
          image={session.data?.user?.image || ""}
        />
        <div className="w-full flex px-4 ">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={tab.id === selectedTab}
              onClick={() => {
                setSelectedTab(tab.id);
              }}
            >
              {tab.name}
            </TabButton>
          ))}
        </div>

        <div className={`${selectedTab === "tokens" ? "visible" : "hidden"}`}>
          <Assets publicKey={publicKey} />
        </div>
        <div className={`${selectedTab === "swap" ? "visible" : "hidden"}`}>
          <Swap/>
        </div>
      </div>
    </div>
  );
}

function Greeting({ image, name }: { image: string; name: string }) {
  return (
    <div className="flex p-12">
      <img src={image} className="rounded-full w-20 h-20" alt="image" />

      <div className="text-2lg font-bold w-full pt-4 pl-4">
        Welcome back, {name}
      </div>
    </div>
  );
}

function Assets({ publicKey }: { publicKey: string }) {
  const [copied, setCopied] = useState(false);
  const { tokenBalances, loading } = useTokens(publicKey);

  useEffect(() => {
    if (copied) {
      let timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  if (loading) {
    return <div>Loading ....</div>;
  }

  return (
    <div className="text-slate-400 mt-2">
      <div className="ml-14">Account Assets</div>
      <br />
      <div className="flex justify-between pt-2 m-12 mb-2 mt-0">
        <div className="flex justify-center">
          <div className="text-4xl font-bold text-black">
            ${tokenBalances?.totalBalance}
          </div>
          <div className="text-2xl font-semibold pt-2 pl-2">USD</div>
        </div>
        <div>
          <PrimaryButton
            subject={copied ? `copied` : `Copy Address`}
            onClick={() => {
              navigator.clipboard.writeText(publicKey);
              setCopied(true);
            }}
          />
        </div>
      </div>
      <div className="pt-0 bg-slate-50 p-12">
        <TokenList tokens={tokenBalances?.tokens || []} />
      </div>
    </div>
  );
}
