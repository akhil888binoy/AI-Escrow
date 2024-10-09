import React, { useEffect, useState } from 'react';

const CourtPage = () => {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState("");

  async function callCourt() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "message": `This is a dispute related to an escrow transaction. Please analyze the following scenario and suggest the best action for the arbiter to resolve the dispute in one line:
        ${query}`
      });
      

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://llm.pankajkush.club/chat", requestOptions);
      const data = await response.json(); // Parse the JSON response
      setOrder(data.response); // Assuming your API response has a 'message' key
      console.log("order", data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gold-500">
    <h1 className="font-cinzel text-yellow-500 text-[5rem] sm:text-[8rem] md:text-[8rem] lg:text-[8rem]  flex justify-center items-center  opacity-50">
 AI Court
</h1>
    <div className="w-full max-w-md p-8 bg-black shadow-lg rounded-lg">
      {/* Input Section */}
      
      <div className="mb-6">
        <input
          type="text"
          value={query}
          placeholder="Add your query here"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded-lg border border-yellow-500 bg-black text-yellow-500 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      
      {/* Button Section */}
      <div className="mb-6">
        <button
          className="w-full p-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-300 transition duration-300"
          onClick={callCourt}
        >
          Get Suggestion from AI Judge
        </button>
      </div>
  
      {/* Output Section */}
      <div className="bg-gold-500 p-6 rounded-lg text-yellow-500 shadow-lg">
        {order ? (
          <p>{order}</p>
        ) : (
          <p className="text-yellow-500 italic">Your suggestions will appear here...</p>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default CourtPage;
