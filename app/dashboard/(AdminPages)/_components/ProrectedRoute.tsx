'use client'

import { AppContext } from "@/app/providers/appContext";
import { validAdmin } from "@/app/utils/commonFunc";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

type Props = {
    children: React.ReactNode
}

const ProrectedRoute = ({ children }: Props) =>{
    const router = useRouter()
    const { userInfo } = useContext(AppContext);

    useEffect(() =>{
        if(!validAdmin(userInfo?.role)){
            router.push('/dasboard')
        }
    }, [userInfo, router])

    return children
}

export default ProrectedRoute