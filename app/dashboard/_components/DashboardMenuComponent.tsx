'use client'

import { AppContext } from "@/app/providers/appContext";
import { validAdmin } from "@/app/utils/commonFunc";
import { DASHBOARD_PATH_NAME } from "@/app/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  ul {
    li {
      &:not(:last-child) {
        margin-bottom: 30px;
      }
      &:last-child {
        margin-bottom: 10px;
      }
    }
  }
`;

const DashboardMenuComponent = () =>{
    const pathname = usePathname()
    const { userInfo } = useContext(AppContext);

    const isRouteActive = (pathName: string) => pathname === `/${DASHBOARD_PATH_NAME}${pathName}`;
    return(
        <Wrapper>
            <ul>
                <li className={`${isRouteActive('') ? 'active' : ''}`}>
                <Link href={`/${DASHBOARD_PATH_NAME}`}>
                    <i className="icon-home"></i>Home
                </Link>
                </li>

                <li className={`${isRouteActive('/deposit') ? 'active' : ''}`}>
                <Link href={`/${DASHBOARD_PATH_NAME}/deposit`}>
                    <i className="icon-buy-nft"></i>Deposit
                </Link>
                </li>
                <li className={`${isRouteActive('/staking') ? 'active' : ''}`}>
                <Link href={`/${DASHBOARD_PATH_NAME}/staking`}>
                    <i className="icon-withdraw"></i>Staking
                </Link>
                </li>
                <li className={`${isRouteActive('/withdraw') ? 'active' : ''}`}>
                <Link href={`/${DASHBOARD_PATH_NAME}/withdraw`}>
                    <i className="icon-coin"></i>Withdraw
                </Link>
                </li>
                <li className={`${isRouteActive('/network-v2') ? 'active' : ''}`}>
                <Link href={`/${DASHBOARD_PATH_NAME}/network-v2`}>
                    <i className="icon-withdraw"></i>Network
                </Link>
                </li>
                <li className={`${isRouteActive('/info') ? 'active' : ''}`}>
                <Link href={`/${DASHBOARD_PATH_NAME}/info`}>
                    <i className="icon-info"></i>Info
                </Link>
                </li>

                {validAdmin(userInfo?.role) && (
                <>
                    <li>
                    <hr style={{ margin: 0 }}></hr>
                    </li>
                    <li className={`${isRouteActive('/management') ? 'active' : ''}`}>
                    <Link href={`/${DASHBOARD_PATH_NAME}/management`}>
                        <i className="icon-user"></i>Admin&nbsp;Deposit
                    </Link>
                    </li>

                    <li className={`${isRouteActive('/users') ? 'active' : ''}`}>
                    <Link href={`/${DASHBOARD_PATH_NAME}/users`}>
                        <i className="icon-user"></i>User&nbsp;Mngmt
                    </Link>
                    </li>

                    <li className={`${isRouteActive('/programs') ? 'active' : ''}`}>
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
        </Wrapper>
    )
}

export default DashboardMenuComponent