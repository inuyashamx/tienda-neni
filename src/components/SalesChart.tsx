import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface SalesData {
  date: string;
  amount: number;
  visits: number;
}

type Period = '7d' | '30d' | '90d';

// Generar datos de ejemplo para el período especificado
const generateSampleData = (days: number): SalesData[] => {
  const data: SalesData[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generar valores con tendencia y algo de variación aleatoria
    const baseAmount = 50 + Math.sin(i / 10) * 30;
    const amount = baseAmount + (Math.random() * 20 - 10);
    const visits = Math.floor(baseAmount * 2 + Math.random() * 40 - 20);
    
    data.push({
      date: date.toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      }),
      amount,
      visits
    });
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 font-medium mb-1">{label}</p>
        <p className="text-sm font-medium text-blue-600 flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span>
          Ventas: ${payload[0].value.toFixed(2)}
        </p>
        <p className="text-sm font-medium text-purple-600 flex items-center">
          <span className="w-3 h-3 rounded-full bg-purple-600 mr-2"></span>
          Visitas: {Math.round(payload[1].value)}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center">
          <span
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-gray-600 font-medium">
            {entry.value === 'amount' ? 'Ventas' : 'Visitas'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function SalesChart() {
  const [period, setPeriod] = useState<Period>('30d');
  const [data, setData] = useState(() => generateSampleData(30));

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    switch (newPeriod) {
      case '7d':
        setData(generateSampleData(7));
        break;
      case '30d':
        setData(generateSampleData(30));
        break;
      case '90d':
        setData(generateSampleData(90));
        break;
    }
  };

  return (
    <div className="w-full">
      {/* Period Selector */}
      <div className="flex flex-wrap justify-end gap-2 mb-4">
        {(['7d', '30d', '90d'] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => handlePeriodChange(p)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              period === p
                ? 'bg-blue-100 text-blue-600 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {p === '7d' ? '7 días' : p === '30d' ? '30 días' : '90 días'}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-4" style={{ height: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196f3" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2196f3" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1976d2" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              height={20}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `$${value}`}
              width={40}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="amount"
              name="Ventas"
              stroke="#2196f3"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAmount)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="visits"
              name="Visitas"
              stroke="#1976d2"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVisits)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Ventas ({period})</p>
          <p className="text-2xl font-semibold text-blue-700">
            ${data.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Total Visitas ({period})</p>
          <p className="text-2xl font-semibold text-purple-700">
            {Math.round(data.reduce((sum, item) => sum + item.visits, 0))}
          </p>
        </div>
      </div>
    </div>
  );
}
