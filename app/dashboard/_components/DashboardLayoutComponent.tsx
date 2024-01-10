'use client'

import styled from 'styled-components';
import DashboardHeader from './DashboardHeader';
import DashboardMenuComponent from './DashboardMenuComponent';
import Link from 'next/link';

const spaceHeaderAndContent = 28;

const Wrapper = styled.div`
  .sub_dashbard_header {
    display: flex;
    margin-bottom: 24px;

    .el__box__title {
      margin-bottom: 0;
      margin-right: 12px;
    }
  }

  .header {
    height: var(--header-height);
  }

  .account__wrapper {
    padding-top: 0;
    height: calc(100vh - var(--header-height));
    min-height: unset;
    overflow: hidden;

    .col--left {
      height: fit-content;
      margin-top: ${spaceHeaderAndContent}px;
      overflow: auto;
      max-height: calc(
        100vh - var(--header-height) - ${spaceHeaderAndContent}px
      );
    }

    .col--right {
      padding-top: ${spaceHeaderAndContent}px;
      overflow: auto;
      height: calc(100vh - var(--header-height));
    }
  }

  .account__sidebar {
    padding: 24px;
  }

  .col--right {
    padding-bottom: 28px;
  }

  @media (max-width: 768px) {
    .account__wrapper {
      .col--right {
        padding-bottom: 80px;
      }
    }
  }
`;


type Props = {
    children: React.ReactNode
}

const DashboardLayoutComponent = ({ children }: Props) =>{
    return(
        <Wrapper>
            <div className="account">
              <DashboardHeader />

              <div className="account__wrapper">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-3 col--left d-none d-lg-block">
                      <div className="account__sidebar">
                        <DashboardMenuComponent />
                      </div>
                    </div>

                    <div className="col col--right">
                      <div className="account__content">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>

                <nav id="menu__mobile" className="nav__mobile">
                  <div className="nav__mobile__content px-3">
                    <div className="header__group">
                      <Link href="" className="header__btn">
                        TAKING
                      </Link>
                      <Link href="" className="header__btn">
                        FARMING
                      </Link>
                      <Link href="" className="header__btn">
                        WAP
                      </Link>
                    </div>

                    <ul className="nav__mobile--ul">
                      <li className="active">
                        <Link href="user-home.html">
                          <i className="icon-home"></i>Home
                        </Link>
                      </li>
                      <li className="menu-item-has-children">
                        <Link href="">
                          <i className="icon-buy-nft"></i>Buy BNB
                        </Link>
                        <ul className="sub-menu">
                          <li className="menu-item">
                            <Link href="">Buy BNB</Link>
                          </li>
                          <li className="menu-item">
                            <Link href="">Buy BNB</Link>
                          </li>
                          <li className="menu-item">
                            <Link href="">Buy BNB</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="staking.html">
                          <i className="icon-coin"></i>Stake
                        </Link>
                      </li>
                      <li>
                        <Link href="">
                          <i className="icon-withdraw"></i>Withdraw
                        </Link>
                      </li>
                      <li>
                        <Link href="user-info.html">
                          <i className="icon-info"></i>Info
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
        </Wrapper>
    )
}

export default DashboardLayoutComponent