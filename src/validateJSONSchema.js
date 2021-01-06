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
            return generateResponse("'Name' of Resource has to be a String");
        }
        if(value.Type === "FReD") {
            if(typeof value.Properties !== 'object') {
                return generateResponse("'Propeties' attribute of Resource should be an object or is not found");
            }

            if(typeof value.Properties.Nodes !== 'object') {
                return generateResponse("'Nodes' attribute of Propeties should be an list or is not found");
            }

            if(typeof value.Properties.Nodes.NodeNames !== 'object') {
                return generateResponse("'NodeNames' attribute of Nodes should be an list or is not found");
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
                return generateResponse("'Clients' attribute of Properties should be an list or is not found");
            }

            for (const clientValue of value.Properties.Clients) {
                if(typeof clientValue.Name !== 'string') {
                    return generateResponse("Client 'Name' should be a string or is not found");
                }
            }

            if(typeof value.Properties.KeyGroups !== 'object') {
                return generateResponse("'KeyGroups' attribute of Properties should be an list or is not found");
            }

            for (const keyGroupValue of value.Properties.KeyGroups) {
                if(typeof keyGroupValue.Name !== 'string') {
                    return generateResponse("KeyGroup 'Name' should be a string or is not found");
                }
                if(! /^[a-zA-Z0-9]+$/.test(keyGroupValue.Name)){
                    return generateResponse("Keygroup 'Name' does not match ^[a-zA-Z0-9]+$ or is not found");
                }
                if(value.Properties.KeyGroups.filter(x => x.Name === keyGroupValue.Name).length > 1) {
                    return generateResponse("KeyGroup names can only be given once");
                }

                if(typeof keyGroupValue.Mutable !== 'boolean') {
                    return generateResponse("KeyGroup attribute 'Mutable' should be a boolean or is not found");
                }

                if(typeof keyGroupValue.Replicas !== 'object') {
                    return generateResponse("KeyGroup attribute 'Replicas' should be a list or is not found");
                }
                for (const repValue of keyGroupValue.Replicas) {
                    if(typeof repValue.Name !== 'string') {
                        return generateResponse("KeyGroup Replica 'Name' should be a string or is not found");
                    }
                    if(!value.Properties.Nodes.NodeNames.includes(repValue.Name)) {
                        return generateResponse("KeyGroup Replica 'Name' should be in the NodeNames List");
                    }
                    if(keyGroupValue.Replicas.filter(x => x.Name === repValue.Name).length > 1) {
                        return generateResponse("KeyGroup Replica can only appear once in the list");
                    }
                    if(!Number.isInteger(repValue.Expiry)) {
                        return generateResponse("KeyGroup Replica attribute 'Expiry' should be a integer or is not found");
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