import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `https://task-day-44-url-backend.onrender.com/${param.id}/verify/${param.token}`;
                const response = await fetch(url, {
                method: "GET"
            });
            const data = await response.json();
            console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<div style={{backgroundColor:"Aqua",textalign:"center",height:"100vh",padding:"40vh"}}>
			{validUrl ? (
				<div >
					<h1>Email verified successfully</h1>
					<Button href='/login' variant="contained" color="success" style={{width:"150px",height:"70px",borderRadius:"30px"}}>
          Login
            </Button>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
	</div>
	);
};

export default EmailVerify;