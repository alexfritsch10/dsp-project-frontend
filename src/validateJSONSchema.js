export function validateJSONSchema(text) {

    let obj;
    try {
        obj = JSON.parse(text);
    } catch (e) {
        return generateResponse("Input File is not properly formatted JSON");
    }
    
    // check if object was passed
    if(Object.keys(obj).length === 0 || obj.constructor !== Object) {
        return generateResponse("Input File is no JSON Object or Empty");
    }


    if(typeof obj.FReDTemplateFormatVersion !== 'string') {
        return generateResponse("Template Version has to be a String");
    }

    for (const value of obj.Resources) {
        if(typeof value.Name !== 'string') {
            return generateResponse("Name of Resource has to be a String");
        }
        if(value.Type === "FReD") {
            if(typeof value.Properties !== 'object') {
                return generateResponse("Propeties Attribute of Resource should be an Object");
            }

            if(typeof value.Properties.Nodes !== 'object') {
                return generateResponse("Nodes Attribute of Propeties should be an Object");
            }

            if(typeof value.Properties.Nodes.NodeNames !== 'object') {
                return generateResponse("NodeNames Attribute of Nodes should be an Object");
            }

            for(const nodeName of value.Properties.Nodes.NodeNames) {
                if(typeof nodeName != 'string') {
                    return generateResponse("NodeNames must be string");
                }
                if(value.Properties.Nodes.NodeNames.filter(x => x === nodeName).length > 1) {
                    return generateResponse("NodeNames can only appear once in the NodeNames List");
                }
            }

            if(typeof value.Properties.Clients !== 'object') {
                return generateResponse("Clients Attribute of Properties should be an Object");
            }

            for (const clientValue of value.Properties.Clients) {
                if(typeof clientValue.Name !== 'string') {
                    return generateResponse("Client name should be a string");
                }
            }

            if(typeof value.Properties.KeyGroups !== 'object') {
                return generateResponse("KeyGroups Attribute of Properties should be an Object");
            }

            for (const keyGroupValue of value.Properties.KeyGroups) {
                if(typeof keyGroupValue.Name !== 'string') {
                    return generateResponse("KeyGroup name should be a string");
                }
                if(! /^[a-zA-Z0-9]+$/.test(keyGroupValue.Name)){
                    return generateResponse("Keygroup name does not match ^[a-zA-Z0-9]+$");
                }
                if(value.Properties.KeyGroups.filter(x => x.Name === keyGroupValue.Name).length > 1) {
                    return generateResponse("KeyGroup names can only be given once");
                }

                if(typeof keyGroupValue.Mutable !== 'boolean') {
                    return generateResponse("KeyGroup attribute mutable should be a boolean");
                }
                if(!Number.isInteger(keyGroupValue.Expiry)) {
                    return generateResponse("KeyGroup attribute expiry should be a integer");
                }
                if(typeof keyGroupValue.Replicas !== 'object') {
                    return generateResponse("KeyGroup attribute Replicas should be a object");
                }

                for (const repValue of keyGroupValue.Replicas) {
                    if(typeof repValue.Name !== 'string') {
                        return generateResponse("KeyGroup Replica name should be a string");
                    }
                    if(!value.Properties.Nodes.NodeNames.includes(repValue.Name)) {
                        return generateResponse("KeyGroup Replica name should be in the Nodes List");
                    }
                    if(keyGroupValue.Replicas.filter(x => x.Name === repValue.Name).length > 1) {
                        return generateResponse("KeyGroup Replica can only appear once in the list");
                    }
                    if(!Number.isInteger(repValue.Expiry)) {
                        return generateResponse("KeyGroup Replica attribute expiry should be a integer");
                    }
                    
                }

                if(typeof keyGroupValue.Triggers !== 'object') {
                    return generateResponse("KeyGroup attribute Replicas should be a object");
                }

                for (const triValue of keyGroupValue.Triggers) {
                    if(typeof triValue.Name !== 'string') {
                        return generateResponse("KeyGroup Replica name should be a string");
                    }
                    if(!Number.isInteger(triValue.ReceiverAddress)) {
                        return generateResponse("KeyGroup Trigger attribute expiry should be a integer");
                    }
                    
                }
                

            }

        }

    }

    return generateResponse("Schema contraints fulfilled", true);

}

function generateResponse(message, valid = false) {
    let params = {
        valid: valid,
        message: message
    };


    return (params);
}