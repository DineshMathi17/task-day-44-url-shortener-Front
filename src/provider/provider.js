import { createContext, useContext, useEffect, useState } from "react";


const AppContext =createContext();
const AppProvider = ({children})=>{
    const [refresh,setRefresh]=useState([]);
    const [tabledata, SetTabledata] = useState([])
    let token = sessionStorage.getItem('token');
    console.log(token);
    const getDetails = async () => {
        try {
            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await fetch("https://task-day-44-url-backend.onrender.com/url/list", { headers });
            const data = await response.json();
            console.log(data);
            SetTabledata(data.result)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if(token){
            getDetails()
        }else{
            console.log("token expried")
        }
}, [refresh])
return(
    <AppContext.Provider
    value={{
        tabledata,
        SetTabledata,
        refresh,
        setRefresh
    }}>
        {children}
    </AppContext.Provider>
)
}

export const AppState=()=>{
    return useContext(AppContext)
}
export default AppProvider