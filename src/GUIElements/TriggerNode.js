import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
    return (
        <>
            <Handle 
                type="target" 
                position="left" 
                id="a"
            />
           <form>
                <div>
                    <label htmlFor="triggerName">
                        Function Name
                    </label>
                    <input 
                        id={data.triId + "_name"}
                        name="triggerName" 
                        type="text" 
                        onChange={data.onChange} 
                    />
                </div>
                <div>
                    <label htmlFor="codeURL">
                        Code URL
                    </label>
                    <input 
                        id={data.triId + "_codeURL"}
                        name="codeURL" 
                        type="text" 
                        onChange={data.onChange} 
                    />
                </div>
                <div>
                    <label htmlFor="subfolderpath">
                        Subfolder URL
                    </label>
                    <input 
                        id={data.triId + "_subfolderpath"}
                        name="subfolderpath" 
                        type="text" 
                        onChange={data.onChange} 
                    />
                </div>
                <div>
                    <label htmlFor="threads">
                        Threads
                    </label>
                    <input 
                        id={data.triId + "_threads"}
                        name="threads" 
                        type="text" 
                        onChange={data.onChange} 
                    />
                </div>
            </form>
            
        </>
    );
});