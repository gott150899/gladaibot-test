'use client'

import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

interface Props {
  text: string | undefined;
}

interface CssProps {
  $lineNumber: number;
}

const TextWrap: any = styled.div<CssProps>`
  cursor: pointer;
`;

const CopyText = (props: Props) => {
  const { text } = props;
  const [title, setTitle] = useState('Copy to clipboard');

  const onClick = () => {
    navigator.clipboard.writeText(text || '');
    setTitle('Copied');
  };

  const onExited = () => {
    setTitle('Copy to clipboard');
  };

  return (
    <TextWrap onClick={onClick}>
      <Tooltip
        title={title || ''}
        placement="top"
        arrow
        TransitionProps={{ onExited: onExited }}
      >
        <span>{text}</span>
      </Tooltip>
    </TextWrap>
  );
};

export default CopyText;
