import AuthLayout from "@/app/components/AuthLayout"

type Props = {
    children: React.ReactNode
}

const LoginLayout = ({ children }: Props) =>{
    return(
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default LoginLayout