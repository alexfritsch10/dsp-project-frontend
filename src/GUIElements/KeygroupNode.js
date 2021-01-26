import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default memo(({ data }) => {
    return (
        <>  
            <form>
                <div>
                    <label htmlFor="keygroupName">
                        Keygroup Name
                    </label>
                    <input 
                        id={data.kgId + "_name"} 
                        name="keygroupName" 
                        type="text" 
                        onChange={data.onChange} 
                    />
                </div>
                <div>
                    <FormControlLabel
                        value="top"
                        control={<Switch id={data.kgId + "_mutable"} color="primary" />}
                        label="Mutable"
                        labelPlacement="start"
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