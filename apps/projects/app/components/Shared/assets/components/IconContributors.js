import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.div`
  display: inline-flex;
  align-self: baseline;
  margin-right: 2px;
  svg {
    transform: scale(0.9);
    bottom: -3.6px;
    position: relative;
  }
`

const IconContributors = props => (
  <StyledIcon>
    <svg
      className="octicon octicon-organization"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16px"
      height="16px"
      fill="#666"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4z"
      />
    </svg>
  </StyledIcon>
)

export default IconContributors
