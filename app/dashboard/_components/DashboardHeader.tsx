'use client'

import { GetUserInfoData } from "@/app/models/user.model";
import { AppContext } from "@/app/providers/appContext";
import { clearAllLS, validAdmin } from "@/app/utils/commonFunc";
import { DASHBOARD_PATH_NAME, STATIC_ENDPOINT } from "@/app/utils/constants";
import { Divider, Drawer, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
// import noAvatarImg from '/assets/img/no_avatar.jpg';
// import logo from '/images/logo.svg';

const noAvatarImg = ''
const logo = ''

const Wrapper = styled.div`
  header {
    display: flex;
    align-items: center;
    height: var(--header-height);

    img.avatar_header {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
      background-color: white;
    }

    .header__group {
      align-items: center;
    }
  }

  .email {
    margin: 0 16px;
  }
`;

const MobileMenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #0b506b;
  height: 100%;
  color: white;
  padding: 16px;

  .menu {
    display: flex;
    flex-direction: column;
    gap: 24px;

    li {
      a {
        width: 100%;
        color: #9e9e9e;

        i {
          margin-right: 8px;
        }
      }

      &.active {
        a {
          color: white;
        }
      }
    }
  }

  .user {
    display: flex;
    flex-direction: column;
    gap: 24px;

    a {
      width: 100%;
    }
  }
`;

const headerItems = [
    {
      name: 'DEPOSIT',
      route: `/${DASHBOARD_PATH_NAME}/deposit`,
    },
    {
      name: 'STAKING',
      route: `/${DASHBOARD_PATH_NAME}/staking`,
    },
    {
      name: 'WITHDRAW',
      route: `/${DASHBOARD_PATH_NAME}/withdraw`,
    },
];

const DashboardHeader = () =>{
    const router = useRouter()
    const pathname = usePathname()
    const { userInfo, setUserInfo, setToken } = useContext(AppContext);
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [profileMenuEl, setProfileMenuEl] = useState<null | HTMLElement>(null);

    useEffect(() =>{
        const tokenLS = localStorage.getItem('access_token');

        if(!tokenLS){
          router.push('/')
        }
    }, [router])
  
    const showMobileMenu = () => setOpenMobileMenu(true);
    const hideMobileMenu = () => setOpenMobileMenu(false);
  
    const clickLogout = () => {
      setUserInfo({} as GetUserInfoData);
      setToken('');
      clearAllLS();
    };
  
    const isRouteActive = (pathName: string) => pathname === `/${DASHBOARD_PATH_NAME}${pathName}`;
  
    const clickMobileMenu = () => {
      hideMobileMenu();
    };
  
    const showProfileMenu = (e: React.MouseEvent<HTMLElement>) => {
      setProfileMenuEl(e.currentTarget);
    };
    const hideProfileMenu = () => {
      setProfileMenuEl(null);
    };
  
    
      return (
        <Wrapper>
          <header className="header">
            <div className="container container-xxl d-flex align-items-center">
              <h1 className="logo">
                <Link href="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </h1>
  
              <div className="header__group ms-lg-auto d-none d-lg-flex">
                {headerItems.map((x) => (
                  <Link key={x.route} href={x.route} className="header__btn">
                    {x.name}
                  </Link>
                ))}
  
                {userInfo.id && (
                  <IconButton
                    onClick={showProfileMenu}
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    <img
                      className="avatar_header"
                      src={`${userInfo.avatar ? STATIC_ENDPOINT + userInfo.avatar + '?' + new Date().getTime() : noAvatarImg}`} alt="avatar"
                    />
                  </IconButton>
                )}
              </div>
  
              <div className="menu-mb__btn ms-auto" onClick={showMobileMenu}>
                <span className="iconz-bar"></span>
                <span className="iconz-bar"></span>
                <span className="iconz-bar"></span>
              </div>
            </div>
  
            <Drawer anchor="right" open={openMobileMenu} onClose={hideMobileMenu}>
              <MobileMenuWrap>
                <ul className="menu">
                  <li
                    className={`${isRouteActive('') ? 'active' : ''}`}
                    onClick={clickMobileMenu}
                  >
                    <Link href={`/${DASHBOARD_PATH_NAME}`}>
                      <i className="icon-home"></i>Home
                    </Link>
                  </li>
  
                  <li
                    className={`${isRouteActive('/deposit') ? 'active' : ''}`}
                    onClick={clickMobileMenu}
                  >
                    <Link href={`/${DASHBOARD_PATH_NAME}/deposit`}>
                      <i className="icon-buy-nft"></i>Deposit
                    </Link>
                  </li>
                  <li
                    className={`${isRouteActive('/staking') ? 'active' : ''}`}
                    onClick={clickMobileMenu}
                  >
                    <Link href={`/${DASHBOARD_PATH_NAME}/staking`}>
                      <i className="icon-withdraw"></i>Staking
                    </Link>
                  </li>
                  <li
                    className={`${isRouteActive('/withdraw') ? 'active' : ''}`}
                    onClick={clickMobileMenu}
                  >
                    <Link href={`/${DASHBOARD_PATH_NAME}/withdraw`}>
                      <i className="icon-coin"></i>Withdraw
                    </Link>
                  </li>
                  {/* <li
                    className={`${isRouteActive('/network') ? 'active' : ''}`}
                    onClick={clickMobileMenu}
                  >
                    <Link href={`/${DASHBOARD_PATH_NAME}/network`}>
                      <i className="icon-withdraw"></i>Network
                    </Link>
                  </li> */}
                  <li
                    className={`${isRouteActive('/network-v2') ? 'active' : ''}`}
                    onClick={clickMobileMenu}
                  >
                    <Link href={`/${DASHBOARD_PATH_NAME}/network-v2`}>
                      <i className="icon-withdraw"></i>Network
                    </Link>
                  </li>
                  <li
                    className={`${isRouteActive('/info') ? 'active' : ''}`}
                    onClick={clickMobileMenu}
                  >
                    <Link href={`/${DASHBOARD_PATH_NAME}/info`}>
                      <i className="icon-info"></i>Info
                    </Link>
                  </li>
  
                  {validAdmin(userInfo?.role) && (
                    <>
                      <hr style={{ margin: 0 }}></hr>
                      <li
                        className={`${isRouteActive('/management') ? 'active' : ''
                          }`}
                      >
                        <Link href={`/${DASHBOARD_PATH_NAME}/management`}>
                          <i className="icon-user"></i>Admin&nbsp;Deposit
                        </Link>
                      </li>
  
                      <li
                        className={`${isRouteActive('/users') ? 'active' : ''}`}
                      >
                        <Link href={`/${DASHBOARD_PATH_NAME}/users`}>
                          <i className="icon-user"></i>User&nbsp;Mngmt
                        </Link>
                      </li>
  
                      <li
                        className={`${isRouteActive('/programs') ? 'active' : ''
                          }`}
                      >
                        <Link href={`/${DASHBOARD_PATH_NAME}/programs`}>
                          <i className="icon-user"></i>Program&nbsp;Mngmt
                        </Link>
                      </li>
  
                      <li className={`${isRouteActive('/re-stakings') ? 'active' : ''}`}>
                        <Link href={`/${DASHBOARD_PATH_NAME}/re-stakings`}>
                          <i className="icon-user"></i>ReStaking&nbsp;Mngmt
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
  
                {userInfo.id && (
                  <div className="user">
                    <div className="email">{userInfo.email}</div>
  
                    <Link
                      href=""
                      className="header__btn"
                      onClick={clickLogout}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </MobileMenuWrap>
            </Drawer>
  
            <Menu
              anchorEl={profileMenuEl}
              id="account-menu"
              open={Boolean(profileMenuEl)}
              onClose={hideProfileMenu}
              onClick={hideProfileMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>{userInfo.email}</MenuItem>
              <Divider />
              <MenuItem onClick={clickLogout}>Logout</MenuItem>
            </Menu>
          </header>
        </Wrapper>
      );
  };

export default DashboardHeader