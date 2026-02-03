/* 統計面板組件 */
import React from 'react';

interface StatisticsPanelProps {
  totalDeaths: number;
  weeklyAverage: number;
  monthlyTrend: number[];
  categoryBreakdown: {
    [key: string]: number;
  };
}

export default function StatisticsPanel({
  totalDeaths,
  weeklyAverage,
  monthlyTrend,
  categoryBreakdown,
}: StatisticsPanelProps) {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'work-related': '#ff003c',
      'exercise': '#f5d300',
      'medical': '#00f3ff',
      'other': '#00ff41',
    };
    return colors[category] || '#eeeeee';
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      'work-related': '過勞',
      'exercise': '運動',
      'medical': '醫療',
      'other': '其他',
    };
    return labels[category] || category;
  };

  const maxValue = Math.max(...monthlyTrend, 1);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-950 to-black rounded-lg border border-cyan-500/20 overflow-hidden p-4 space-y-4">
      {/* 標題 */}
      <div className="pb-3 border-b border-cyan-500/20">
        <h3 className="text-sm font-bold text-cyan-400 font-orbitron tracking-widest">
          📊 統計面板
        </h3>
      </div>

      {/* 主要統計 */}
      <div className="space-y-3">
        {/* 總數 */}
        <div className="p-3 rounded border border-cyan-500/30 bg-cyan-500/10">
          <div className="text-xs text-gray-500 font-mono mb-1">總計猝死</div>
          <div
            className="text-3xl font-bold font-orbitron"
            style={{
              color: '#00f3ff',
              textShadow: '0 0 20px rgba(0, 243, 255, 0.5)',
            }}
          >
            {totalDeaths}
          </div>
        </div>

        {/* 周平均 */}
        <div className="p-3 rounded border border-yellow-600/30 bg-yellow-600/10">
          <div className="text-xs text-gray-500 font-mono mb-1">周平均</div>
          <div
            className="text-2xl font-bold font-orbitron"
            style={{
              color: '#f5d300',
              textShadow: '0 0 20px rgba(245, 211, 0, 0.5)',
            }}
          >
            {weeklyAverage.toFixed(1)}
          </div>
        </div>
      </div>

      {/* 月度趨勢圖 */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500 font-mono">月度趨勢</div>
        <div className="flex items-end justify-between gap-1 h-20 p-2 rounded border border-gray-700/30 bg-slate-900/50">
          {monthlyTrend.map((value, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-t transition-all duration-300 hover:opacity-80"
              style={{
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: value > weeklyAverage ? '#ff003c' : '#00f3ff',
                boxShadow: `0 0 8px ${value > weeklyAverage ? '#ff003c' : '#00f3ff'}`,
                minHeight: '2px',
              }}
              title={`Day ${idx + 1}: ${value}`}
            />
          ))}
        </div>
      </div>

      {/* 類別分布 */}
      <div className="space-y-2">
        <div className="text-xs text-gray-500 font-mono">類別分布</div>
        <div className="space-y-1">
          {Object.entries(categoryBreakdown).map(([category, count]) => {
            const percentage = totalDeaths > 0 ? (count / totalDeaths) * 100 : 0;
            return (
              <div key={category} className="space-y-0.5">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="font-mono"
                    style={{ color: getCategoryColor(category) }}
                  >
                    {getCategoryLabel(category)}
                  </span>
                  <span className="text-gray-500">{count}</span>
                </div>
                <div className="w-full h-2 rounded bg-slate-800/50 overflow-hidden border border-gray-700/30">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getCategoryColor(category),
                      boxShadow: `0 0 8px ${getCategoryColor(category)}`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 警告信息 */}
      <div className="mt-auto pt-3 border-t border-gray-700/30 text-xs text-red-400 font-mono text-center">
        ⚠ 實時監測中 | 數據每日更新
      </div>
    </div>
  );
}
