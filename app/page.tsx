'use client';

import { useState } from 'react';

const fortunes = [
  { level: '大吉', color: 'text-red-500', description: '今日は最高の運勢です！何をしても成功するでしょう。' },
  { level: '中吉', color: 'text-orange-500', description: '良い運勢です。積極的に行動すると良いことがあります。' },
  { level: '小吉', color: 'text-yellow-500', description: 'まずまずの運勢です。慎重に行動しましょう。' },
  { level: '吉', color: 'text-green-500', description: '安定した運勢です。普段通り過ごすのが良いでしょう。' },
  { level: '末吉', color: 'text-blue-500', description: '少し注意が必要です。慎重に行動しましょう。' },
];

export default function Home() {
  const [fortune, setFortune] = useState<typeof fortunes[0] | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const drawFortune = () => {
    setIsShaking(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      setFortune(fortunes[randomIndex]);
      setIsShaking(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          今日の運勢
        </h1>
        
        {!fortune ? (
          <div className="space-y-6">
            <p className="text-gray-600 mb-8">
              おみくじを引いて、今日の運勢を占いましょう
            </p>
            <button
              onClick={drawFortune}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              おみくじを引く
            </button>
          </div>
        ) : (
          <div className={`space-y-6 ${isShaking ? 'animate-shake' : ''}`}>
            <div className={`text-5xl font-bold ${fortune.color} mb-4`}>
              {fortune.level}
            </div>
            <p className="text-gray-700 text-lg">
              {fortune.description}
            </p>
            <button
              onClick={() => setFortune(null)}
              className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition-all"
            >
              もう一度引く
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
