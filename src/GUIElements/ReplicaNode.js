import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

export default memo(({ data }) => {
    return (
        <>  
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                id="a"
            />
            <form>
                <div>
                    <label htmlFor="replicaName">
                        Replica Name
                    </label>
                    <input 
                        id={data.repId + "_name"}
                        name="replicaName" 
                        type="text" 
                        onChange={data.onChange} 
                    />
                </div>
                <div>
                    <label htmlFor="Expiry">
                        Expiry
                    </label>
                    <input 
                        id={data.repId + "_expiry"} 
                        name="Expiry" 
                        type="text" 
                        onChange={data.onChange} 
                    />
                </div>
            </form>

            <Handle 
                type="source" 
                position="right" 
                id="b"
            />
        </>
    );
});