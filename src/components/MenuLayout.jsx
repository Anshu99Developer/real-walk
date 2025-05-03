import LeftSideBarNav from "./LeftSideBarNav"

const MenuLayout = ({ children }) => {
    return (
        <div className="h-[100dvh]">
            <LeftSideBarNav />
            {children}
        </div>
    )
}

export default MenuLayout;