"use client"

/* eslint-disable no-unused-vars */
import { useState } from "react"
import Search from "./Search"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaRegCircleUser } from "react-icons/fa6"
import useMobile from "../hooks/useMobile"
import { BsCart4 } from "react-icons/bs"
import { useSelector } from "react-redux"
import { GoTriangleDown, GoTriangleUp } from "react-icons/go"
import UserMenu from "./UserMenu"
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees"
import { useGlobalContext } from "../provider/GlobalProvider"
import DisplayCartItem from "./DisplayCartItem"

const Header = () => {
  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const cartItem = useSelector((state) => state.cartItem.cart)
  const { totalPrice, totalQty } = useGlobalContext()
  const [openCartSection, setOpenCartSection] = useState(false)

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }
    navigate("/user")
  }

  return (
    <header className="h-24 lg:h-20 sticky top-0 z-40 flex flex-col justify-center gap-1 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 shadow-lg border-b border-emerald-100">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between px-4">
          {/**logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center group">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-xl">🍄‍🟫 </span>
                </div>
                <div className="text-white font-bold text-xl tracking-wide">Freshora</div>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium ml-8">
            <Link to="/" className="hover:text-emerald-600 transition-colors duration-200 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link to="/AboutUs" className="hover:text-emerald-600 transition-colors duration-200 relative group">
              AboutUs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
          </nav>

          {/**Search */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <Search />
          </div>

          {/**login and my cart */}
          <div className="flex items-center gap-4">
            {/**user icons display in only mobile version**/}
            <button
              className="text-emerald-600 lg:hidden p-2 rounded-full hover:bg-emerald-50 transition-colors duration-200"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser size={26} />
            </button>

            {/**Desktop**/}
            <div className="hidden lg:flex items-center gap-6">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((preve) => !preve)}
                    className="flex select-none items-center gap-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors duration-200 text-gray-700 font-medium"
                  >
                    <FaRegCircleUser size={20} />
                    <p>Account</p>
                    {openUserMenu ? <GoTriangleUp size={16} /> : <GoTriangleDown size={16} />}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded-xl p-4 min-w-52 shadow-xl border border-emerald-100">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-4 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <div className="relative">
                  <BsCart4 size={22} />
                  {cartItem[0] && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {totalQty}
                    </span>
                  )}
                </div>
                <div className="text-sm">
                  {cartItem[0] ? (
                    <div className="text-left">
                      <p className="leading-tight">{totalQty} Items</p>
                      <p className="text-xs opacity-90">{DisplayPriceInRupees(totalPrice)}</p>
                    </div>
                  ) : (
                    <p>My Cart</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:hidden">
        <Search />
      </div>

      {openCartSection && <DisplayCartItem close={() => setOpenCartSection(false)} />}
    </header>
  )
}

export default Header
