import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow from 'react-flow-renderer';
import './App.css';

const initialElements = [
  { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
];
const initialSelectedElement = '1';

const GUITest = () => {
  const [elements, setElements] = useState(initialElements);
  const [selectedElement, setSelectedElement] = useState(initialSelectedElement);
  const [nodeName, setNodeName] = useState('Node 1');
  useEffect(() => {
    setElements((els) =>
        els.map((el) => {
          if (el.id === selectedElement) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          el.data = {
            ...el.data,
            label: nodeName,
          };
        }
        return el;
      })
    );
  }, [nodeName, setElements]);
  const onClickElement = useCallback((event, element) => {
    console.log(element);
    setSelectedElement((id) => element.id);

}, [setSelectedElement]); 

  return (
    <ReactFlow elements={elements} onElementClick={onClickElement} defaultZoom={1.5} minZoom={0.2} maxZoom={4}>
      <div className="updatenode__controls">
        <label>Node Name:</label>
        <input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />
      </div>
    </ReactFlow>
  );
};
export default GUITest;