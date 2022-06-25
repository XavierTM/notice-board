
import { css } from '@emotion/css';
import { Button, TextField } from '@mui/material';
import Component from '@xavisoft/react-component';


const divLoginStyle = css({
   width: 300,
   '& .form-control': {
      margin: '10px auto'
   },
   borderRadius: 5,
   border: '1px solid #ccc',
   padding: 20
});


class Login extends Component {


   login = () => {

      const txtPinCode = document.getElementById('txt-pin-code');
      const pinCode = txtPinCode.value;

      if (!pinCode) {
         alert("Pin code is required.")
         return txtPinCode.focus();
      }

      if (pinCode !== '1111') {
         alert("Pin code is wrong.")
         return txtPinCode.focus();
      }


      window.App.redirect('/dashboard');


   }

   render() {

      return <div className='full-screen vhalign'>
         <div className={divLoginStyle}>

               <TextField
                  className='form-control'
                  label="Pin Code"
                  type="password"
                  variant="outlined"
                  fullWidth
                  id="txt-pin-code"
               />

               <Button fullWidth variant="contained" size="large" className='form-control' onClick={this.login}>
                     LOGIN
               </Button>
         </div>
      </div>
   }
}


export default Login;