import DashboardLayoutComponent from "./_components/DashboardLayoutComponent";

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) =>{
    return(
      <DashboardLayoutComponent>
        {children}
      </DashboardLayoutComponent>
    )
}

export default DashboardLayout