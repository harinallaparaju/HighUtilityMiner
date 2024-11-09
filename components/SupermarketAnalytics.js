import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Activity, Clock } from 'lucide-react';

const generateSampleData = () => ({
  sensors: Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
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

  useEffect(() => {
    setSensorData(generateSampleData());
    const interval = setInterval(() => {
      setSensorData(generateSampleData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderHeatmap = () => {
    if (!sensorData.sensors || sensorData.sensors.length === 0) return null;
    const maxTraffic = Math.max(...sensorData.sensors.map(s => s.traffic));

    return (
      <div className="relative w-full h-64 bg-gray-100 rounded border">
        {sensorData.sensors.map((sensor) => (
          <div
            key={sensor.id}
            className="absolute w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(sensor.x / 10) * 100}%`,
              top: `${(sensor.y / 10) * 100}%`,
              backgroundColor: `rgba(37, 99, 235, ${sensor.traffic / maxTraffic})`
            }}
          >
            <span className="absolute top-8 left-0 text-xs">{sensor.traffic}</span>
          </div>
        ))}
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
      <div className="mb-6 flex gap-4">
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
      </div>

      {/* Content */}
      <div className="mb-6">
        {activeTab === 'heatmap' ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">Store Traffic Heatmap</h2>
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
        <Clock className="w-4 h-4 " />
        <span>Data updates every 5 seconds</span>
      </div>
    </div>
  );
};

export default SupermarketAnalytics;
