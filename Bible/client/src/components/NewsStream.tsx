/* 新聞流組件 */
import React, { useState, useMemo } from 'react';
import type { NewsItem } from '@/types/data';

interface NewsStreamProps {
  items: NewsItem[];
}

export default function NewsStream({ items }: NewsStreamProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSuddenDeath, setFilterSuddenDeath] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = !filterSuddenDeath || item.isSuddenDeath;
      return matchesSearch && matchesFilter;
    });
  }, [items, searchTerm, filterSuddenDeath]);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-950 to-black rounded-lg border border-cyan-500/20 overflow-hidden">
      {/* 頭部 */}
      <div className="flex-shrink-0 p-3 border-b border-cyan-500/20 space-y-2">
        <h3 className="text-sm font-bold text-cyan-400 font-orbitron tracking-widest">
          📡 新聞監測流
        </h3>

        {/* 搜尋欄 */}
        <input
          type="text"
          placeholder="搜尋新聞..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-2 py-1 text-xs rounded border border-cyan-500/30 bg-slate-900/50 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
        />

        {/* 篩選按鈕 */}
        <button
          onClick={() => setFilterSuddenDeath(!filterSuddenDeath)}
          className="w-full px-2 py-1 text-xs rounded border transition-all duration-300 font-mono"
          style={{
            borderColor: filterSuddenDeath ? '#ff003c' : '#555566',
            backgroundColor: filterSuddenDeath ? '#ff003c20' : 'transparent',
            color: filterSuddenDeath ? '#ff003c' : '#555566',
          }}
        >
          {filterSuddenDeath ? '✓ 僅顯示猝死' : '○ 全部新聞'}
        </button>
      </div>

      {/* 新聞列表 */}
      <div className="flex-1 overflow-y-auto space-y-1 p-2">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 rounded border border-gray-700/50 hover:border-cyan-400/50 bg-slate-900/30 hover:bg-slate-800/50 transition-all duration-300 group"
            >
              {/* 日期和來源 */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs text-gray-500">{item.date}</span>
                <span className="text-xs font-mono text-gray-600">{item.source}</span>
              </div>

              {/* 標題 */}
              <p className="text-xs text-gray-300 group-hover:text-cyan-300 line-clamp-2 transition-colors">
                {item.title}
              </p>

              {/* 標籤 */}
              {item.isSuddenDeath && (
                <div className="mt-1 inline-block">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-red-900/40 text-red-400 border border-red-600/40">
                    ⚠ 猝死
                  </span>
                </div>
              )}
            </a>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-xs font-mono">
            無相符的新聞
          </div>
        )}
      </div>

      {/* 底部統計 */}
      <div className="flex-shrink-0 p-2 border-t border-gray-700/50 text-xs text-gray-500 font-mono text-center">
        顯示 {filteredItems.length} / {items.length} 條新聞
      </div>
    </div>
  );
}
