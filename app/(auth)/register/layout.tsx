import AuthLayout from "@/app/components/AuthLayout"

type Props = {
    children: React.ReactNode
}

const RegisterLayout = ({ children }: Props) =>{
    return(
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default RegisterLayout