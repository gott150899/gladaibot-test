import AuthLayout from "@/app/components/AuthLayout"

type Props = {
    children: React.ReactNode
}

const VerifySignupLayout = ({ children }: Props) =>{
    return(
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default VerifySignupLayout