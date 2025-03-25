'use client';

import { useState, useEffect } from 'react';
import { fortunes, getFortuneDescriptions } from './lib/fortunes';

const zodiacSigns = [
  { name: 'おひつじ座', image: '/zodiac/aries.png' },
  { name: 'おうし座', image: '/zodiac/taurus.png' },
  { name: 'ふたご座', image: '/zodiac/gemini.png' },
  { name: 'かに座', image: '/zodiac/cancer.png' },
  { name: 'しし座', image: '/zodiac/leo.png' },
  { name: 'おとめ座', image: '/zodiac/virgo.png' },
  { name: 'てんびん座', image: '/zodiac/libra.png' },
  { name: 'さそり座', image: '/zodiac/scorpio.png' },
  { name: 'いて座', image: '/zodiac/sagittarius.png' },
  { name: 'やぎ座', image: '/zodiac/capricorn.png' },
  { name: 'みずがめ座', image: '/zodiac/aquarius.png' },
  { name: 'うお座', image: '/zodiac/pisces.png' }
];

const bloodTypes = ['A型', 'B型', 'O型', 'AB型'];

const luckyItems = [
  'スマートフォン', '腕時計', 'ネックレス', 'イヤリング', 'ピアス', 'ブレスレット', 'リング', 'アンクレット',
  'ヘアピン', 'ヘアバンド', 'カチューシャ', 'シュシュ', 'バレッタ', 'ブローチ', 'スカーフ', 'ネクタイ',
  'マフラー', '手袋', '帽子', 'キャップ', 'ニット帽', 'サングラス', 'メガネ', 'コンタクトレンズ',
  'マスク', 'イヤホン', 'スマートウォッチ', 'フィットネストラッカー', 'バッグ', 'リュック',
  'ウエストポーチ', 'ショルダーバッグ', '財布', 'カードケース', 'キーケース', 'パスケース',
  'スマホケース', 'タブレットケース', 'ノートPC', '手帳', 'ペン', 'ボールペン', '万年筆',
  'メモ帳', '名刺入れ', 'ハンカチ', 'タオル', '折りたたみ傘', '日傘', '扇子',
  'ベルト', '靴下', 'インソール', '靴紐', 'チャーム', 'キーホルダー', 'ストラップ',
  'バッジ', 'ワッペン', 'カフスボタン', 'タイピン', 'ポケットチーフ', '印鑑', '名札',
  'IDカード', '定期入れ', 'コインケース', '手鏡', 'コンパクト', 'リップクリーム', 'ハンドクリーム',
  'ボディミスト', '制汗剤', 'ヘアワックス', 'ヘアブラシ', '櫛', '爪切り', 'ハサミ',
  '歯ブラシ', 'うがい薬', 'マウスウォッシュ', '目薬', '絆創膏', 'ウェットティッシュ', 'ティッシュ',
  'ポケットWi-Fi', 'モバイルバッテリー', 'USB充電ケーブル', 'ACアダプター', '変換プラグ', '電卓',
  '時計', '懐中電灯', 'ライター', '栓抜き', 'マルチツール', '爪楊枝', '携帯用箸',
  'エコバッグ', 'ボトル', 'タンブラー', '弁当箱', 'カトラリーセット', '除菌スプレー', '消臭スプレー'
];

const luckyColors = [
  { name: '赤', color: 'text-red-500' },
  { name: '青', color: 'text-blue-500' },
  { name: '黄', color: 'text-yellow-500' },
  { name: '緑', color: 'text-green-500' },
  { name: '紫', color: 'text-purple-500' },
  { name: 'ピンク', color: 'text-pink-500' },
  { name: 'オレンジ', color: 'text-orange-500' },
  { name: '白', color: 'text-black' },
  { name: '黒', color: 'text-black' },
  { name: '金', color: 'text-yellow-400' },
  { name: '銀', color: 'text-gray-400' }
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
    luckyColorClass: string;
  } | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [fortuneDescriptions, setFortuneDescriptions] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // コンポーネントマウント時に運勢の説明文を取得
    const fetchDescriptions = async () => {
      const descriptions: { [key: string]: string[] } = {};
      for (const fortune of fortunes) {
        descriptions[fortune.level] = await getFortuneDescriptions(fortune.level);
      }
      setFortuneDescriptions(descriptions);
    };
    fetchDescriptions();
  }, []);

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
      const descriptions = fortuneDescriptions[fortune.level] || [];
      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)] || '';

      setFortune({
        ...fortune,
        zodiac: selectedZodiac,
        bloodType: selectedBloodType,
        luckyItem,
        luckyColor: luckyColor.name,
        luckyColorClass: luckyColor.color,
        description: randomDescription
      });
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
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">星座を選択</label>
                <select
                  value={selectedZodiac}
                  onChange={(e) => {
                    setSelectedZodiac(e.target.value);
                  }}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
                >
                  <option value="" className="text-black">選択してください</option>
                  {zodiacSigns.map((sign) => (
                    <option key={sign.name} value={sign.name} className="text-black">{sign.name}</option>
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
              占ってみる
            </button>
          </div>
        ) : (
          <div className={`space-y-6 ${isShaking ? 'animate-shake' : ''}`}>
            <div className={`text-5xl font-bold ${fortune.color} mb-4`}>
              {fortune.level}
            </div>
            <div className="flex flex-col items-center mb-6">
              <img
                src={zodiacSigns.find(z => z.name === fortune.zodiac)?.image}
                alt={fortune.zodiac}
                className="w-32 h-32 object-contain mb-4"
              />
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {fortune.zodiac}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {fortune.bloodType}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-left">
              <p className="text-gray-700">
                <span className="font-semibold">ラッキーアイテム：</span>
                {fortune.luckyItem}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">ラッキーカラー：</span>
                <span className={fortune.luckyColorClass}>{fortune.luckyColor}</span>
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
