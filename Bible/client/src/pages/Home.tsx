/* 末世監控系統主頁面 */
import React, { useState, useMemo } from 'react';
import CyberRadar from '@/components/CyberRadar';
import SuddenDeathDetails from '@/components/SuddenDeathDetails';
import BibleResourcesSection from '@/components/BibleResourcesSection';
import NewsStream from '@/components/NewsStream';
import StatisticsPanel from '@/components/StatisticsPanel';
import type { SuddenDeathRecord, NewsItem, BibleResourceLink } from '@/types/data';

export default function Home() {
  // 模擬數據 - 實際應用中應從API獲取
  const [suddenDeathRecords] = useState<SuddenDeathRecord[]>([
    {
      id: '1',
      date: '2026-01-23',
      title: '程式員在家辦公猝死 掀「工傷」定義爭議',
      url: 'https://news.mingpao.com/pns/',
      category: 'work-related',
      age: 32,
      gender: 'M',
      location: '廣州',
      description: '32歲程式員周末在家辦公時暈倒後猝死，搶救期間仍被拉入工作群組',
    },
    {
      id: '2',
      date: '2026-01-24',
      title: '重慶馬拉松 破三跑手臨近終點不支倒地',
      url: 'https://hk.sports.yahoo.com/news/',
      category: 'exercise',
      age: 45,
      gender: 'M',
      location: '重慶',
      description: '馬拉松選手在接近終點時突然倒地，送院後宣告不治',
    },
    {
      id: '3',
      date: '2026-01-24',
      title: 'Uber女司機新店載客 剛到社區「昏倒猝死」',
      url: 'https://www.msn.com/zh-tw/',
      category: 'other',
      age: 28,
      gender: 'F',
      location: '新店',
      description: '女性Uber司機在社區內突然昏倒，警衛發現時已無生命跡象',
    },
    {
      id: '4',
      date: '2026-01-26',
      title: '30歲女吃自助餐後腹痛離世',
      url: 'https://www.singtao.ca/',
      category: 'medical',
      age: 30,
      gender: 'F',
      location: '香港',
      description: '體內三酸甘油脂超標26倍，醫生揭致命關鍵',
    },
    {
      id: '5',
      date: '2026-01-26',
      title: '40歲男子港島徑行山時不適暈倒',
      url: 'https://news.tvb.com/tc/',
      category: 'exercise',
      age: 40,
      gender: 'M',
      location: '港島',
      description: '行山時突然不適暈倒，送院搶救後不治',
    },
  ]);

  const [newsItems] = useState<NewsItem[]>([
    {
      id: 'n1',
      date: '2026-01-23',
      title: '程式員在家辦公猝死 掀「工傷」定義爭議',
      url: 'https://news.mingpao.com/',
      source: '明報',
      category: '工作',
      isSuddenDeath: true,
    },
    {
      id: 'n2',
      date: '2026-01-24',
      title: '重慶馬拉松 破三跑手臨近終點不支倒地',
      url: 'https://hk.sports.yahoo.com/',
      source: 'Yahoo體育',
      category: '運動',
      isSuddenDeath: true,
    },
    {
      id: 'n3',
      date: '2026-01-24',
      title: 'Uber女司機新店載客 剛到社區「昏倒猝死」',
      url: 'https://www.msn.com/zh-tw/',
      source: 'MSN新聞',
      category: '社會',
      isSuddenDeath: true,
    },
    {
      id: 'n4',
      date: '2026-01-25',
      title: '內地6旬漢跟團遊北京猝死',
      url: 'https://www.hk01.com/',
      source: 'HK01',
      category: '旅遊',
      isSuddenDeath: true,
    },
    {
      id: 'n5',
      date: '2026-01-26',
      title: '名醫辦公室猝逝 專家示警惡性心律不整',
      url: 'https://www.msn.com/zh-tw/',
      source: 'MSN新聞',
      category: '健康',
      isSuddenDeath: true,
    },
  ]);

  const [bibleResources] = useState<BibleResourceLink[]>([
    {
      id: 'b1',
      title: '資訊',
      description: '聖經大災難相關基礎信息',
      url: 'https://e.pcloud.link/publink/show?code=kZt8zaZd7iPCbuRK7mXuE6Lg4fjEJ933Sr7',
      language: 'Cantonese',
      category: 'Information',
    },
    {
      id: 'b2',
      title: '瘟疫中的邪術',
      description: '探討末世時期的靈性戰爭',
      url: 'https://e.pcloud.link/publink/show?code=kZU8zaZLBosh9pTrp8O7DGN7wlrDJlU3JDy',
      language: 'Cantonese',
      category: 'Prophecy',
    },
    {
      id: 'b3',
      title: '第四次工業革命 Great Reset',
      description: '新世界秩序與聖經預言',
      url: 'https://e.pcloud.link/publink/show?code=kZN8zaZXgsGC7Chqaprdidpa07hMSrFWyGV',
      language: 'Cantonese',
      category: 'Reset',
    },
    {
      id: 'b4',
      title: '聖經資訊 廣東話',
      description: '聖經預言與末世時代',
      url: 'https://e.pcloud.link/publink/show?code=kZG8zaZpg5DO5gtmuhmDUrC4tjRCpJ7QT8V',
      language: 'Cantonese',
      category: 'Scripture',
    },
    {
      id: 'b5',
      title: '聖經資訊 普通話',
      description: '聖經預言與末世時代',
      url: 'https://e.pcloud.link/publink/show?code=kZG8zaZpg5DO5gtmuhmDUrC4tjRCpJ7QT8V',
      language: 'Mandarin',
      category: 'Scripture',
    },
  ]);

  // 計算統計數據
  const categoryBreakdown = useMemo(() => {
    const breakdown: { [key: string]: number } = {
      'work-related': 0,
      'exercise': 0,
      'medical': 0,
      'other': 0,
    };
    suddenDeathRecords.forEach(record => {
      breakdown[record.category]++;
    });
    return breakdown;
  }, [suddenDeathRecords]);

  const radarData = useMemo(() => {
    return {
      workRelated: categoryBreakdown['work-related'],
      exercise: categoryBreakdown['exercise'],
      medical: categoryBreakdown['medical'],
      other: categoryBreakdown['other'],
      total: suddenDeathRecords.length,
    };
  }, [categoryBreakdown, suddenDeathRecords]);

  const monthlyTrend = [3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10];
  const weeklyAverage = 7.5;

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* 掃描線背景 */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }} />
      </div>

      {/* 主容器 */}
      <div className="relative z-10 w-full">
        {/* 頭部 */}
        <header className="border-b border-cyan-500/20 bg-gradient-to-b from-slate-950 to-black/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold font-orbitron tracking-widest text-white glitch-text">
                  PROJECT: TRIBULATION
                </h1>
                <p className="text-xs md:text-sm text-cyan-400 font-mono mt-1">
                  CLASSIFIED MONITORING SYSTEM // V2.0
                </p>
              </div>
              <div className="text-right text-xs md:text-sm text-gray-500 font-mono">
                <div>STATUS: ACTIVE</div>
                <div>RECORDS: {suddenDeathRecords.length}</div>
              </div>
            </div>
          </div>
        </header>

        {/* 聖經資訊區塊 */}
        <section className="border-b border-cyan-500/20 bg-gradient-to-b from-black to-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <BibleResourcesSection resources={bibleResources} />
          </div>
        </section>

        {/* 主內容區 */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            {/* 桌面版：3欄布局 */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 mb-6">
              {/* 左欄：新聞流 */}
              <div className="lg:col-span-3 h-96">
                <NewsStream items={newsItems} />
              </div>

              {/* 中欄：雷達圖 */}
              <div className="lg:col-span-6 h-96">
                <CyberRadar {...radarData} />
              </div>

              {/* 右欄：統計面板 */}
              <div className="lg:col-span-3 h-96">
                <StatisticsPanel
                  totalDeaths={radarData.total}
                  weeklyAverage={weeklyAverage}
                  monthlyTrend={monthlyTrend}
                  categoryBreakdown={categoryBreakdown}
                />
              </div>
            </div>

            {/* 平板版：2欄布局 */}
            <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-4 mb-6">
              {/* 新聞流 */}
              <div className="h-80">
                <NewsStream items={newsItems} />
              </div>

              {/* 雷達圖和統計 */}
              <div className="space-y-4">
                <div className="h-48">
                  <CyberRadar {...radarData} />
                </div>
                <div className="h-28">
                  <StatisticsPanel
                    totalDeaths={radarData.total}
                    weeklyAverage={weeklyAverage}
                    monthlyTrend={monthlyTrend}
                    categoryBreakdown={categoryBreakdown}
                  />
                </div>
              </div>
            </div>

            {/* 手機版：單欄堆疊 */}
            <div className="md:hidden space-y-4 mb-6">
              <div className="h-64">
                <NewsStream items={newsItems} />
              </div>
              <div className="h-72">
                <CyberRadar {...radarData} />
              </div>
              <div className="h-80">
                <StatisticsPanel
                  totalDeaths={radarData.total}
                  weeklyAverage={weeklyAverage}
                  monthlyTrend={monthlyTrend}
                  categoryBreakdown={categoryBreakdown}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 猝死明細表 */}
        <section className="border-t border-cyan-500/20 bg-gradient-to-b from-slate-950/50 to-black py-6">
          <div className="max-w-7xl mx-auto px-4">
            <SuddenDeathDetails
              records={suddenDeathRecords}
              categoryBreakdown={categoryBreakdown}
            />
          </div>
        </section>

        {/* 跑馬燈（新聞滾動） */}
        <section className="border-t border-cyan-500/20 bg-black py-3 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 animate-scroll">
              <span className="text-xs font-mono text-cyan-400 whitespace-nowrap">
                ⚠ 實時監測
              </span>
              {newsItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-cyan-400 whitespace-nowrap transition-colors"
                >
                  {item.date} | {item.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 頁腳 */}
        <footer className="border-t border-cyan-500/20 bg-gradient-to-t from-slate-950 to-black py-4">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-600 font-mono">
            <p>PROJECT: TRIBULATION MONITOR // ENHANCED V2.0</p>
            <p className="mt-1">⚠ 本系統用於信息監測和統計分析 | 數據每日更新</p>
          </div>
        </footer>
      </div>

      {/* 自定義滾動動畫 */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
