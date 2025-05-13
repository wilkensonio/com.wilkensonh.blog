import React, { useEffect, useState } from "react";
import Subscribe from "./SubscribeButton";

const Term: React.FC = () => {
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    const fetchPolicy = async (): Promise<void> => {
      try {
        //
        const response = await fetch(import.meta.env.VITE_TERM_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.text();
        setTerm(data);
      } catch (error) {
        console.error("Error fetching term:", error);
      }
    };

    fetchPolicy();
  }, []);
  return (
    <div className="px-4 py-8 bg-purple-700">
      <h1 className="text-4xl font-bold text-center py-5">Privacy Policy</h1>
      {term && term.length > 0 ? (
        <p className="text-white text-base mb-4 justify-items-start md:w-8/12 mx-auto">
          {term.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
          <Subscribe />
        </p>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-3xl font-bold text-white">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Term;
