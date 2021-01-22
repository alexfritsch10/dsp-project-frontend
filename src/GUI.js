import React, { useState, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, removeElements, addEdge } from 'react-flow-renderer';
import './App.css';

const getId = () => `randomnode_${+new Date()}`;
const initialElements = [
    { id: '0', sourcePosition: 'right', type: 'input', data: { label: 'Keygroup 1' }, position: { x: 20, y: 150 } },
    { id: 'saggy1', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Node 1' }, position: { x: 250, y: 70 } },
    { id: '2', sourcePosition: 'right', targetPosition: 'left', data: { label: 'Node 2' }, position: { x: 250, y: 230 } },
    { id: 'e0-1', source: '0', target: 'saggy1' },
    { id: 'e0-2', source: '0', target: '2' }
];
const SaveRestore = () => {
    const [rfInstance, setRfInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onAddNode = useCallback(() => {
        const newNode = {
            id: getId(),
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: 'Added node' },
            position: {
                x: initialElements[0].position.x + 70,
                y: initialElements[0].position.y + 50,
            },
        };
        setElements((els) => els.concat(newNode));
    }, [setElements]);
    const onAddKeygroup = useCallback(() => {
        const newKeygroup = {
            id: getId(),
            sourcePosition: 'right',
            type: 'input',
            data: { label: 'Added Keygroup' },
            position: {
                x: initialElements[0].position.x + 100,
                y: initialElements[0].position.y + 80,
            },
        };
        setElements((els) => els.concat(newKeygroup));  
    }, [setElements]);
    const onClickElement = useCallback((event, element) => {
        console.log(element);
        

    }, [setElements]); 
    return (
        <ReactFlowProvider>
        <ReactFlow
            elements={elements}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            onLoad={setRfInstance}
            onElementClick={onClickElement}
            defaultZoom={1.5}
            minZoom={1.5}
            maxZoom={3.5}
        >
            <div className="save__controls">
            <button onClick={onAddNode}>add node</button>
            <button onClick={onAddKeygroup}>add keygroup</button>
            </div>
        </ReactFlow>
        </ReactFlowProvider>
    );
};
export default SaveRestore;