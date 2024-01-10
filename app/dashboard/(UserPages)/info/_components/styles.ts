'use client'

import styled from 'styled-components';

export const Wrapper = styled.div`
  .identity_wrap {
    margin-bottom: 40px;

    .upload {
      .common_upload_image {
        border: white solid 1px;
      }
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-top: 50px;
      margin-bottom: 20px;
    }

    .card_imgs {
      display: grid;
      grid-template-columns: repeat(4, 25%);
      margin-bottom: 24px;
      gap: 12px;

      .card_sample {
        text-align: center;
      }
    }

    .requirements {
      p {
        display: block;
        svg {
          margin-top: -7px;
        }
      }
    }

    .file_text {
      font-style: italic;
      margin-bottom: 8px;
      font-size: 13px;
    }

    .upload {
      display: flex;
      gap: 12px;
    }
  }

  .inputs {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    gap: 24px;
    margin-top: 24px;
  }

  button {
    margin-left: 12px;
  }

  p {
    span {
      :nth-child(2) {
        font-weight: bold;
      }
    }
  }

  .wpuf-submit-button {
    cursor: pointer;
    text-align: center;

    color: #0b506b;
    background: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    border: 0;
    max-width: 200px;

    margin: 32px auto 0;
  }

  @media (max-width: 768px) {
    .inputs {
      grid-template-columns: repeat(1, 100%);
    }

    p {
      display: flex;
      flex-direction: column;
    }

    button {
      margin-left: 0;
      margin-top: 8px;
    }

    .identity_wrap {
      .card_imgs {
        grid-template-columns: repeat(2, 50%);
      }
    }
  }
`;
