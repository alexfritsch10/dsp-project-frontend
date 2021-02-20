import sendTemplateToAPI from './apiConnection';

async function integrateElementsIntoJSON(elements, callback) {
    // console.log(elements);
    let template;
    await fetch('dataTemplate.json',{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(r => r.text())
    .then(function(myJson) {
        template = JSON.parse(myJson);
        //console.log(JSON.parse(myJson));
    });
    console.log(elements);

    let keyGroupList = [];
    const keyGroups = elements.filter(node => node.type === "keygroupNode");
    for (let keyGroup of keyGroups) {
        let keyGroupObject = {
            "Name": keyGroup.data.name,
            "Mutable": keyGroup.data.mutable,
            "Functions": getFunctionsForKeyGroup(keyGroup.id, elements),
            "Replicas": getReplicasForKeyGroup(keyGroup.id, elements)
        };
        keyGroupList.push(keyGroupObject);
    }
    // console.log(keyGroupList);
    template.KeyGroups = keyGroupList;
    console.log(template);

    return sendTemplateToAPI(template, callback);
}

function getFunctionsForKeyGroup(keygroupId, elements) {
    console.log("Passed Keygroup Id: " + keygroupId);
    let functionsList = [];
    const keygroupReplicaIds = elements.filter(element => element.hasOwnProperty("source") && element.source === keygroupId)
                                        .map(element => element.target);
    console.log("Links from keygroup " + keygroupId + ": " + keygroupReplicaIds);
    //const replicas = elements.filter(element => element.type === "replicaNode" && linksFromKeygroup.includes(element.id));
    
    let keyGroupFunctionIds = []
    for (let replicaId of keygroupReplicaIds) {
        let fn = elements.filter(element => element.hasOwnProperty("source") && element.source === replicaId)
                                        .map(element => element.target);
        console.log("Links From Replica " + replicaId + ": " + fn);                                
        keyGroupFunctionIds = keyGroupFunctionIds.concat(fn)
    }
    console.log("keyGroupFunctionIds: " + keyGroupFunctionIds);

    let keyGroupFunctions = elements.filter(element => element.type === "triggerNode" && keyGroupFunctionIds.includes(element.id));

    for (let keyGroupFunction of keyGroupFunctions) {
        console.log("keyGroupFunction: " + keyGroupFunction);
        let functionObject = {
            "Name": keyGroupFunction.data.name,
            "CodeURL": keyGroupFunction.data.codeURL,
            "subfolder_path": keyGroupFunction.data.subfolderpath,
            "threads": keyGroupFunction.data.threads
        };
        functionsList.push(functionObject);
    }
    console.log("Function List for keygroup: " + keygroupId + ": " + functionsList);
    return functionsList
}

function getReplicasForKeyGroup(keygroupId, elements) {
    // console.log("In getReplicasForKeyGroup");
    // console.log(elements);
    let replicasList = [];
    const linksFromKeygroup = elements.filter(element => element.hasOwnProperty("source") && element.source === keygroupId)
                                        .map(element => element.target);
    const replicas = elements.filter(element => element.type === "replicaNode" && linksFromKeygroup.includes(element.id));
    console.log("Replicas: " + replicas);
    for (let replica of replicas) {
        let replicaObject = {
            "Name": replica.data.name,
            "Expiry": replica.data.expiry,
            "Functions": getFunctionsForReplica(replica.id, elements)
        };
        replicasList.push(replicaObject);
    }
    return replicasList;
}

function getFunctionsForReplica(replicaId, elements) {
    let functionsList = [];
    const linksFromReplica = elements.filter(element => element.hasOwnProperty("source") && element.source === replicaId)
                                        .map(element => element.target);
    const functions = elements.filter(element => element.type === "triggerNode" && linksFromReplica.includes(element.id));
    for (let fn of functions) {
        functionsList.push(fn.data.name);
    }
    return functionsList;
}

export default integrateElementsIntoJSON;