import * as React from "react"

export default function IconBack(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth={1}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M15 8h.01" />
      <rect x={4} y={4} width={16} height={16} rx={3} />
      <path d="M4 15l4-4a3 5 0 013 0l5 5" />
      <path d="M14 14l1-1a3 5 0 013 0l2 2" />
    </svg>
  )
}
