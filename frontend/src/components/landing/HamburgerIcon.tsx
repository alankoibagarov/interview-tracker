
interface HamburgerIconProps {
    scrolled: boolean;
    isMenuOpen: boolean;
}

const HamburgerIcon = ({ scrolled, isMenuOpen }: HamburgerIconProps) => {
    return (
    <div className="w-6 h-6 flex flex-col justify-center items-center gap-[5px]">
        {/* Top bar */}
        <div
            className={`w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${
                scrolled ? "bg-slate-900" : "bg-white"
            } ${
                isMenuOpen ? "rotate-45 translate-y-[7px]" : "rotate-0"
            }`}
        />
        {/* Middle bar */}
        <div
            className={`w-6 h-[2px] rounded-full transition-all duration-300 ${
                scrolled ? "bg-slate-900" : "bg-white"
            } ${
                isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
        />
        {/* Bottom bar */}
        <div
            className={`w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${
                scrolled ? "bg-slate-900" : "bg-white"
            } ${
                isMenuOpen ? "-rotate-45 -translate-y-[7px]" : "rotate-0"
            }`}
        />
    </div>
    )
}

export default HamburgerIcon