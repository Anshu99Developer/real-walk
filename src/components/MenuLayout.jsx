import LeftSideBarNav from "./LeftSideBarNav"

const MenuLayout = ({ children }) => {
    return (
        <div>
            <LeftSideBarNav />
            {children}
        </div>
    )
}

export default MenuLayout;