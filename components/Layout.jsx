import React from 'react';
import {Snackbar,Alert} from '@mui/material';
import Header from './Header';
import Footer from './Footer'
import { useSelector,useDispatch } from 'react-redux'
import { closeSk, getSnackbar } from '../services/Redux';
import Head from 'next/head';

const Layout = ({ children }) =>{ 
  const dispatch = useDispatch()
  const sk= useSelector(getSnackbar)
  const handleClose = ()=>{
    dispatch(closeSk())
  }
  return (

  <>
   <Head>
      <title>XBLog</title>
    </Head>
    <Header />
    {children}
    <Footer/>
    <Snackbar open={sk?.open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity={sk.type?sk.type:'success'} sx={{ width: '100%' }}>
    {sk.message}
  </Alert>
</Snackbar>
  </>
);
}
export default Layout;
