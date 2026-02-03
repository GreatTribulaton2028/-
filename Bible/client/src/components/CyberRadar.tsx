/* 高科技末世感雷達圖組件 */
import React, { useMemo } from 'react';

interface CyberRadarProps {
  workRelated: number;
  exercise: number;
  medical: number;
  other: number;
  total: number;
}

export default function CyberRadar({
  workRelated,
  exercise,
  medical,
  other,
  total,
}: CyberRadarProps) {
  // 計算各類別的百分比和角度
  const categories = useMemo(() => {
    const data = [
      { name: '過勞', value: workRelated, color: '#ff003c', angle: 0 },
      { name: '運動', value: exercise, color: '#f5d300', angle: 90 },
      { name: '醫療', value: medical, color: '#00f3ff', angle: 180 },
      { name: '其他', value: other, color: '#00ff41', angle: 270 },
    ];
    return data.map(item => ({
      ...item,
      percentage: total > 0 ? (item.value / total) * 100 : 0,
    }));
  }, [workRelated, exercise, medical, other, total]);

  // 生成雷達點
  const radarPoints = useMemo(() => {
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 120;

    return categories.map(cat => {
      const radius = (cat.value / Math.max(...categories.map(c => c.value), 1)) * maxRadius;
      const rad = (cat.angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY + radius * Math.sin(rad);
      return { ...cat, x, y, radius };
    });
  }, [categories]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-950 to-black rounded-lg overflow-hidden border border-cyan-500/20 p-4">
      {/* 背景掃描線 */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }} />
      </div>

      {/* SVG雷達圖 */}
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full max-w-xs max-h-xs relative z-10"
        style={{ filter: 'drop-shadow(0 0 20px rgba(0, 243, 255, 0.3))' }}
      >
        {/* 同心圓 */}
        {[1, 2, 3, 4].map(i => (
          <circle
            key={`circle-${i}`}
            cx="150"
            cy="150"
            r={30 * i}
            fill="none"
            stroke="rgba(0, 243, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* 十字軸線 */}
        <line x1="150" y1="30" x2="150" y2="270" stroke="rgba(0, 243, 255, 0.1)" strokeWidth="1" />
        <line x1="30" y1="150" x2="270" y2="150" stroke="rgba(0, 243, 255, 0.1)" strokeWidth="1" />

        {/* 斜線 */}
        <line x1="60" y1="60" x2="240" y2="240" stroke="rgba(0, 243, 255, 0.05)" strokeWidth="1" />
        <line x1="240" y1="60" x2="60" y2="240" stroke="rgba(0, 243, 255, 0.05)" strokeWidth="1" />

        {/* 旋轉掃描線 */}
        <g className="radar-sweep" style={{ transformOrigin: '150px 150px' }}>
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="30"
            stroke="url(#scanGradient)"
            strokeWidth="2"
            opacity="0.6"
          />
        </g>

        {/* 掃描漸變定義 */}
        <defs>
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#00f3ff', stopOpacity: 0 }} />
            <stop offset="50%" style={{ stopColor: '#00f3ff', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#ff003c', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>

        {/* 數據點和連線 */}
        <polyline
          points={`150,150 ${radarPoints.map(p => `${p.x},${p.y}`).join(' ')} ${radarPoints[0].x},${radarPoints[0].y}`}
          fill="rgba(0, 243, 255, 0.1)"
          stroke="rgba(0, 243, 255, 0.4)"
          strokeWidth="2"
        />

        {/* 數據點 */}
        {radarPoints.map((point, idx) => (
          <g key={`point-${idx}`}>
            {/* 外圈光暈 */}
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="none"
              stroke={point.color}
              strokeWidth="1"
              opacity="0.3"
            />
            {/* 內核 */}
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={point.color}
              opacity="0.9"
              style={{ filter: `drop-shadow(0 0 8px ${point.color})` }}
            />
            {/* 標籤 */}
            <text
              x={point.x}
              y={point.y - 15}
              textAnchor="middle"
              fill={point.color}
              fontSize="12"
              fontFamily="'Share Tech Mono', monospace"
              fontWeight="bold"
              style={{ textShadow: `0 0 8px ${point.color}` }}
            >
              {point.name}
            </text>
            <text
              x={point.x}
              y={point.y - 2}
              textAnchor="middle"
              fill={point.color}
              fontSize="14"
              fontFamily="'Orbitron', sans-serif"
              fontWeight="bold"
            >
              {point.value}
            </text>
          </g>
        ))}

        {/* 中央大數字 */}
        <text
          x="150"
          y="155"
          textAnchor="middle"
          fill="#eeeeee"
          fontSize="48"
          fontFamily="'Orbitron', sans-serif"
          fontWeight="900"
          style={{
            textShadow: '0 0 20px rgba(0, 243, 255, 0.6)',
            filter: 'drop-shadow(0 0 10px rgba(0, 243, 255, 0.4))',
          }}
        >
          {total}
        </text>
        <text
          x="150"
          y="175"
          textAnchor="middle"
          fill="#00f3ff"
          fontSize="12"
          fontFamily="'Share Tech Mono', monospace"
          letterSpacing="2"
        >
          TOTAL
        </text>
      </svg>

      {/* 圖例 */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono w-full">
        {categories.map((cat, idx) => (
          <div key={`legend-${idx}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: cat.color,
                boxShadow: `0 0 8px ${cat.color}`,
              }}
            />
            <span style={{ color: cat.color }}>
              {cat.name}: {cat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
