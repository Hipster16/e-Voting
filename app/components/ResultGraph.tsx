"use client";
import { useEffect, useState } from "react";
import { BarDatumWithColor, ResponsiveBar } from "@nivo/bar";
import { useRouter } from "next/navigation";
import { connectContract } from "../utils";
import { CandidateType } from "@/Models/types/candidates";
import { useMetaMask } from "../hooks/useMetamask";

export default function ResultGraph(props: { id: string }) {
  const router = useRouter();
  const [result, setResult] = useState<BarDatumWithColor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [winner, setWinner] = useState("");
  const [totalVotes, setTotalVotes] = useState(0);
  const { wallet } = useMetaMask();
  const [showingStats, setShowingStats] = useState(false);

  async function handleFetchResult() {
    setLoading(true);
    setError(null);

    try {
      const contract = await connectContract(props.id);

      // Check election status
      const status = await contract.status();
      if (status) {
        router.push(`/student/dashboard`);
        return;
      }

      // Get candidate data
      const result = await contract.get_All_candidates();
      const data: CandidateType[] = result.map((el: any) => {
        return {
          CandidateName: el[0],
          CandidateId: el[1],
          Vote: Number(el[2]),
        };
      });

      // Calculate total votes
      const voteTotal = data.reduce(
        (sum: number, candidate: CandidateType) => sum + (candidate.Vote ?? 0),
        0
      );
      setTotalVotes(voteTotal);

      // Sort by votes (highest first)
      const sortedData = data.sort((a: any, b: any) => b.Vote - a.Vote);

      let winner: any[] = [];
      let allCandidates: BarDatumWithColor[] = sortedData.map(
        (el: any, index: any) => {
          const percentage =
            voteTotal > 0 ? Math.round((el.Vote / voteTotal) * 100) : 0;

          if (el.Vote === sortedData[0].Vote) {
            winner.push(el);
            return {
              CandidateName: el.CandidateName,
              CandidateId: el.CandidateId,
              Vote: el.Vote,
              Percentage: percentage,
              color: "#10b981", // Emerald green
              labelColor: "white",
            };
          } else {
            return {
              CandidateName: el.CandidateName,
              CandidateId: el.CandidateId,
              Vote: el.Vote,
              Percentage: percentage,
              color: "#ec4899", // Pink
              labelColor: "white",
            };
          }
        }
      );

      setResult(allCandidates);
      setWinner(
        winner.length === 1
          ? `${winner[0].CandidateName} Wins 🎉`
          : "The election is a draw! 🤝"
      );
      setShowingStats(true);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch election results. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!wallet.accounts.length || wallet.accounts.length > 1) {
      router.push("/admin/login");
      return;
    }
  });

  return (
    <div className="w-full flex flex-col items-center">
      {!showingStats ? (
        <div className="w-full max-w-xl bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 flex flex-col items-center text-center">
          <div className="h-24 w-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-3">View Election Results</h2>
          <p className="text-gray-400 mb-8">
            Click the button below to view the final tallies and discover the
            winner of this election.
          </p>

          {error && (
            <div className="w-full p-4 mb-6 bg-red-900/20 border border-red-700/30 rounded-lg text-red-300 text-center">
              {error}
            </div>
          )}

          <button
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
              loading
                ? "bg-blue-700/50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
            }`}
            onClick={handleFetchResult}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading Results...
              </div>
            ) : (
              <span className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Show Results
              </span>
            )}
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center space-y-8">
          {/* Winner Announcement */}
          <div className="w-full max-w-fit py-6 px-8 rounded-2xl bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/5 text-center">
            <h2 className="text-3xl font-bold text-white">{winner}</h2>
            <p className="text-gray-300 mt-2">Total votes: {totalVotes}</p>
          </div>

          {/* Results Graph Card */}
          <div className="w-full max-w-4xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 text-center border-b border-gray-700/50">
              <h3 className="text-xl font-semibold">Vote Distribution</h3>
            </div>

            <div className="p-6 h-[500px]">
              <ResponsiveBar
                data={result}
                indexBy="CandidateName"
                keys={["Vote"]}
                colors={({ data }) => data.color}
                margin={{ top: 50, right: 130, bottom: 70, left: 70 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                borderRadius={6}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  legend: "Candidates",
                  legendPosition: "middle",
                  legendOffset: 50,
                  truncateTickAt: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Votes",
                  legendPosition: "middle",
                  legendOffset: -50,
                  truncateTickAt: 0,
                }}
                enableGridY={true}
                gridYValues={5}
                labelSkipWidth={12}
                labelSkipHeight={12}
                legends={[
                  {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
                tooltip={({ id, value, color, data }) => (
                  <div
                    style={{
                      background: "#1f2937",
                      padding: "12px",
                      border: "1px solid #374151",
                      borderRadius: "4px",
                      color: "#f3f4f6",
                    }}
                  >
                    <strong>{data.CandidateName}</strong>
                    <br />
                    {value} votes ({data.Percentage}%)
                    <br />
                    ID: {data.CandidateId}
                  </div>
                )}
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: "#64748b",
                        strokeWidth: 1,
                      },
                    },
                    ticks: {
                      line: {
                        stroke: "#64748b",
                        strokeWidth: 1,
                      },
                      text: {
                        fill: "#94a3b8",
                      },
                    },
                    legend: {
                      text: {
                        fill: "#e2e8f0",
                        fontSize: 14,
                      },
                    },
                  },
                  grid: {
                    line: {
                      stroke: "#334155",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    },
                  },
                  legends: {
                    text: {
                      fill: "#e2e8f0",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => setShowingStats(false)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M3 12h18"></path>
                <path d="M3 6h18"></path>
                <path d="M3 18h18"></path>
              </svg>
              Hide Results
            </button>

            <button
              onClick={() => router.push(`/student/dashboard`)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
