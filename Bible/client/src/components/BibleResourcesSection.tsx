/* 聖經資訊超連結區塊組件 */
import React, { useState } from 'react';
import type { BibleResourceLink } from '@/types/data';

interface BibleResourcesSectionProps {
  resources: BibleResourceLink[];
}

export default function BibleResourcesSection({
  resources,
}: BibleResourcesSectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Information': '📖',
      'Prophecy': '🔮',
      'Reset': '⚙️',
      'Scripture': '✝️',
    };
    return icons[category] || '📌';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Information': '#00f3ff', // 青色
      'Prophecy': '#f5d300', // 金色
      'Reset': '#ff003c', // 紅色
      'Scripture': '#00ff41', // 綠色
    };
    return colors[category] || '#eeeeee';
  };

  const getLanguageLabel = (lang: string) => {
    const labels: { [key: string]: string } = {
      'Cantonese': '廣東話',
      'Mandarin': '普通話',
      'English': 'English',
    };
    return labels[lang] || lang;
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-950 to-black rounded-lg border border-gold-500/20 p-4 overflow-hidden">
      {/* 標題 */}
      <div className="mb-4 pb-3 border-b border-yellow-600/30">
        <h3 className="text-lg font-bold text-yellow-500 font-orbitron tracking-widest">
          《 聖經。大災難。資訊 》
        </h3>
        <p className="text-xs text-gray-500 mt-1 font-mono">
          大災難相關資源 | 多語言支持
        </p>
      </div>

      {/* 超連結網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 rounded border transition-all duration-300 overflow-hidden"
            style={{
              borderColor: getCategoryColor(resource.category),
              backgroundColor: `${getCategoryColor(resource.category)}10`,
            }}
            onMouseEnter={() => setHoveredId(resource.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* 背景漸變 */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${getCategoryColor(resource.category)}, transparent)`,
              }}
            />

            {/* 內容 */}
            <div className="relative z-10">
              {/* 頭部 */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCategoryIcon(resource.category)}</span>
                  <span
                    className="text-xs font-bold font-mono px-2 py-0.5 rounded"
                    style={{
                      color: getCategoryColor(resource.category),
                      backgroundColor: `${getCategoryColor(resource.category)}30`,
                    }}
                  >
                    {resource.category}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {getLanguageLabel(resource.language)}
                </span>
              </div>

              {/* 標題 */}
              <h4
                className="font-bold text-sm mb-1 group-hover:translate-x-1 transition-transform duration-300"
                style={{ color: getCategoryColor(resource.category) }}
              >
                {resource.title}
              </h4>

              {/* 描述 */}
              <p className="text-xs text-gray-400 line-clamp-2 group-hover:line-clamp-none">
                {resource.description}
              </p>

              {/* 箭頭 */}
              <div className="mt-2 flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span style={{ color: getCategoryColor(resource.category) }}>
                  查看資源
                </span>
                <span style={{ color: getCategoryColor(resource.category) }}>→</span>
              </div>
            </div>

            {/* 邊框發光效果 */}
            {hoveredId === resource.id && (
              <div
                className="absolute inset-0 rounded pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 20px ${getCategoryColor(resource.category)}40, 0 0 20px ${getCategoryColor(resource.category)}20`,
                }}
              />
            )}
          </a>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="mt-4 pt-3 border-t border-gray-700 text-center">
        <p className="text-xs text-gray-500 font-mono">
          🔗 點擊超連結查看完整資源
        </p>
      </div>
    </div>
  );
}
