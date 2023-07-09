import Button from '@mui/material/Button';
export function Welcomepage() {
    return (
        <div  style={{backgroundColor:"Aquamarine",textalign:"center",height:"100vh",padding:"40vh"}}>
            <h2>WELCOME TO URLSHORTENER APP</h2>
         
            <Button href='/signup' variant="contained" color="success" style={{width:"150px",height:"70px",borderRadius:"30px"}}>
                Sign UP
            </Button>
           
        </div>
    )
}