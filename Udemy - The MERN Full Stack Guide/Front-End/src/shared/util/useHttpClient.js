import { useCallback, useState } from "react";

export const useHttpClient =  () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const clearError = () => {
        setError(null);
    }

    const sendRequest = useCallback(async (requestObject) => {
        console.log(requestObject);
        setIsLoading(true);
        try{
            const response =  await fetch(`${process.env.REACT_APP_BACKEND_URL}${requestObject.api}`, {
                method: requestObject.method, 
                headers: requestObject.headers,
                body: requestObject.body          
            });
            const responseData = await response.json();
            setIsLoading(false);
            if(!response.ok)
            {
                throw Error(responseData.message);
            }
            return responseData;

        }
        catch(err){
            setError(err.message || 'Something Went Wrong!');
            setIsLoading(false);  
            throw err;
        }
    },[]);

    return {isLoading, error, clearError, sendRequest};
}