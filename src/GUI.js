import React, { useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, removeElements, addEdge } from 'react-flow-renderer';
import './App.css';
import KeygroupNode from './GUIElements/KeygroupNode';
import ReplicaNode from './GUIElements/ReplicaNode';
import TriggerNode from './GUIElements/TriggerNode';
import integrateElementsIntoJSON from './processGUIGraph';

const nodeTypes = {
    keygroupNode: KeygroupNode,
    replicaNode: ReplicaNode,
    triggerNode: TriggerNode
};
const getRandomInt = (min, max, stringRequired = true) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const returnVal = Math.floor(Math.random() * (max - min + 1)) + min;
    if(stringRequired) {
        return returnVal.toString();
    }
    return returnVal;
    
}

const GUI = () => {
    const [elements, setElements] = useState([]);
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    
    const onChange = (event) => {
        const formProps = event.target.id.split("_");
        // -> ["1453", "name"]
        let newValue = (formProps[1] === "mutable") ? event.target.checked : event.target.value;
        if(formProps[1] === "expiry") {
            newValue = parseInt(newValue);
        }
        setElements((els) =>
            els.map((el) => {
                if (el.id === formProps[0]) {
                    const valueToUpdate = formProps[1];
                    el.data = {
                        ...el.data,
                        [valueToUpdate]: newValue,
                    };
                }
                return el;
            })
        )
    };
    
    const onAddKeygroup = useCallback(() => {
        const kgId = getRandomInt(0, 10000);
        const newKeygroup = {
            id: kgId,
            type: 'keygroupNode',
            data: { 
                kgId: kgId,
                onChange: onChange,
                name: '',
                mutable: false 
            },
            style: { 
                border: '1px solid #777', 
                padding: 10 
            },
            position: {
                x: getRandomInt(30, 70, false),
                y: getRandomInt(130, 170, false),
            },
        };
        setElements((els) => els.concat(newKeygroup));  
    }, [setElements]);
    const onAddReplica = useCallback(() => {
        const repId = getRandomInt(0, 10000);
        const newReplica = {
            id: repId,
            type: 'replicaNode',
            data: { 
                repId: repId,
                onChange: onChange,
                name: '',
                expiry: 0 
            },
            style: { 
                border: '1px solid #777', 
                padding: 10 
            },
            position: {
                x: getRandomInt(230, 270, false),
                y: getRandomInt(60, 100, false),
            },
        };
        setElements((els) => els.concat(newReplica));
    }, [setElements]);
    const onAddTrigger = useCallback(() => {
        const triId = getRandomInt(0, 10000);
        const newKeygroup = {
            id: triId,
            type: 'triggerNode',
            data: { 
                triId: triId,
                onChange: onChange,
                name: '',
                codeURL: '' 
            },
            style: { 
                border: '1px solid #777', 
                padding: 10 
            },
            position: {
                x: getRandomInt(430, 470, false),
                y: getRandomInt(130, 170, false),
            },
        };
        setElements((els) => els.concat(newKeygroup));  
    }, [setElements]);
    
    return (
        <ReactFlowProvider>
            <ReactFlow
                elements={elements}
                nodeTypes={nodeTypes}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                defaultZoom={1}
                minZoom={1}
                maxZoom={3.5}
            >
                <div className="save__controls">
                    <button onClick={onAddKeygroup}>add keygroup</button>
                    <button onClick={onAddReplica}>add replica</button>
                    <button onClick={onAddTrigger}>add trigger</button>
                    <button onClick={() => {integrateElementsIntoJSON(elements, (status, message) => {console.log(status); console.log(message);})}}>deploy infrastructure</button>
                </div>
            </ReactFlow>
        </ReactFlowProvider>
    );
};
export default GUI;