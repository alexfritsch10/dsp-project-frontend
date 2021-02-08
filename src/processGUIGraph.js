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
        console.log(JSON.parse(myJson));
    });
    // console.log(elements);

    let keyGroupList = [];
    const keyGroups = elements.filter(node => node.type === "keygroupNode");
    for (let keyGroup of keyGroups) {
        let keyGroupObject = {
            "Name": keyGroup.data.name,
            "Mutable": keyGroup.data.mutable,
            "Replicas": getReplicasForKeyGroup(keyGroup.id, elements)
        };
        keyGroupList.push(keyGroupObject);
    }
    // console.log(keyGroupList);
    template.KeyGroups = keyGroupList;
    console.log(template);

    return sendTemplateToAPI(template, callback);
}

function getReplicasForKeyGroup(keygroupId, elements) {
    // console.log("In getReplicasForKeyGroup");
    // console.log(elements);
    let replicasList = [];
    const linksFromKeygroup = elements.filter(element => element.hasOwnProperty("source") && element.source === keygroupId)
                                        .map(element => element.target);
    const replicas = elements.filter(element => element.type === "replicaNode" && linksFromKeygroup.includes(element.id));
    for (let replica of replicas) {
        let replicaObject = {
            "Name": replica.data.name,
            "Expiry": replica.data.expiry,
            "Triggers": getTriggersForReplica(replica.id, elements)
        };
        replicasList.push(replicaObject);
    }
    return replicasList;
}

function getTriggersForReplica(replicaId, elements) {
    let triggersList = [];
    const linksFromReplica = elements.filter(element => element.hasOwnProperty("source") && element.source === replicaId)
                                        .map(element => element.target);
    const triggers = elements.filter(element => element.type === "triggerNode" && linksFromReplica.includes(element.id));
    for (let trigger of triggers) {
        console.log(trigger);
        let triggerObject = {
            "Name": trigger.data.name,
            "CodeURL": trigger.data.codeURL
        };
        triggersList.push(triggerObject);
    }
    return triggersList;
}

export default integrateElementsIntoJSON;