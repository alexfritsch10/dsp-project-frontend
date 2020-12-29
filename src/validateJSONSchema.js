export function validateJSONSchema(text) {

    let obj;
    try {
        obj = JSON.parse(text);
    } catch (e) {
        return generateResponse("Input File is not properly formatted JSON");
    }
    
    // check if object was passed
    if(Object.keys(obj).length === 0 || obj.constructor !== Object) {
        console.log('In here');
        return generateResponse("Input File is no JSON Object or Empty");
    }


    if(typeof obj.FReDTemplateFormatVersion !== 'string') {
        console.log('In here 2');
        console.log(typeof obj.FReDTemplateFormatVersion);
        return generateResponse("Template Version has to be a String");
    }

    for (const value of obj.Resources) {
        console.log(value.Name);
        if(typeof value.Name !== 'string') {
            console.log(typeof value.Name);
            console.log('In here 3');
            return generateResponse("Name of Resource has to be a String");
        }
        if(value.Type === "FReD") {
            console.log('Of type fred');
            if(typeof value.Properties !== 'object') {
                console.log(typeof value.Properties);
                console.log('In here 4');
                return generateResponse("Propeties Attribute of Resource should be an Object");
            }

            if(typeof value.Properties.Nodes !== 'object') {
                console.log('In here 5');
                return generateResponse("Nodes Attribute of Propeties should be an Object");
            }

            if(typeof value.Properties.Nodes.NodeNames !== 'object') {
                console.log('In here 6');
                return generateResponse("NodeNames Attribute of Nodes should be an Object");
            }

            for(const nodeName of value.Properties.Nodes.NodeNames) {
                if(typeof nodeName != 'string') {
                    return generateResponse("NodeNames must be string");
                }
            }

            if(typeof value.Properties.Clients !== 'object') {
                console.log('In here 7');
                return generateResponse("Clients Attribute of Properties should be an Object");
            }

            for (const clientValue of value.Properties.Clients) {
                if(typeof clientValue.Name !== 'string') {
                    return generateResponse("Client name should be a string");
                }
            }

            if(typeof value.Properties.KeyGroups !== 'object') {
                console.log('In here 9');
                return generateResponse("KeyGroups Attribute of Properties should be an Object");
            }

            for (const keyGroupValue of value.Properties.KeyGroups) {
                if(typeof keyGroupValue.Name !== 'string') {
                    console.log('In here 10');
                    return generateResponse("KeyGroup name should be a string");
                }
                if(! /^[a-zA-Z0-9]+$/.test(keyGroupValue.Name)){
                    return generateResponse("Keygroup name does not match ^[a-zA-Z0-9]+$");
                }
                if(value.Properties.KeyGroups.filter(x => x.Name === keyGroupValue.Name).length > 1) {
                    return generateResponse("KeyGroup names can only be given once");
                }

                if(typeof keyGroupValue.Mutable !== 'boolean') {
                    console.log('In here 11');
                    return generateResponse("KeyGroup attribute mutable should be a boolean");
                }
                if(!Number.isInteger(keyGroupValue.Expiry)) {
                    console.log('In here 12');
                    return generateResponse("KeyGroup attribute expiry should be a integer");
                }
                if(typeof keyGroupValue.Replicas !== 'object') {
                    console.log('In here 13');
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
                        console.log('In here 14');
                        return generateResponse("KeyGroup Replica attribute expiry should be a integer");
                    }
                    
                }

                if(typeof keyGroupValue.Triggers !== 'object') {
                    console.log('In here 15');
                    return generateResponse("KeyGroup attribute Replicas should be a object");
                }

                for (const triValue of keyGroupValue.Triggers) {
                    if(typeof triValue.Name !== 'string') {
                        return generateResponse("KeyGroup Replica name should be a string");
                    }
                    if(!Number.isInteger(triValue.ReceiverAddress)) {
                        console.log('In here 16');
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

    console.log(params);

    return (params);
}