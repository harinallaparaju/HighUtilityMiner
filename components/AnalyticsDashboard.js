import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, ComposedChart } from 'recharts';
import { Info, TrendingUp, ShoppingCart, BarChart2 } from 'lucide-react';
import SupermarketAnalytics from '../components/SupermarketAnalytics.js';

const AnalyticsDashboard = () => {
  const itemsets = [
    { 
        items: ['Organic Bananas', 'Organic Strawberries'],
        label: 'Organic Bananas + Organic Strawberries',
        utility: 2500,
        support: 450,
        gui_index: 85,
        confidence: 75,
        growth: 15,
        monthlyTrend: [
          { month: 'Jan', sales: 2100 },
          { month: 'Feb', sales: 2300 },
          { month: 'Mar', sales: 2500 },
          { month: 'Apr', sales: 2400 },
          { month: 'May', sales: 2600 }
        ]
    },
    { 
        items: ['Organic Avocado', 'Large Lemon'],
        label: 'Organic Avocado + Large Lemon',
        utility: 2100,
        support: 380,
        gui_index: 78,
        confidence: 68,
        growth: 12,
        monthlyTrend: [
          { month: 'Jan', sales: 1800 },
          { month: 'Feb', sales: 1900 },
          { month: 'Mar', sales: 2100 },
          { month: 'Apr', sales: 2000 },
          { month: 'May', sales: 2200 }
        ]
    },
    { 
        items: ['Organic Baby Spinach', 'Organic Blueberries', 'Organic Raspberries'],
        label: 'Organic Baby Spinach + Others',
        utility: 1800,
        support: 320,
        gui_index: 72,
        confidence: 64,
        growth: 8,
        monthlyTrend: [
          { month: 'Jan', sales: 1500 },
          { month: 'Feb', sales: 1600 },
          { month: 'Mar', sales: 1800 },
          { month: 'Apr', sales: 1700 },
          { month: 'May', sales: 1900 }
        ]
    }
  ];

  const metrics = {
    totalTransactions: 10000,
    averageUtility: 2133,
    averageSupport: 383,
    averageConfidence: 69
  };

  const guiData = [
    { name: 'Organic Strawberries', guiIndex: 0.85, utility: 2500, support: 450 },
    { name: 'Avocado + Large Lemon', guiIndex: 0.78, utility: 2100, support: 380 },
    { name: 'Baby Spinach + Others', guiIndex: 0.72, utility: 1800, support: 320 }
  ];

  // Updated formatting function to ensure consistent output
  const formatIndianRupees = (value) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      currencyDisplay: 'narrowSymbol'
    });
    return formatter.format(value).replace(/\s+/g, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          High Utility Itemsets Analysis Dashboard
        </h1>

        <div className="bg-white p-4 rounded-lg flex items-start gap-3 mb-6 rounded-xl shadow-lg p-6 transform transition-transform">
            <Info className="w-5 h-5 mt-0.5 text-blue-500" />
            <p className="text-gray-700">
              GUI Index combines support (40%), profit (40%), and co-occurrence (20%)
            </p>
        </div>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
              <ShoppingCart className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{metrics.totalTransactions.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Average Utility</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{formatIndianRupees(metrics.averageUtility)}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Average Support</h3>
              <BarChart2 className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{metrics.averageSupport}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Average Confidence</h3>
              <Info className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{metrics.averageConfidence}%</div>
          </div>
        </div>

        {/* New Combined Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <h2 className="text-2xl font-bold mb-2 text-black">Itemset Performance Matrix</h2>
          <p className="text-gray-600 mb-4">Comparison of GUI Index, Utility, and Support</p>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={guiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="utility" fill="#8884d8" name="Utility (₹)" />
                <Bar yAxisId="left" dataKey="support" fill="#82ca9d" name="Support" />
                <Line yAxisId="right" type="monotone" dataKey="guiIndex" stroke="#ff7300" name="GUI Index" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
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
                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
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
                      {formatIndianRupees(itemset.utility)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {itemset.support}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {itemset.confidence}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        itemset.growth > 10 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        +{itemset.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SupermarketAnalytics />
    </div>
  );
};

export default AnalyticsDashboard;