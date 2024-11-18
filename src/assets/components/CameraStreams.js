import React from 'react';

const CameraViewer = () => {
  // Array of camera data
  const cameras = [
    { name: "BX520-HD | Showroom", url: "http://192.168.20.117/" },
    { name: "DS-2TD1217B | Normal vision", url: "http://192.168.20.116/" },
    { name: "DS-2TD1217B | Thermal vision", url: "http://192.168.20.116/" },
    { name: "FD836B | Corridor01", url: "http://192.168.20.107/" },
    { name: "FD836B | Technical01", url: "http://192.168.20.100/" },
    { name: "FD836BA | Corridor02", url: "http://192.168.20.103/" },
    { name: "FD836BA | Corridor03", url: "http://192.168.20.108/" },
    { name: "FD836BA | Corridor04", url: "http://192.168.20.112/" },
    { name: "FD9367 | Rest", url: "http://192.168.20.118/" },
    { name: "FD9371 | Corridor05", url: "http://192.168.20.102/" },
  ];

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-2xl mb-4">Camera Viewer</h1>
      <div className="grid grid-cols-2 gap-4">
        {cameras.map((camera, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-xl mb-2">{camera.name}</h2>
            <iframe
              src={camera.url}
              title={camera.name}
              className="w-full h-64 border-0 rounded-lg"
            ></iframe>
            <div className="mt-2 text-right">
              <a
                href={camera.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Open in new tab
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraViewer;
