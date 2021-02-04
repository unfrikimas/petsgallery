import React, { useState } from 'react'

function useLocalStorage (key, initialValue) {
  
  const [storedValue, setStoredValue] = useState(() => {
      try {
          var item = process.browser ? window.localStorage.getItem(key) : null;
          return item ? JSON.parse(item) : initialValue;
      } catch (error) {
          console.log(error);
          return initialValue;
      }
  })

  const setValue = value => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
          process.browser && window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
          console.log(error);
      }
  }

  return [storedValue, setValue];
}

export default useLocalStorage