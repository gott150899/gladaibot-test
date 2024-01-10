'use client'

import { AppContext } from "@/app/providers/appContext";
import { getUserNetworkApiV2 } from "@/app/utils/apis";
import { formatAmount } from "@/app/utils/commonFunc";
import { NetworkUserData } from "@/app/utils/models";
import { CircularProgress, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Wrapper } from "./styles";

interface RenderTreeListProps {
    user?: NetworkUserData;
    isFirst?: boolean;
    isLeft?: boolean;
}

const checkHasChild = (arr: NetworkUserData[], index: number, branch: string) => {
    //var test = arr?.slice(0, index).filter(x=>x.brandLeft?.child!=null || x.brandRight?.child!=null).length > 0
    for (var i = 0; i < index; i++) {
        if (branch == 'right') {
            var flag = arr[i].brandRight?.child?.filter(c => c.brandLeft != null).length;
            if (flag as number > 0) return true;
        }
        if (branch == 'left') {
            let flag = arr[i].brandLeft?.child?.filter(c => c.brandRight != null).length;
            if (flag as number > 0) return true;
        }
    }
    return false;
};
const renderTreeList = (props: RenderTreeListProps) => {
    const { user, isFirst = false, isLeft = false } = props;
  
    let brandLeft: NetworkUserData[] = isFirst ? user?.child?.filter((x) => x.brandLeft != null) as NetworkUserData[] : isLeft ? [] as NetworkUserData[] : user?.child?.filter((x) => x.brandLeft != null).slice(0, 1) as NetworkUserData[];
    let brandRight: NetworkUserData[] = isFirst ? user?.child?.filter((x) => x.brandRight != null) as NetworkUserData[] : !isLeft ? [] as NetworkUserData[] : user?.child?.filter((x) => x.brandRight != null).slice(0, 1) as NetworkUserData[];
    return (
      <>
        <ul>
          <li className="center">
            <Tooltip
              title={`Name: ${user?.lastName + ' ' + user?.firstName}, Total Revenue: ${formatAmount(user?.deposit)} BNB`}
              placement={isFirst ? 'top' : isLeft ? 'left' : 'right'}
            >
              <p><a href="#" title={`${user?.customerId}`}>{user?.email}</a></p>
            </Tooltip>
          </li>
          {brandLeft.length > 0 && (
            <ul className='left'>
              {brandLeft.map((x, index) => (
                brandLeft.length > 0 && (x.brandLeft?.child as NetworkUserData[])?.filter((r) => r.brandRight != null).length > 0 ?
                    <li className={"pad-left has-child "} key={index}>
                        { renderTreeList({ user: x.brandLeft, isLeft: true }) }
                    </li>
                    :
                    <li key={index} className={"pad-left " +
                        (
                        // &&  brandLeft[brandLeft.length-1]!=x
                        checkHasChild(brandLeft, index, "left")
                            ? ("p-more-left-x1") : "")}>
                        <Tooltip
                        title={`Name: ${x.brandLeft?.lastName + ' ' + x.brandLeft?.firstName}, Total Revenue: ${formatAmount(x.brandLeft?.deposit)} BNB`}
                        placement={isFirst ? 'top' : isLeft ? 'left' : 'right'}
                        >
                        <p><a href="#" title={`${x.brandLeft?.customerId}`}> {x.brandLeft?.email}</a></p>
                        </Tooltip>
    
                    </li>
              ))}
  
  
            </ul>
          )}
          {brandRight.length > 0 && (
            <ul className='right'>
              {brandRight.map((x, index) => (
                // let abc = brandRight[index-1].child?.filter((x) => x.brandLeft != null).splice(0,1);
                brandRight.length > 0 && (x.brandRight?.child as NetworkUserData[])?.filter((r) => r.brandLeft != null).length > 0 ?
                  <li className={"pad-right has-child "} key={index}>{renderTreeList({ user: x.brandRight, isLeft: false })}</li>
                  :
                  <li key={index} className={"pad-right " +
                    (
                      // &&  brandRight[brandRight.length-1]!=x
                      checkHasChild(brandRight, index, "right")
                        ? ("p-more-right-x1 tt" + brandRight?.slice(0, index).filter(x => x.brandLeft?.child != null || x.brandRight?.child != null).length) : "")}>
                    <Tooltip
                      title={`Name: ${x.brandRight?.lastName + ' ' + x.brandRight?.firstName}, Total Revenue: ${formatAmount(x.brandRight?.deposit)} BNB`}
                      placement={isFirst ? 'top' : isLeft ? 'left' : 'right'}
                    >
                      <p><a href="#" title={`${x.brandRight?.customerId}`}>{x.brandRight?.email}</a></p>
                    </Tooltip>
                  </li>
              ))}
            </ul>
          )}
        </ul>
      </>
    );
};
  
type Props = {
  id?: number;
}

const NetworkV2PageComponent = ({ id }: Props) =>{
    const { userInfo, setToast } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [networkInfoV2, setNetworkInfoV2] = useState<NetworkUserData>();
  
    const getUserNetworkV2 = async (userId: number) => {
      try {
        setLoading(true);
        const res = await getUserNetworkApiV2(userId);
        setNetworkInfoV2(res.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setToast({
          msg: error,
          type: 'error',
        });
      }
    };
  
    useEffect(() => {
      if (id) {
        getUserNetworkV2(id);
        return;
      }
  
      if (userInfo.id) {
        getUserNetworkV2(userInfo.id);
      }
    }, [id, userInfo]);
  
    return (
      <Wrapper>
        <header className="ac__header mb-4">
          <div className="sub_dashbard_header col-xs-1">
            <h3 className="el__box__title">Network</h3>
            {loading && <CircularProgress size={30} />}
          </div>
        </header>
  
        {networkInfoV2 && (
          <div className="page_content">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="el__box -small">
                  <p>Total Commission</p>
                  <p className="el__box__textlarge">
                    {formatAmount(
                      networkInfoV2.commission +
                      networkInfoV2.commissionBalance +
                      networkInfoV2.commissionInterest
                    )}
                  </p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="el__box -small">
                  <p>Commission</p>
                  <p className="el__box__textlarge">{networkInfoV2.commission}</p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="el__box -small">
                  <p>Balance Commission</p>
                  <p className="el__box__textlarge">
                    {formatAmount(networkInfoV2.commissionBalance)}
                  </p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="el__box -small">
                  <p>Interest Commission</p>
                  <p className="el__box__textlarge">
                    {formatAmount(networkInfoV2.commissionInterest)}
                  </p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="el__box -small">
                  <p>Total Member</p>
                  <p className="el__box__textlarge">{networkInfoV2.totalMember}</p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="el__box -small">
                  <p>Revenue Left</p>
                  <p className="el__box__textlarge">
                    {formatAmount(networkInfoV2.revenueLeft)} BNB
                  </p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="el__box -small">
                  <p>Revenue Right</p>
                  <p className="el__box__textlarge">
                    {formatAmount(networkInfoV2.revenueRight)} BNB
                  </p>
                </div>
              </div>
            </div>
  
            {/* <div className="tree">
              <ul>
                <li>{renderTree({ user: networkInfo, isFirst: true })}</li>
              </ul>
            </div> */}
  
            <div className="root">
              {renderTreeList({ user: networkInfoV2, isFirst: true })}
            </div>
          </div>
        )}
      </Wrapper>
    );
  };

export default NetworkV2PageComponent