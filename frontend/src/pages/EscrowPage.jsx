import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { parseEther, formatEther } from "viem";
import { EscrowABI, EscrowAddress } from "../constants";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

const EscrowPage = () => {
  const { address, isConnected } = useAccount();
  const [amountInETH, setAmountInETH] = useState("");
  const [payeeAddress, setPayeeAddress] = useState("");
  const [arbiterAddress, setArbiterAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [disputeSender, setDisputeSender] = useState(false);
  const [disputeReceiver, setDisputeReceiver] = useState(false);

  const { data: hash, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

   
  // Contract state values
  const { data: contractBalance } = useReadContract({
    abi: EscrowABI,
    address: EscrowAddress,
    functionName: "getBalance",
  });
  const { data: payee } = useReadContract({
    abi: EscrowABI,
    address: EscrowAddress,
    functionName: "payee",
  });
  const { data: payer } = useReadContract({
    abi: EscrowABI,
    address: EscrowAddress,
    functionName: "payer",
  });

  const { data: arbiter } = useReadContract({
    abi: EscrowABI,
    address: EscrowAddress,
    functionName: "arbiter",
  });

  
  const { data: isReleased } = useReadContract({
    abi: EscrowABI,
    address: EscrowAddress,
    functionName: "isReleased",
  });
  const { data: isCancelled } = useReadContract({
    abi: EscrowABI,
    address: EscrowAddress,
    functionName: "isCancelled",
  });

  // Initiate Escrow
  async function initiateEscrow() {
    setLoading(true);
    try {
      await writeContract({
        abi: EscrowABI,
        address: EscrowAddress,
        functionName: "initiateEscrow",
        args: [payeeAddress, arbiterAddress],
        value: [parseEther(amountInETH)],
      });
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }

  // Release Payment
  async function releasePayment() {
    setLoading(true);
    try {
      await writeContract({
        abi: EscrowABI,
        address: EscrowAddress,
        functionName: "release",
      });
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }

  // Cancel Payment
  async function cancelPayment() {
    setLoading(true);
    try {
      await writeContract({
        abi: EscrowABI,
        address: EscrowAddress,
        functionName: "cancel",
      });
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }

  async function freeContract() {
    setLoading(true);
    try {
      await writeContract({
        abi: EscrowABI,
        address: EscrowAddress,
        functionName: "deleteStateVariables",
      });
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
    setLoading(false);
  }

  const toggleDisputeSender = () => {
    if(address == payer){
     setDisputeSender((prev) => !prev);
    }else{
      console.error("sender is not calling the dispute")
    }
  };

  const toggleDisputeReceiver = () => {
    if(address == payee){
     setDisputeReceiver((prev) => !prev);
    }else{
      console.error("Receiver is not calling the dispute")
    }
  };
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-start text-center pt-16">
      {/* Hero Section */}
      <div className="w-full max-w-4xl p-10 bg-black text-gold-500 rounded-lg shadow-lg">
        <h1 className="text-5xl font-cinzel text-yellow-500 mb-4">
          Welcome to Escrow Project
        </h1>
        
        {/* Escrow Project Description */}
        <p className="text-xl font-cinzel text-yellow-500 mb-6">
          A decentralized escrow system that ensures secure and transparent transactions. Our platform allows for easy resolution of disputes between senders and receivers with the help of a neutral arbiter.
        </p>
    
        {/* Features Description */}
        <p className="text-lg font-cinzel text-yellow-400 mb-8">
  Whether you're sending or receiving funds for services, our system protects both parties by holding funds securely until both are satisfied. In case of a dispute, our integrated AI court steps in to provide unbiased resolutions, ensuring a fair outcome based on the evidence presented. Experience transparency, security, and fairness with our smart contract-powered escrow solution, enhanced by the intelligence of our AI court.
</p>

    
        {/* Connect Button */}
        <div className="mt-10">
          <ConnectButton />
        </div>
      </div>
    </div>
    
    );
  }

  return (
    <div className="p-6  text-white">
              
      <h1 className="text-4xl text-yellow-500 font-cinzel mb-8">Escrow Contract </h1>
      <ConnectButton />
      <div className="mb-6 mt-5">
        <label className="block mb-2 font-cinzel">Payee Address</label>
        <input
          className="w-full rounded-md p-2 text-black"
          type="text"
          value={payeeAddress}
          onChange={(e) => setPayeeAddress(e.target.value)}
          placeholder="Enter Payee Address"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-cinzel">Arbiter Address</label>
        <input
          className="w-full rounded-md p-2 text-black"
          type="text"
          value={arbiterAddress}
          onChange={(e) => setArbiterAddress(e.target.value)}
          placeholder="Enter Arbiter Address"
        />
      </div>

      <div className="mb-6">
        <label className="block font-cinzel mb-2">Amount in MATIC</label>
        <input
          className="w-full p-2 rounded-md text-black"
          type="text"
          value={amountInETH}
          onChange={(e) => setAmountInETH(e.target.value)}
          placeholder="Enter Amount in MATIC"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={initiateEscrow}
          className="bg-yellow-500 rounded-md text-black font-cinzel font-bold px-4 py-2"
          disabled={loading}
        >
          {loading ? "Initiating..." : "Initiate Escrow"}
        </button>
        <button
          onClick={releasePayment}
          className="bg-white text-black rounded-md font-cinzel font-bold  px-4 py-2"
          disabled={loading}
        >
          {loading ? "Releasing..." : "Release Payment"}
        </button>
        <button
          onClick={cancelPayment}
          className="bg-red-500 text-white rounded-md font-cinzel font-bold px-4 py-2"
          disabled={loading}
        >
          {loading ? "Cancelling..." : "Cancel Payment"}
        </button>
        
      </div>

      <div className="bg-yellow-500 rounded-xl p-6 shadow-lg w-full  mt-8">
  <div className="space-y-4">
    <h2 className="text-2xl font-cinzel font-semibold mb-4 text-black">Contract Info</h2>
    <div className="bg-black p-4 rounded-lg shadow-inner text-white">
      <p className="font-medium ">Contract Balance: {contractBalance ? formatEther(contractBalance) : "0"} MATIC</p>
      <p className="font-medium break-words ">Payee: {payee || "Loading..."}</p>
      <p className="font-medium break-words">Payer: {payer || "Loading..."}</p>
      <p className="font-medium break-words">Arbiter: {arbiter || "Loading..."}</p>
      <p className="font-medium">Is Released: {isReleased ? "Yes" : "No"}</p>
      <p className="font-medium">Is Cancelled: {isCancelled ? "Yes" : "No"}</p>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-center gap-5">
      
  <button
    onClick={freeContract}
    className="bg-red-500 text-white font-cinzel rounded-md font-bold px-4 py-2"
    disabled={loading}
  >
    {loading ? "Freeing..." : "Free Contract"}
  </button>

  <button
    onClick={toggleDisputeSender}
    className={`font-cinzel rounded-md font-bold px-4 py-2 ${
      disputeSender ? "bg-red-500" : "bg-green-500"
    } text-white`}
  >
    {disputeSender ? "Sender Has Dispute" : "No Dispute"}
  </button>

  <button
    onClick={toggleDisputeReceiver}
    className={`font-cinzel rounded-md font-bold px-4 py-2 ${
      disputeReceiver ? "bg-red-500" : "bg-green-500"
    } text-white`}
  >
    {disputeReceiver ? "Receiver Has Dispute" : "No Dispute"}
  </button>
</div>

  </div>
</div>

      
    </div>
  );
};

export default EscrowPage;
