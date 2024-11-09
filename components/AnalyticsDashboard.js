import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { Info } from 'lucide-react';
import SupermarketAnalytics from './SupermarketAnalytics';

const AnalyticsDashboard = () => {
  const itemsets = [
    { 
        items: ['Organic Bananas', 'Organic Strawberries'],
        label: 'Organic Bananas + Organic Strawberries',
        utility: 2500,
        support: 450,
        gui_index: 85,
        confidence: 75
    },
    { 
        items: ['Organic Avocado', 'Large Lemon'],
        label: 'Organic Avocado + Large Lemon',
        utility: 2100,
        support: 380,
        gui_index: 78,
        confidence: 68
    },
    { 
        items: ['Organic Baby Spinach', 'Organic Blueberries', 'Organic Raspberries'],
        label: 'Organic Baby Spinach + Others',
        utility: 1800,
        support: 320,
        gui_index: 72,
        confidence: 64
    }
  ];

  const metrics = {
    totalTransactions: 10000,
    averageUtility: 2133,
    averageSupport: 383,
    averageConfidence: 69
  };

  const guiData = [
    { name: 'Organic Strawberries', guiIndex: 0.85 },
    { name: 'Avocado + Large Lemon', guiIndex: 0.78 },
    { name: 'Baby Spinach + Others', guiIndex: 0.72 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-8 text-center">
          High Utility Itemsets Analysis
        </h1>

        <div className="bg-white p-4 rounded-lg flex items-start gap-3 mb-6 rounded-xl shadow-lg p-6 transform transition-transform">
            <Info className="w-5 h-5 mt-0.5 text-black" />
            <p className="text-gray-700">
            GUI Index combines support (40%), profit (40%), and co-occurrence (20%)
            </p>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Transactions</h3>
            <div className="text-3xl font-bold text-gray-900">{metrics.totalTransactions.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Average Utility</h3>
            <div className="text-3xl font-bold text-gray-900">${metrics.averageUtility.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Average Support</h3>
            <div className="text-3xl font-bold text-gray-900">{metrics.averageSupport}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Average Confidence</h3>
            <div className="text-3xl font-bold text-gray-900">{metrics.averageConfidence}%</div>
          </div>
        </div>

        {/* Metrics Understanding Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-black">Understanding the Metrics</h2>
            <div className="space-y-4">
            <div>
                <h3 className="text-l font-bold text-black">Support</h3>
                <p className="text-black">Measures how frequently an itemset appears in transactions. Higher support indicates commonly purchased combinations.</p>
            </div>
            <div>
                <h3 className="text-l font-bold text-black">Confidence</h3>
                <p className="text-black">Indicates the reliability of the relationship between items. Higher confidence suggests stronger purchase patterns.</p>
            </div>
            <div>
                <h3 className="text-l font-bold text-black">GUI Index</h3>
                <p className="text-black">A composite score combining support, profit, and co-occurrence. Higher GUI index suggests better overall performance.</p>
            </div>
            <div>
                <h3 className="text-l font-bold text-black">Utility</h3>
                <p className="text-black">The total monetary value generated by an itemset, calculated from price and quantity sold.</p>
            </div>
            </div>
        </div>

        {/* GUI Index Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
            <h2 className="text-2xl font-bold mb-2 text-black">Top Itemsets by GUI Index</h2>
            <p className="text-gray-600 mb-4">Comparison of highest performing product combinations</p>
            <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={guiData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} />
                <Bar dataKey="guiIndex" fill="#818cf8" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>


        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden m-12">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Itemset Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utility
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Support
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {itemsets.map((itemset, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {itemset.items.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${itemset.utility.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {itemset.support}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {itemset.confidence}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="analytics-dashboard">
        <SupermarketAnalytics />
      </div>

    </div>

    // SupermarketAnalytics




  );
};

export default AnalyticsDashboard;