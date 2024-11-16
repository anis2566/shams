import { Header } from "./_components/header"
import { MobileHeader } from "./_components/mobile-header"
import { Navbar } from "./_components/navbar"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full max-w-screen-xl mx-auto flex flex-col relative">
            <Header />
            <MobileHeader />
            <Navbar />
            <div className="mt-28 md:mt-0">
                {children}
            </div>
        </div>
    )
}

export default HomeLayout
