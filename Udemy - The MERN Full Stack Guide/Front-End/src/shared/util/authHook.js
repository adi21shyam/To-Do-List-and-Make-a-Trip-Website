import { useCallback, useState, useEffect } from "react";

let logoutTimer;
export const useAuth =  () =>{
  const [token, setToken] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((userId, token, expirationDate) => {    
    setToken(token);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000*60*60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({token:token, userId:userId, expirationDate:tokenExpirationDate.toISOString()}));
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);
  
  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && new Date(storedData.expirationDate) > new Date())
    login(storedData.userId, storedData.token, new Date(storedData.expirationDate));
  },[login]);
  
  useEffect(()=>{
    if(tokenExpirationDate && token){
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
    logoutTimer = setTimeout(logout, remainingTime);
    }
    else
    {
      clearTimeout(logoutTimer);
    }
  },[token, tokenExpirationDate,logout]);

     
  return {token, userId, login , logout};
}

export default useAuth;