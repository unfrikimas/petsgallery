import * as React from "react"

export default function IconText(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__icon prefix__icon-tabler prefix__icon-tabler-letter-case"
      viewBox="0 0 24 24"
      strokeWidth={1}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <circle cx={17.5} cy={15.5} r={3.5} />
      <path d="M3 19V8.5a3.5 3.5 0 017 0V19M3 13h7M21 12v7" />
    </svg>
  )
}