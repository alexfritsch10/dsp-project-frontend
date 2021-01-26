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
                        Trigger Name
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
            </form>
            
        </>
    );
});