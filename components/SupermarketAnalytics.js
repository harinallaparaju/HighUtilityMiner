import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Activity, Clock, Users, Timer } from 'lucide-react';

const generateSampleData = () => ({
  // Constraining x and y values to stay within the usable store area
  // x: 10-90 (to avoid checkout and edges)
  // y: 15-85 (to avoid entrance and back wall)
  sensors: Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.floor(Math.random() * 80) + 10, // 10 to 90
    y: Math.floor(Math.random() * 70) + 15, // 15 to 85
    traffic: Math.floor(Math.random() * 100),
    dwellTime: Math.floor(Math.random() * 300)
  }))
});

const timeSeriesData = Array.from({ length: 24 }, (_, hour) => ({
  hour,
  traffic: Math.floor(Math.random() * 100 + 50),
  predicted: Math.floor(Math.random() * 100 + 45)
}));

const SupermarketAnalytics = () => {
  const [selectedHour, setSelectedHour] = useState(12);
  const [sensorData, setSensorData] = useState({ sensors: [] });
  const [activeTab, setActiveTab] = useState('heatmap');
  const [showDwellTime, setShowDwellTime] = useState(false);

  useEffect(() => {
    setSensorData(generateSampleData());
    const interval = setInterval(() => {
      setSensorData(generateSampleData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderStoreLayout = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      {/* Main store outline */}
      <rect x="5" y="5" width="90" height="90" fill="none" stroke="#ccc" strokeWidth="0.5" />
      
      {/* Aisles - vertical */}
      {[25, 45, 65, 85].map(x => (
        <line key={`v${x}`} x1={x} y1="15" x2={x} y2="85" stroke="#ddd" strokeWidth="0.5" />
      ))}
      
      {/* Shelves - horizontal */}
      {[30, 50, 70].map(y => (
        <React.Fragment key={`h${y}`}>
          <line x1="15" y1={y} x2="85" y2={y} stroke="#ddd" strokeWidth="0.5" />
          <line x1="15" y1={y + 5} x2="85" y2={y + 5} stroke="#ddd" strokeWidth="0.5" />
        </React.Fragment>
      ))}
      
      {/* Checkout area */}
      <rect x="10" y="7" width="80" height="5" fill="#f0f0f0" stroke="#ddd" />
      {[20, 35, 50, 65, 80].map(x => (
        <rect key={`c${x}`} x={x - 2} y="7" width="4" height="5" fill="#ddd" />
      ))}
      
      {/* Entrance */}
      <rect x="7" y="85" width="10" height="8" fill="none" stroke="#ddd" strokeWidth="0.5" />
      <path d="M7,89 L17,89" stroke="#ddd" strokeWidth="0.5" />
      
      {/* Legend text */}
      <text x="8" y="98" fontSize="4" fill="#666">Entrance</text>
      <text x="70" y="10" fontSize="4" fill="#666">Checkout</text>
    </svg>
  );

  const renderHeatmap = () => {
    if (!sensorData.sensors || sensorData.sensors.length === 0) return null;
    const maxValue = Math.max(...sensorData.sensors.map(s => 
      showDwellTime ? s.dwellTime : s.traffic
    ));

    return (
      <div className="relative w-full h-96 bg-gray-50 rounded border">
        {renderStoreLayout()}
        <div className="absolute inset-0">
          {sensorData.sensors.map((sensor) => {
            const value = showDwellTime ? sensor.dwellTime : sensor.traffic;
            const opacity = value / maxValue;
            const size = showDwellTime ? 
              Math.max(24, (sensor.dwellTime / 300) * 36) : 
              Math.max(20, (sensor.traffic / 100) * 28);
            
            return (
              <div
                key={sensor.id}
                className="absolute rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                  left: `${sensor.x}%`,
                  top: `${sensor.y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: showDwellTime ? 
                    `rgba(234, 88, 12, ${opacity})` : 
                    `rgba(37, 99, 235, ${opacity})`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
              >
                <span className="text-xs font-medium text-white whitespace-nowrap">
                  {showDwellTime ? 
                    `${Math.round(sensor.dwellTime)}s` : 
                    sensor.traffic
                  }
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTrafficChart = () => (
    <div className="w-full overflow-x-auto">
      <AreaChart 
        width={600} 
        height={200} 
        data={timeSeriesData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="traffic" 
          stroke="#8884d8" 
          fill="#8884d8" 
          fillOpacity={0.3} 
          name="Actual Traffic"
        />
        <Area 
          type="monotone" 
          dataKey="predicted" 
          stroke="#82ca9d" 
          fill="#82ca9d" 
          fillOpacity={0.3} 
          name="Predicted Traffic"
        />
      </AreaChart>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow text-black">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold">Supermarket Analytics</h1>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          className="px-3 py-2 border rounded-md"
          value={selectedHour}
          onChange={(e) => setSelectedHour(parseInt(e.target.value))}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i}>
              {i.toString().padStart(2, '0')}:00
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'heatmap' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('heatmap')}
          >
            Heatmap
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'traffic' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('traffic')}
          >
            Traffic Analysis
          </button>
        </div>

        {activeTab === 'heatmap' && (
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-md transition-colors ${
                !showDwellTime 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setShowDwellTime(false)}
            >
              <Users className="w-4 h-4" />
              Traffic
            </button>
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-md transition-colors ${
                showDwellTime 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setShowDwellTime(true)}
            >
              <Timer className="w-4 h-4" />
              Dwell Time
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-6">
        {activeTab === 'heatmap' ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Store {showDwellTime ? 'Dwell Time' : 'Traffic'} Heatmap
            </h2>
            {renderHeatmap()}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Traffic Analysis</h2>
            {renderTrafficChart()}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>Data updates every 5 seconds</span>
      </div>
    </div>
  );
};

export default SupermarketAnalytics;