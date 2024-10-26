import { createContext } from "react";

export const AppContext=createContext()

export const AppProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const currency='$'
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const formatDate=(date)=>{
      let dateArray=date.split('_')
      return dateArray[0]+' '+months[Number(dateArray[1]-1)]+','+dateArray[2]
    }
    const calculateAge=(dob)=>{
        const birthDate=new Date(dob)
        const today=new  Date()
        return today.getFullYear()-birthDate.getFullYear()
    }
  
    const value={
        backendUrl,formatDate,currency,
        calculateAge
    }
    return(
        <AppContext.Provider value={{...value}}>
            {props.children}
        </AppContext.Provider>
    )
}