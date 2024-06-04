"use client";
import React from "react";
import { BarDatumWithColor, ResponsiveBar } from "@nivo/bar";

export default function ResultGraph() {

  const data: BarDatumWithColor[] = [
    {
      CandidateName: "Candidate 1",
      Vote: 10,
      color: 'pink'
    },
    {
      CandidateName: "Candidate 2",
      Vote: 20,
      color: 'pink'
    },
    {
      CandidateName: "Candidate 3",
      Vote: 30,
      color: 'lightgreen'
    },
    {
      CandidateName: "Candidate 4",
      Vote: 20,
      color: 'pink'
    },
    {
      CandidateName: "Candidate 5",
      Vote: 10,
      color: 'pink'
    },
  ];

  return (
    <div className="w-[900px] h-[500px] bg-white p-5">
        <h1 className="text-black text-xl text-center font-semibold">Vote distibution</h1>
      <ResponsiveBar
        data={data}
        groupMode="grouped"
        indexBy={"CandidateName"}
        keys={["Vote"]}
        colors={({id, data}) => data.color}
        margin={{ top: 30, right: 60, bottom: 50, left: 60 }}
        padding={0.4}
        enableLabel
        labelTextColor={'black'}
        motionConfig={'gentle'}
      />
    </div>
  );
}
