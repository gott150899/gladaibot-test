'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components';
// import '../../../public/assets/css/main.css'
const Wrapper = styled.div`
  .login__box {
    overflow-y: auto;
    height: 100vh;
  }

  @media (max-width: 768px) {
    .login__box {
      height: unset;
    }
  }
`;

type Props = {
    children: React.ReactNode
}

const AuthLayout = ({ children }: Props) =>{
    const pathname = usePathname()

    return(
      <Wrapper>
        <div className="login">
          <div className="wrapper">
            <div className="login__wrap">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-7">
                    <div className="login__banner">
                      <div className="login__banner__content">
                        <div>
                          <Link href="/">
                            <Image src='/images-v2/logo-login.svg' alt="Logo" width={251} height={282} />
                          </Link>
                          <p className="login__banner__title">
                            WELCOME TO THE WEBSITE
                          </p>
                        </div>
                      </div>

                      <div className="login__banner__footer">
                        <p>
                          Prosperty Fund is on a mission to provide users with
                          an easy investment optimization experience. We Create
                          a user-friendly and convenient ecosystem in the
                          future.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 login__box">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      // <div>
      //   <div className='bg-login h-[100vh]'>
      //     <div className='grid grid-cols-12 h-full'>
      //       <div className='col-span-7'>
      //         <div className='px-16 flex flex-col gap-6 justify-center items-center h-full'>
      //           <Link href="/">
      //             <Image src='/images-v2/logo-login.svg' alt="Logo" width={251} height={282} />
      //           </Link>
      //           <p className="text-white text-5xl font-bold">
      //             WELCOME TO THE WEBSITE
      //           </p>
      //           <p className='text-white font-bold text-xl text-center px-8'>
      //             Prosperty Fund is on a mission to provide users with
      //             an easy investment optimization experience. We Create
      //             a user-friendly and convenient ecosystem in the
      //             future.
      //           </p>
      //         </div>
      //       </div>
      //       <div className="col-span-5">
      //         <div className='h-full'>
      //           {children}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    )
}

export default AuthLayout