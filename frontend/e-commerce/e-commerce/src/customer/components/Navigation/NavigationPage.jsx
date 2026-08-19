'use client';
import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { ShoppingCart, ExpandMore, Search } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  InputBase,
  Badge,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../../state/Auth/Action';
import { getCart } from '../../../state/Cart/Action';
import AuthModel from '../../Auth/AuthModel';
import { navigation } from './navigationData';

export default function FlipkartUnifiedNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const openUserMenu = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const { auth, cart } = useSelector((store) => store);

  const handleSearch = () => {
    if (searchKeyword.trim() !== '')
      navigate(`/search-results?query=${searchKeyword}`);
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSearch();

  const handleUserClick = (e) => setAnchorEl(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate('/');
  };

  const handleOpen = () => setOpenAuthModel(true);
  const handleClose = () => setOpenAuthModel(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart());
    }
  }, [jwt]);

  useEffect(() => {
    if (auth.user) handleClose();
  }, [auth.user]);

  return (
    <header className="sticky top-0 z-50 font-sans bg-ink-900/95 backdrop-blur-md border-b border-white/10">
      {/* Top strip */}
      <div className="hidden lg:block bg-ink-700 border-b border-white/5">
        <div className="px-6 lg:px-12 py-1.5 flex items-center justify-between text-[11px] tracking-wide text-ink-200 font-mono-tech">
          <span>FREE SHIPPING ON ORDERS OVER ₹999 </span>
          <span className="text-volt-400">TRACK ORDER</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3 lg:px-12 gap-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none shrink-0"
          onClick={() => navigate('/')}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-volt-500 to-volt-700 shadow-glow">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none">
              <path d="M13 2 3 14h7l-1 8 11-14h-7l0-6z" fill="currentColor" />
            </svg>
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight text-white">
            NOVA<span className="text-volt-400">TECH</span>
          </span>
        </div>

        {/* Category Menu */}
        <PopoverGroup className="hidden lg:flex space-x-1 items-center">
          {navigation.categories.map((category) => (
            <Popover key={category.name} className="relative">
              <PopoverButton className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink-100 hover:text-volt-400 hover:bg-white/5 transition-colors focus:outline-none">
                {category.name}
                <ExpandMore className="text-current" fontSize="small" />
              </PopoverButton>

              {/* Dropdown Panel */}
              <PopoverPanel className="absolute left-0 top-full z-20 mt-2 bg-ink-600 shadow-2xl rounded-xl text-ink-50 border border-white/10 overflow-hidden">
                <div className="p-6 grid grid-cols-3 gap-8 w-[650px]">
                  {category.sections.map((section) => (
                    <div key={section.name}>
                      <p className="font-display font-bold text-sm uppercase tracking-wide text-volt-400 mb-3 border-b border-white/10 pb-2">
                        {section.name}
                      </p>
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li
                            key={item.name}
                            className="text-ink-100 hover:text-white hover:translate-x-0.5 font-medium cursor-pointer transition-all duration-150 text-sm"
                            onClick={() =>
                              navigate(`/${category.id}/${section.id}/${item.id}`)
                            }
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
          ))}
        </PopoverGroup>

        {/* Search Bar */}
        <div className="flex flex-1 max-w-xl bg-ink-600/70 border border-white/10 rounded-lg items-center px-3 py-1.5 focus-within:border-volt-500 focus-within:shadow-glow transition-all">
          <Search className="text-ink-200" fontSize="small" />
          <InputBase
            placeholder="Search laptops, phones, headphones..."
            fullWidth
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
            sx={{
              ml: 1,
              color: '#F4F6FB',
              fontSize: 14,
              '& input::placeholder': { color: '#8993AC', opacity: 1 },
            }}
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5 text-ink-50 text-sm font-medium shrink-0">
          {/* Login / Profile */}
          {auth.user ? (
            <div className="relative">
              <div
                onClick={handleUserClick}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <Avatar sx={{ bgcolor: '#4F7CFF', width: 30, height: 30, fontSize: 14, fontWeight: 700 }}>
                  {auth.user.firstName[0].toUpperCase()}
                </Avatar>
                <span className="hidden xl:inline group-hover:text-volt-400 transition-colors">{auth.user.firstName}</span>
                <ExpandMore className="!text-ink-200" fontSize="small" />
              </div>
              <Menu
                anchorEl={anchorEl}
                open={openUserMenu}
                onClose={handleCloseUserMenu}
                slotProps={{
                  paper: {
                    sx: {
                      bgcolor: '#111729',
                      color: '#F4F6FB',
                      border: '1px solid rgba(255,255,255,0.08)',
                      mt: 1,
                    },
                  },
                }}
              >
                <MenuItem sx={{ '&:hover': { bgcolor: 'rgba(79,124,255,0.12)' } }} onClick={() => navigate('/account/profile')}>
                  My Profile
                </MenuItem>
                <MenuItem sx={{ '&:hover': { bgcolor: 'rgba(79,124,255,0.12)' } }} onClick={() => navigate('/account/order')}>
                  Orders
                </MenuItem>
                <MenuItem sx={{ '&:hover': { bgcolor: 'rgba(79,124,255,0.12)' } }} onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{
                textTransform: 'none',
                bgcolor: '#4F7CFF',
                color: '#fff',
                fontWeight: 700,
                borderRadius: '8px',
                px: 2.5,
                boxShadow: '0 0 0 1px rgba(79,124,255,0.4), 0 8px 20px -6px rgba(79,124,255,0.6)',
                '&:hover': { bgcolor: '#2F5CF0' },
              }}
            >
              Sign In
            </Button>
          )}

          {/* Cart */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-volt-400 transition-colors"
            onClick={() => navigate('/cart')}
          >
            <Badge
              badgeContent={cart.cart?.cartItems?.length || 0}
              sx={{ '& .MuiBadge-badge': { bgcolor: '#FFB13B', color: '#070B14', fontWeight: 700 }, mr: 0.5 }}
            >
              <ShoppingCart />
            </Badge>
            <span className="hidden md:inline">Cart</span>
          </div>
        </div>
      </div>

      <AuthModel handleClose={handleClose} open={openAuthModel} />
    </header>
  );
}
