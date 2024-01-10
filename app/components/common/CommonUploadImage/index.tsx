import { Dispatch, useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import CameraIcon from '../../icons/CameraIcon';

interface Props {
  title?: string;
  src: string;
  setSrc: Dispatch<React.SetStateAction<string>>;
  inputRegister?: UseFormRegisterReturn;
  className?: string;
  circle?: boolean;
  width?: number | string;
  height?: number | string;
  objectFit: 'contain' | 'cover';
  disabled?: boolean;
}

interface CssProps {
  $circle?: boolean;
}

const Wrapper = styled.div<CssProps>`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: flex;
  position: relative;
  border-radius: ${(props) => (props.$circle ? '50%' : '8px')};
  color: black;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    z-index: 1;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    max-width: 100%;
    border-radius: ${(props) => (props.$circle ? '50%' : '8px')};
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
  }

  .hidden {
    z-index: 3;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    top: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      left: 0px;
    }
  }

  .button {
    z-index: 2;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    top: 0px;
    position: absolute;
    cursor: pointer;
    border-radius: ${(props) => (props.$circle ? '50%' : '8px')};
    opacity: 1;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: white;
    transition: opacity 0.3s;

    svg {
      margin-right: 8px;
    }

    &.change_img {
      opacity: 0;
    }
  }

  :hover {
    .button.change_img {
      opacity: 0.7;
    }
  }
`;

export default function CommonUploadImage(props: Props) {
  const {
    title = '',
    src,
    setSrc,
    inputRegister,
    className = '',
    circle,
    width = '100%',
    height = '200px',
    objectFit,
    disabled
  } = props;
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (file) {
      const objSrc = URL.createObjectURL(file);
      setSrc(objSrc);
      return () => URL.revokeObjectURL(objSrc);
    }
  }, [file]);

  return (
    <Wrapper
      className={`common_upload_image ${className}`}
      $circle={circle}
      style={{ width, height }}
    >
      <div className={`button ${src ? 'change_img' : ''}`}>
        <CameraIcon />
        <div>{src ? 'Change image' : title}</div>
      </div>

      {src && <img src={src} alt={title} style={{ objectFit }} />}

      <div className="hidden">
        <input
          disabled={disabled}
          type="file"
          accept="image/jpg,image/jpeg,image/png"
          {...inputRegister}
          onChange={(e) => setFile(e.target.files?.[0])}
        />
      </div>
    </Wrapper>
  );
}
