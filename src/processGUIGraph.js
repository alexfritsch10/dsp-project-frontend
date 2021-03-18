import { sendTemplateToAPI } from './apiConnection';

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
            "Replicas": getReplicasForKeyGroup(keyGroup.id, elements),
            "Functions": getFunctionsForKeyGroup(keyGroup.id, elements),
        };
        keyGroupList.push(keyGroupObject);
    }
    // console.log(keyGroupList);
    template.KeyGroups = keyGroupList;
    console.log(template);

    return sendTemplateToAPI(template, callback);
}


function getReplicasForKeyGroup(keygroupId, elements) {
    let replicasList = [];
    const linksFromKeygroup = elements.filter(element => element.hasOwnProperty("source") && element.source === keygroupId)
                                        .map(element => element.target);
    const replicas = elements.filter(element => element.type === "replicaNode" && linksFromKeygroup.includes(element.id));
    console.log("Replicas: " + replicas);
    for (let replica of replicas) {
        let replicaObject = {
            "Name": replica.data.name,
            "Expiry": replica.data.expiry
        };
        replicasList.push(replicaObject);
    }
    return replicasList;
}

function getFunctionsForKeyGroup(keygroupId, elements) {
    console.log("Passed Keygroup Id: " + keygroupId);
    let functionsList = [];
    const keygroupFunctionIds = elements.filter(element => element.hasOwnProperty("source") && element.source === keygroupId)
                                        .map(element => element.target);
    
    let keyGroupFunctions = elements.filter(element => element.type === "triggerNode" && keygroupFunctionIds.includes(element.id));

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

export default integrateElementsIntoJSON;