import { SVGProps } from 'react'

export const SpinnerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height="16"
    width="16"
    viewBox="0 0 16 16"
    focusable="false"
    role="presentation"
    {...props}
  >
    <g>
      <path
        fillOpacity=".2"
        d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 2a6 6 0 110 12A6 6 0 018 2z"
        fill="currentColor"
      />
      <path d="M8 0a8 8 0 018 8h-2a6 6 0 00-6-6z" fill="currentColor" />
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 8 8"
        to="360 8 8"
        dur="0.5s"
        repeatCount="indefinite"
      />
    </g>
  </svg>
)
