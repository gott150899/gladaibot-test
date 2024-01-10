import AuthLayout from "@/app/components/AuthLayout"

type Props = {
    children: React.ReactNode
}

const ResetPasswordLayout = ({ children }: Props) =>{
    return(
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default ResetPasswordLayout