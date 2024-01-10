import AuthLayout from "@/app/components/AuthLayout"

type Props = {
    children: React.ReactNode
}

const ForgotPasswordLayout = ({ children }: Props) =>{
    return(
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default ForgotPasswordLayout