import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';
import { closeBackdrop, getBackdrop, setSnackbar } from '../services/Redux';


function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

export default function Backdrops() {
    const dispatch = useDispatch()
  const open = useSelector(getBackdrop)



  return (
    <div>
    
      <Backdrop
        sx={{ color: '#fff', zIndex: 999, display:'flex', alignItems:'center', justifyContent:'center'}}
        open={open}
        
      >
          <ReactLoading type='spinningBubbles' color='white' height={'20%'} width={'20%'} />
      </Backdrop>
    </div>
  );
}
