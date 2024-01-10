'use client'

import ConfirmDialog from '@/app/components/ConfirmDialog';
import CommonField from '@/app/components/common/CommonField';
import CommonTable from '@/app/components/common/CommonTable';
import CopyText from '@/app/components/common/CopyText';
import { AppContext } from '@/app/providers/appContext';
import { PopupMessageError, PopupMessageSuccess, PopupMessageWarning } from '@/app/utils/alertPopup';
import { getUserApi, getUsersApi, lockUserApi } from '@/app/utils/apis';
import { uniqueBy } from '@/app/utils/commonFunc';
import { GetUserRes, GetUsersRes, LockUserRes, UserData, UserProgramsData } from '@/app/utils/models';
import { CircularProgress, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    input[type='color']{
        margin: 0 2px;
        width: 50px;
        height: 18px;
    }
`;

const UserManagementPageComponent = () =>{
    const router = useRouter()
    const [showLocking, setShowLocking] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isLocking, setIsLocking] = useState(false);
    const [userId, setUserId] = useState('');
    const [currentUsers, setCurrentUsers] = useState<UserData[]>([]);
    const [currentUser, setCurrentUser] = useState<UserData>();
    const [users, setUsers] = useState<UserData[]>([]);
    const { setToast } = useContext(AppContext);
  
    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = async (prev: number = 0, next: number = 0, limit: number = 20) => {
      try {
        const res: GetUsersRes | undefined = await getUsersApi(prev, next, limit);
  
        if (!res?.success) {
          PopupMessageError(setToast, 'Get users is failed');
          return;
        }
  
        setCurrentUsers(users);
        setUsers(res.data);
        setLoading(false);
      } catch (error: any) {
        PopupMessageError(setToast, error);
        setLoading(false);
      }
    };
  
    const getUser = async (query: string) => {
      try {
        if (!query) {
          PopupMessageWarning(setToast, 'UserId or Email is invalid');
          return;
        }
  
        const res: GetUserRes | undefined = await getUserApi(query);
  
        if (!res?.success || !res.data) {
          PopupMessageError(setToast, 'Get user is failed');
          return;
        }
  
        setCurrentUsers(users);
        setUsers([res.data]);
        setLoading(false);
      } catch (error: any) {
        PopupMessageError(setToast, error);
        setLoading(false);
      } finally {
        setUserId('');
      }
    };
  
    const prevHandler = async () => {
      console.log(users.first(), users.last());
      getUsers(users.first().id)
    }
  
    const nextHandler = async () => {
      console.log(users.first(), users.last());
      getUsers(0, users.last().id)
    }
  
    const searchHandler = async () => {
      await getUser(userId);
    };
  
    const gotoUserDetail = async (userId: string) => {
      router.push(`/dashboard/users/${userId}`);
    };
  
    const lockUser = async (userData: UserData) => {
      setIsLocking(true);
      try {
        if (!userData || !userData.userId) {
          PopupMessageWarning(setToast, 'UserId or Email is invalid');
          return;
        }
  
        const userId = userData.userId;
        const isLock = userData.isLockedOut;
        const res: LockUserRes | undefined = await lockUserApi(userId, !isLock);
        if (!res?.success || !res.data) {
          PopupMessageError(setToast, 'Get user is failed');
          return;
        }
  
        let user = users.find((x) => x.userId === userId) as UserData;
        if (user) {
          PopupMessageSuccess(
            setToast,
            `${user.userId} is ${isLock ? 'unlocked' : 'locked'}`
          );
  
          user.isLockedOut = !isLock;
        }
  
        setCurrentUsers(users);
        setUsers(users);
      } catch (error: any) {
        PopupMessageError(setToast, error);
        setLoading(false);
      } finally {
        setIsLocking(false);
        setCurrentUser({} as UserData);
      }
    };
  
    const clearHandler = async () => {
      setUsers(currentUsers);
    };
  
    const popupLockingMessage = async (user: UserData) => {
      setCurrentUser(user);
      setShowLocking(true);
    };
  
    const closeLockingMessage = async () => {
      setCurrentUser({} as UserData);
      setShowLocking(false);
    };
  
    const buildUserPrograms = (userPrograms?: UserProgramsData[]) => {
      if (!userPrograms) return '';
  
      const userProgramsElements =
        uniqueBy(userPrograms
          .map((p) => ({
            programColor: p.programInfo[0]?.programColor,
            interestRate: p.programInfo[0]?.interest_rate,
            dayBlock: p.programInfo[0]?.day_block,
            status: p.status,
            correlation: p.correlation,
            type: p.type,
            id: p.id,
            customerId: p.customer_id,
          })), (item) => item.type === 'Full' ? item.id : item.correlation)
          .sort((a, b) => b.interestRate - a.interestRate || a.dayBlock - b.dayBlock)
          .map((p) => <><input
            type="color"
            name="programColor"
            value={p.programColor || '#ffffff'}
            disabled
          /><br /></>)
  
      return userProgramsElements;
    };
  
    return (
      <Wrapper>
        <header className="ac__header mb-4">
          <div className="sub_dashbard_header">
            <h3 className="el__box__title">User Management</h3>
            {loading && <CircularProgress size={30} />}
          </div>
        </header>
  
        <header className="ac__header mb-4">
          <h6 className="ac__header__sub mb-3">USERs</h6>
        </header>
        <div className="row">
          <div className="col-md">
            <div className="el__box -small">
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-1">Search User ID or Email</p>
                  <CommonField
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <div className="row d-flex just-content-space-around">
                    <div className="col-sm">
                      <div className="mt-md-4">
                        <button className="el__box__btn" onClick={searchHandler}>
                          Search
                        </button>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="mt-md-4">
                        <button className="el__box__btn" onClick={clearHandler}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <CommonTable vBorder loading={loading} className="h-scrollbar">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">IsLock</TableCell>
              <TableCell align="center">UserID</TableCell>
              <TableCell align="center">UserName</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">PhoneNumber</TableCell>
              <TableCell>Programs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell align="center">
                  <button
                    className="el__box__copy w-100 mb-2"
                    onClick={() => gotoUserDetail(u.userId)}
                  >
                    Detail
                  </button>
                  <br />
  
                  <button
                    className="el__box__copy w-100"
                    disabled={isLocking}
                    onClick={() => popupLockingMessage(u)}
                  >
                    {u.isLockedOut ? 'Unlock' : 'Lock'}
                  </button>
                </TableCell>
                <TableCell align="center">
                  {u.isLockedOut && <i className="icon-lock fs-4"></i>}
                </TableCell>
                <TableCell>
                  <CopyText text={u.userId} />
                </TableCell>
                <TableCell>{u.userName}</TableCell>
                <TableCell>
                  <CopyText text={u.email} />
                </TableCell>
                <TableCell>{u.phoneNumber}</TableCell>
                <TableCell>{buildUserPrograms(u.userProgramsData)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </CommonTable>
        <div className="ms-auto col-md-3 mt-4">
          <div className="el__box -small">
            <div className="row d-flex just-content-space-around">
              <div className="col">
                <button className="w-100 el__box__btn" onClick={prevHandler}>
                  Prev
                </button>
              </div>
              <div className="col">
                <button className="w-100 el__box__btn" onClick={nextHandler}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <ConfirmDialog
          open={showLocking}
          onClose={() => closeLockingMessage()}
          onConfirm={() => lockUser(currentUser as UserData)}
          msg={
            <>
              {currentUser?.isLockedOut ? 'Unlock' : 'Lock'} user{' '}
              {currentUser?.email}
            </>
          }
        />
      </Wrapper>
    );
  }

export default UserManagementPageComponent