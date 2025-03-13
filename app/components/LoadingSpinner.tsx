import React from "react";

export default function Loader(props: {
  color: string;
  size: string;
  additionalClasses?: string;
}) {
  return (
    <div
      className={`flex justify-center items-center ${props.additionalClasses}`}
    >
      <div
        className={`animate-spin rounded-full h-${props.size} w-${props.size} border-t-2 border-b-2 border-${props.color}`}
      ></div>
    </div>
  );
}
