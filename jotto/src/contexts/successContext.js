import React from 'react';
const successContext = React.createContext();

/**
 * 
 * @returns {array} 
 */
const useSuccess = () => {
  const context = React.useContext(successContext);

  if (!context) {
    throw new Error("useSuccess must be used within a SuccessProvider");
  }
  return context;
}

const SuccessProvider = (props) => {
    const [success, setSuccess] = React.useState(false);
    
    const value = React.useMemo(() => [success, setSuccess], [success])
    return <successContext.Provider value={value} {...props}/>

} 

export default {SuccessProvider, useSuccess}