import React, { useState, useEffect, useContext } from 'react'
import '../CSS/Navbar.css'
import '../Resp-css/Navbar-Resp.css'
import {
  ShoppingCartOutlined,
  PersonOutline,
  SearchOutlined,
  PhoneAndroidOutlined,
  CloseOutlined,
  ExitToApp,
  LocalMallOutlined,
  AccountCircle,
  Menu,
} from '@material-ui/icons'
import { CartContext } from '../Contexts/CartProvider'
import { useNavigate, useLocation } from 'react-router-dom'
import { Loading } from './Loading'
import { DrawerUI } from './DrawerUI'

export const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { count, getCount } = useContext(CartContext)
  const [search, setSearch] = useState('')
  const [state, setState] = useState(false)
  const [width, setWidth] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  let authToken = JSON.parse(localStorage.getItem('userToken'))
  let isLoggedIn = false
  if (authToken) {
    isLoggedIn = true
  }

  useEffect(() => {
    window.addEventListener('resize', reportWindowSize)
    getCount()
    return () => {
      window.removeEventListener('resize', reportWindowSize)
    }
  }, [])

  const reportWindowSize = () => {
    setWidth(window.innerWidth)
  }

  const handleChange = (e) => {
    const { value } = e.currentTarget
    setSearch(value)
  }

  const handleCancel = () => {
    setSearch('')
  }

  const handleLogout = () => {
    setIsLoading(true)
    localStorage.removeItem('userToken')
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  if (isLoading) return <Loading />
  return (
    <div className="contactBox">
      <div className="leftView">
        <div className="title" onClick={() => navigate('/')}>
          <img src={require('../images/meeshoLogo.png')} alt="" />
        </div>
        <div className="inputField">
          <SearchOutlined
            style={{ fontSize: width < '1145' ? 35 : 40 }}
            className="searchIcon"
          />
          <input
            type="text"
            value={search}
            placeholder="Try Saree, Kurti or Search by Product Code"
            className="input"
            onChange={handleChange}
          />
          {search.length !== 0 && (
            <CloseOutlined
              style={{ fontSize: 30, color: '#666666' }}
              className="closeIcon"
              onClick={handleCancel}
            />
          )}
        </div>
      </div>

      <div className="rightView">
        <div className="rightViewContent">
          <div className="app">
            <PhoneAndroidOutlined
              style={{
                fontSize: width < '1335' ? 25 : width < '1145' ? 22 : 30,
                color: '#666666',
              }}
            />
            <h3>Download App</h3>
          </div>
          <span className="vrDivider"></span>
          <div className="cdd">
            <h3>Become a Supplier</h3>
          </div>
          <span className="vrDivider"></span>
        </div>
        <div className="user">
          <div className="profile">
            <PersonOutline
              style={{
                fontSize: width < '1145' ? 30 : 35,
                paddingTop: width < '1145' ? 2 : 0,
                color: '#666666',
              }}
            />
            <h3>Profile</h3>
            <div className="profileDetail">
              {isLoggedIn ? (
                <>
                  <div className="userView">
                    <AccountCircle style={{ fontSize: 60, color: '#f7f9ff' }} />
                    <div className="userContent">
                      <h2>Hello User</h2>
                      <p>+8605817892</p>
                    </div>
                  </div>
                  <div className="hrDivider1"></div>
                  <div className="logoutView">
                    <LocalMallOutlined
                      style={{ fontSize: 30, color: 'black' }}
                    />
                    <p>My Orders</p>
                  </div>
                  <div className="hrDivider1"></div>
                  <div className="logoutView" onClick={() => handleLogout()}>
                    <ExitToApp style={{ fontSize: 30, color: 'black' }} />
                    <p>Logout</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="newUserView">
                    <div className="newUserContent">
                      <h2>Hello User</h2>
                      <p>To access your meesho account</p>
                    </div>
                  </div>
                  <div
                    className="newSignUpBtn"
                    onClick={() => navigate('/auth/signup')}
                  >
                    <p>Sign Up</p>
                  </div>
                  <div className="hrDivider1"></div>
                  <div className="logoutView">
                    <LocalMallOutlined
                      style={{ fontSize: 30, color: 'black' }}
                    />
                    <p>My Orders</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            className="dd"
            onClick={() =>
              isLoggedIn ? navigate('/checkout/cart') : navigate('/auth/signup')
            }
          >
            {count > 0 && (
              <div className="count">
                <p>{count}</p>
              </div>
            )}
            <ShoppingCartOutlined
              style={{ fontSize: width < '1145' ? 30 : 35, color: '#666666' }}
            />
            <h3>Cart</h3>
          </div>
        </div>
      </div>
      <div className="respContactBox">
        <Menu
          style={{ fontSize: 30, color: 'black' }}
          onClick={() => setState(true)}
        />
        <div className="dd">
          <ShoppingCartOutlined
            style={{ fontSize: width < '1145' ? 30 : 35, color: '#666666' }}
          />
        </div>
      </div>
      <DrawerUI
        open={state}
        onClose={() => setState(false)}
        onOpen={() => setState(true)}
        width={width}
        handleLogout={handleLogout}
      />
    </div>
  )
}
