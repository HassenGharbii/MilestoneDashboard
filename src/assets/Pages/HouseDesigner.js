import React, { useState } from 'react';
import { NetworkCanvas, Types } from 'react-network-canvas';
import { FaCamera, FaLightbulb, FaPlug } from 'react-icons/fa';
import './HouseDesigner.css';

const { Node } = Types;

const HouseDesigner = () => {
  const [rooms, setRooms] = useState([]);
  const [hardwareItems, setHardwareItems] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomPosition, setRoomPosition] = useState({ x: 100, y: 100 });
  const [roomSize, setRoomSize] = useState({ width: 200, height: 150 });
  const [selectedIcon, setSelectedIcon] = useState(null);

  // Add a new room with custom position and size
  const addRoom = () => {
    if (!roomName) return; // Ensure room name is not empty

    const newRoom = {
      id: Date.now(), // unique id based on time
      name: roomName,
      position: roomPosition,
      dimensions: roomSize,
    };

    setRooms([...rooms, newRoom]);
    setRoomName(''); // reset input
    setRoomPosition({ x: 100, y: 100 }); // reset position
    setRoomSize({ width: 200, height: 150 }); // reset size
  };

  // Add a hardware item (camera, switch, etc.) in a room
  const addHardware = (roomId) => {
    if (!selectedIcon) return; // Ensure an icon is selected

    const newHardware = {
      id: Date.now(),
      roomId,
      type: selectedIcon,
      position: { x: Math.random() * 100, y: Math.random() * 100 }, // random position in room
    };
    setHardwareItems([...hardwareItems, newHardware]);
  };

  // Get the icon based on the selected type
  const getIcon = (type) => {
    switch (type) {
      case 'camera':
        return <FaCamera />;
      case 'switch':
        return <FaPlug />;
      case 'lightbulb':
        return <FaLightbulb />;
      default:
        return null;
    }
  };

  return (
    <div className="house-designer">
      <div className="controls">
        <div>
          <label>Room Name:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room Name"
          />
        </div>

        <div>
          <label>Position (x, y):</label>
          <input
            type="number"
            value={roomPosition.x}
            onChange={(e) =>
              setRoomPosition({ ...roomPosition, x: Number(e.target.value) })
            }
            placeholder="x"
          />
          <input
            type="number"
            value={roomPosition.y}
            onChange={(e) =>
              setRoomPosition({ ...roomPosition, y: Number(e.target.value) })
            }
            placeholder="y"
          />
        </div>

        <div>
          <label>Size (width, height):</label>
          <input
            type="number"
            value={roomSize.width}
            onChange={(e) =>
              setRoomSize({ ...roomSize, width: Number(e.target.value) })
            }
            placeholder="Width"
          />
          <input
            type="number"
            value={roomSize.height}
            onChange={(e) =>
              setRoomSize({ ...roomSize, height: Number(e.target.value) })
            }
            placeholder="Height"
          />
        </div>

        <button onClick={addRoom}>Add Room</button>

        <div>
          <label>Select Hardware:</label>
          <select onChange={(e) => setSelectedIcon(e.target.value)} value={selectedIcon}>
            <option value="">Select</option>
            <option value="camera">Camera</option>
            <option value="switch">Switch</option>
            <option value="lightbulb">Lightbulb</option>
          </select>
        </div>

        <div>
          {rooms.map((room) => (
            <button key={room.id} onClick={() => addHardware(room.id)}>
              Add hardware to {room.name}
            </button>
          ))}
        </div>
      </div>

      <div className="canvas-container">
        <NetworkCanvas>
          {/* Render Rooms */}
          {rooms.map((room) => (
            <Node
              key={room.id}
              id={room.id}
              label={room.name}
              style={{
                shape: 'rect',
                width: room.dimensions.width,
                height: room.dimensions.height,
                x: room.position.x,
                y: room.position.y,
                labelPosition: 'top',
                color: '#ffffff', // White text on the room
                backgroundColor: 'blue', // Blue background for rooms
                fontSize: 12,
                padding: 5,
              }}
            />
          ))}

          {/* Render Hardware Items */}
          {hardwareItems.map((hardware) => {
            const room = rooms.find((r) => r.id === hardware.roomId);
            return (
              <Node
                key={hardware.id}
                id={hardware.id}
                label={hardware.type}
                style={{
                  shape: 'circle',
                  width: 30,
                  height: 30,
                  x: room.position.x + hardware.position.x,
                  y: room.position.y + hardware.position.y,
                  backgroundColor: '#2ecc71',
                  fontSize: 12,
                }}
              >
                <div className="icon-container">{getIcon(hardware.type)}</div>
              </Node>
            );
          })}
        </NetworkCanvas>
      </div>
    </div>
  );
};

export default HouseDesigner;
