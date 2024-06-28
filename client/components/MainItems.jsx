import React from 'react';

const MainItems = ({fields, currentInfo, setCurrentInfo}) => {
  const isPrompt = (key) => {
      return fields[key][fields[key].length - 1] !== '?';
  };

  const items = [];

  Object.keys(fields).forEach(
    (key, index) => {
      items.push(
        <div key={index} className='main-item'>
          <section className='req-tank' htmlFor={key}><span className='req'>*</span>{fields[key]}</section>
          {
            isPrompt(key) 
              ? key === 'body' 
                ? <textarea 
                    className='text-area' 
                    placeholder='important information and steps you have taken'
                    maxLength={400}
                    onChange={(e) => setCurrentInfo({...currentInfo, [key]: e.target.value})}
                  />
                : <input 
                    maxLength={
                      key === 'header'
                        ? '50'
                        : null
                    }
                    key={index} 
                    id={index} 
                    name={key} 
                    defaultValue='' 
                    onChange={(e) => setCurrentInfo({...currentInfo, [key]: e.target.value})}
                 /> 
              : <select onChange={(e) => setCurrentInfo({...currentInfo, [key]: e.target.value === 'true'})} id={index}>
                  <option value=''>Please choose an option</option>
                  <option value={'true'}>yes</option>
                  <option value={'false'}>no</option>
                </select>
          }  
        </div>
      );
    }
  );

  return (
    items
  )
};

export default MainItems;