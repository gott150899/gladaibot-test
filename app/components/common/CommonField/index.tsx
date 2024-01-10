'use client'

import { Tooltip, useMediaQuery } from '@mui/material';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { DEFAULT_COPY_TEXT, MOBILE_QUERY } from '../../../utils/constants';
import { AppContext } from '@/app/providers/appContext';

interface Props {
  name?: string;
  className?: string;
  label?: any;
  afterLabel?: string;
  checked?: boolean;
  value?: string | number;
  type: 'text' | 'number' | 'date' | 'password' | 'email';
  onChange?: (e: any) => void;
  onKeyPress?: (e: any) => void;
  leftTextOrIcon?: JSX.Element | string;
  rightTextOrIcon?: JSX.Element | string;
  onClickRightTextOrIcon?: () => void;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  pattern?: string;
  defaultValue?: string | number;
  style?: any;
  borderRadius?: number;
  onEnter?: () => void;
  rightBtnText?: string;
  onClickRightBtn?: () => void;
  rightBtnCopyText?: string;
}

const CustomField = styled.div`
  position: relative;

  .right_btn {
    background-color: #00384f;
    display: flex;
    align-items: center;
    padding: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
      background-color: #00384f;
      color: #ffffff;
      box-shadow: 0 0 10px #fff;
      background: #0c4264;
    }
  }

  input,
  .right_btn {
    height: 40px;
  }

  .input_wrap {
    display: flex;
    align-items: center;
    border: 1px solid #9e9e9e;
    transition: all 0.5s;

    &:focus-within {
      box-shadow: 0 0 5px #fff;
    }
  }

  input {
    display: flex;
    align-items: center;
    flex: 1;
    outline: none;
    box-sizing: border-box;
    color: white;
    font-size: 14px;
    border: 2px solid transparent;
    background-color: transparent;
    padding: 0 12px;
    width: 100%;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const CommonField = (props: Props) => {
  const {
    type,
    name,
    value,
    leftTextOrIcon,
    rightTextOrIcon,
    onClickRightTextOrIcon,
    label,
    afterLabel = '',
    onChange,
    onKeyPress,
    disabled,
    placeholder,
    required,
    pattern,
    defaultValue,
    style,
    readonly,
    borderRadius,
    className,
    onEnter,
    rightBtnText,
    onClickRightBtn,
    rightBtnCopyText,
  } = props;
  const [copyTitle, setCopyTitle] = useState(DEFAULT_COPY_TEXT);
  const { setToast } = useContext(AppContext);
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const onEnterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter && onEnter();
      e.currentTarget.blur();
    }
  };

  const onClickCopy = () => {
    if (rightBtnCopyText === undefined) return;
    navigator.clipboard.writeText(rightBtnCopyText);

    if (isMobile) {
      setToast({
        msg: 'Copied',
        type: 'success',
      });
    } else {
      setCopyTitle('Copied');
    }
  };

  const onExitedCopy = () => {
    setCopyTitle(DEFAULT_COPY_TEXT);
  };

  const clickRightBtn = () => {
    onClickRightBtn?.();
    rightBtnCopyText !== undefined && onClickCopy();
  };

  return (
    <CustomField className={'custom-field ' + (className || '')} style={style}>
      {label && <label htmlFor={name}>{label + afterLabel}</label>}
      <div
        className="input_wrap"
        style={{
          paddingLeft: leftTextOrIcon && 12,
          paddingRight: rightTextOrIcon && 12,
          cursor: disabled || readonly ? 'unset' : '',
          borderRadius: borderRadius || 4,
        }}
      >
        {leftTextOrIcon && <div className="left_icon">{leftTextOrIcon}</div>}
        <input
          type={type || 'text'}
          name={name}
          value={value}
          defaultValue={defaultValue}
          pattern={pattern}
          onChange={onChange}
          disabled={disabled}
          readOnly={readonly}
          placeholder={
            !readonly && (placeholder || label && `Input your ${label}`) || ''
          }
          autoFocus
          required={required}
          onKeyPress={onKeyPress}
          onKeyDown={onEnterInput}
          style={{
            cursor: disabled || readonly ? 'unset' : '',
          }}
        />
        {rightTextOrIcon && (
          <div className="right_icon" onClick={onClickRightTextOrIcon}>
            {rightTextOrIcon}
          </div>
        )}
        {rightBtnText && (
          <Tooltip
            open={rightBtnCopyText === undefined ? false : undefined}
            title={copyTitle}
            placement="right"
            TransitionProps={{
              onExited: onExitedCopy,
            }}
            arrow
          >
            <div
              className="right_btn global_transition"
              style={{
                borderRadius: borderRadius
                  ? `0px ${borderRadius}px ${borderRadius}px 0px`
                  : '0px 4px 4px 0px',
              }}
              onClick={clickRightBtn}
            >
              {rightBtnText}
            </div>
          </Tooltip>
        )}
      </div>
    </CustomField>
  );
};

export default CommonField;
