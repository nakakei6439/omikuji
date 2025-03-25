'use client';

import { useState } from 'react';

const zodiacSigns = [
  'おひつじ座', 'おうし座', 'ふたご座', 'かに座', 'しし座', 'おとめ座',
  'てんびん座', 'さそり座', 'いて座', 'やぎ座', 'みずがめ座', 'うお座'
];

const bloodTypes = ['A型', 'B型', 'O型', 'AB型'];

const fortunes = [
  { level: '大吉', color: 'text-red-500', description: '今日は最高の運勢です！何をしても成功するでしょう。' },
  { level: '中吉', color: 'text-orange-500', description: '良い運勢です。積極的に行動すると良いことがあります。' },
  { level: '小吉', color: 'text-yellow-500', description: 'まずまずの運勢です。慎重に行動しましょう。' },
  { level: '吉', color: 'text-green-500', description: '安定した運勢です。普段通り過ごすのが良いでしょう。' },
  { level: '末吉', color: 'text-blue-500', description: '少し注意が必要です。慎重に行動しましょう。' },
];

const luckyItems = [
  'スマートフォン', '本', '手帳', '時計', 'カバン', '傘', 'メガネ', '手帳',
  'カメラ', '音楽プレーヤー', 'キーホルダー', '手帳', 'カバン', '傘'
];

const luckyColors = [
  '赤', '青', '黄', '緑', '紫', 'ピンク', 'オレンジ', '白', '黒', '金', '銀'
];

export default function Home() {
  const [fortune, setFortune] = useState<{
    level: string;
    color: string;
    description: string;
    zodiac: string;
    bloodType: string;
    luckyItem: string;
    luckyColor: string;
  } | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');

  const drawFortune = () => {
    if (!selectedZodiac || !selectedBloodType) {
      alert('星座と血液型を選択してください');
      return;
    }

    setIsShaking(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      const fortune = fortunes[randomIndex];
      const luckyItem = luckyItems[Math.floor(Math.random() * luckyItems.length)];
      const luckyColor = luckyColors[Math.floor(Math.random() * luckyColors.length)];

      setFortune({
        ...fortune,
        zodiac: selectedZodiac,
        bloodType: selectedBloodType,
        luckyItem,
        luckyColor
      });
      setIsShaking(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          星座と血液型で占う今日の運勢
        </h1>
        
        {!fortune ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">星座を選択</label>
                <select
                  value={selectedZodiac}
                  onChange={(e) => setSelectedZodiac(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                >
                  <option value="" className="text-black">選択してください</option>
                  {zodiacSigns.map((sign) => (
                    <option key={sign} value={sign} className="text-black">{sign}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">血液型を選択</label>
                <select
                  value={selectedBloodType}
                  onChange={(e) => setSelectedBloodType(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                >
                  <option value="" className="text-black">選択してください</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type} className="text-black">{type}</option>
                  ))}
                </select>
              </div>
            </div>
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
            <div className="space-y-4 text-left">
              <p className="text-gray-700">
                <span className="font-semibold">星座：</span>
                {fortune.zodiac}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">血液型：</span>
                {fortune.bloodType}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">ラッキーアイテム：</span>
                {fortune.luckyItem}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">ラッキーカラー：</span>
                {fortune.luckyColor}
              </p>
              <p className="text-gray-700 mt-4">
                {fortune.description}
              </p>
            </div>
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
