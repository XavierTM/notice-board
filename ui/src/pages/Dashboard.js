import { css } from "@emotion/css";
import { Button, TextField } from "@mui/material";
import Component from "@xavisoft/react-component";
import axios from 'axios';



function getErrorStatus(err) {
   if (err && err.response && err.response.status)
      return parseInt(err.response.status);
   return -1;
}


const divCenteredStyled = css({
   width: 300,
   padding: 20,
   border: '1px grey solid',
   '& .form-control': {
      margin: '10px auto'
   }
})


class Dashboard extends Component {

   logout = () => {
      window.App.redirect('/');
   }

   post = async () => {
      const txtNotice = document.getElementById('txt-notice');
      const notice = txtNotice.value;

      if (!notice) {
         alert('Please enter the message to be displayed on the notice board');
         return txtNotice.focus();
      }

      try {
         await axios.post('/api/notices', { notice });
         txtNotice.value = '';
         alert('Message posted.');
      } catch (err) {

         console.log(err);
         
         const status = getErrorStatus(err);

         if (status === 0)
            alert('No internet connection.')
         else
            alert(String(err));
      }
   }


   clear = async () => {

      try {
         await axios.delete('/api/notices');
         alert('Noticeboard cleared');
      } catch (err) {
         alert(String(err));
      }
   }

   render() {

      return <div className="vhalign full-screen">
         <div className={divCenteredStyled}>

            <TextField
               multiline
               label="Notice"
               id="txt-notice"
               fullWidth
               className="form-control"
            />

            <div 
               className="form-control"
               style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gridColumnGap: 10
               }}
            >
               <div>
                  <Button
                     variant="outlined"
                     onClick={this.logout}
                     fullWidth
                  >
                     LOGOUT
                  </Button>
               </div>

               <div>
                  <Button
                     variant="contained"
                     onClick={this.post}
                     fullWidth
                  >
                     POST
                  </Button>
               </div>

               <div>
                  <Button
                     variant="outlined"
                     onClick={this.clear}
                     fullWidth
                  >
                     CLEAR
                  </Button>
               </div>
            </div>


         </div>
      </div>
   }
}

export default Dashboard;