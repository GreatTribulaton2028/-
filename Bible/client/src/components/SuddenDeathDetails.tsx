/* 猝死明細表組件 */
import React, { useState } from 'react';
import type { SuddenDeathRecord } from '@/types/data';

interface SuddenDeathDetailsProps {
  records: SuddenDeathRecord[];
  categoryBreakdown: {
    [key: string]: number;
  };
}

export default function SuddenDeathDetails({
  records,
  categoryBreakdown,
}: SuddenDeathDetailsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'work-related': '#ff003c', // 紅色 - 過勞
      'exercise': '#f5d300', // 金色 - 運動
      'medical': '#00f3ff', // 青色 - 醫療
      'other': '#00ff41', // 綠色 - 其他
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

  return (
    <div className="w-full bg-gradient-to-b from-slate-950 to-black rounded-lg border border-cyan-500/20 p-4 overflow-hidden">
      {/* 標題 */}
      <div className="mb-4 pb-3 border-b border-cyan-500/20">
        <h3 className="text-lg font-bold text-cyan-400 font-orbitron tracking-widest">
          ⚠ 猝死明細分析
        </h3>
        <p className="text-xs text-gray-500 mt-1 font-mono">
          共計 {records.length} 宗記錄 | 按類別統計
        </p>
      </div>

      {/* 類別統計 */}
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {Object.entries(categoryBreakdown).map(([category, count]) => (
          <div
            key={category}
            className="p-2 rounded border transition-all duration-300"
            style={{
              borderColor: getCategoryColor(category),
              backgroundColor: `${getCategoryColor(category)}15`,
            }}
          >
            <div
              className="text-xs font-mono font-bold"
              style={{ color: getCategoryColor(category) }}
            >
              {getCategoryLabel(category)}
            </div>
            <div
              className="text-lg font-bold font-orbitron"
              style={{ color: getCategoryColor(category) }}
            >
              {count}
            </div>
          </div>
        ))}
      </div>

      {/* 明細表 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {records.slice(0, 10).map((record, idx) => (
          <div
            key={record.id}
            className="border rounded p-2 transition-all duration-300 cursor-pointer hover:border-opacity-100"
            style={{
              borderColor: getCategoryColor(record.category),
              backgroundColor: `${getCategoryColor(record.category)}08`,
              opacity: 0.9,
            }}
            onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
          >
            {/* 摘要行 */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-bold font-mono px-2 py-0.5 rounded"
                    style={{
                      color: getCategoryColor(record.category),
                      backgroundColor: `${getCategoryColor(record.category)}30`,
                    }}
                  >
                    {getCategoryLabel(record.category)}
                  </span>
                  <span className="text-xs text-gray-500">{record.date}</span>
                </div>
                <p className="text-sm text-gray-300 line-clamp-2 hover:line-clamp-none">
                  {record.title}
                </p>
              </div>
              <span className="text-cyan-400 font-bold text-lg">
                {expandedId === record.id ? '−' : '+'}
              </span>
            </div>

            {/* 展開詳情 */}
            {expandedId === record.id && (
              <div className="mt-2 pt-2 border-t border-gray-700 space-y-1 text-xs">
                {record.age && (
                  <div className="text-gray-400">
                    <span className="text-cyan-400 font-mono">年齡:</span> {record.age}
                  </div>
                )}
                {record.gender && (
                  <div className="text-gray-400">
                    <span className="text-cyan-400 font-mono">性別:</span> {record.gender === 'M' ? '男' : record.gender === 'F' ? '女' : '未知'}
                  </div>
                )}
                {record.location && (
                  <div className="text-gray-400">
                    <span className="text-cyan-400 font-mono">地點:</span> {record.location}
                  </div>
                )}
                {record.description && (
                  <div className="text-gray-400 mt-2">
                    <span className="text-cyan-400 font-mono">詳情:</span>
                    <p className="mt-1 text-gray-500">{record.description}</p>
                  </div>
                )}
                <a
                  href={record.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline mt-2 inline-block"
                >
                  查看原文 →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 更多提示 */}
      {records.length > 10 && (
        <div className="mt-2 text-center text-xs text-gray-500 font-mono">
          ... 還有 {records.length - 10} 條記錄
        </div>
      )}
    </div>
  );
}
