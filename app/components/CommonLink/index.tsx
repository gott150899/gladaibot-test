'use client'

import Link from 'next/link';
import styled from 'styled-components';

const StyledLink = styled.a`
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
`;

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string
}

const CommonLink = ({ to, children, className }: Props) =>{
  return (
    <Link href={to} className={className} passHref>
      <StyledLink>{children}</StyledLink>
    </Link>
  );
}

export default CommonLink