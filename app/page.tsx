'use client';

import { useState } from 'react';

const zodiacSigns = [
  'おひつじ座', 'おうし座', 'ふたご座', 'かに座', 'しし座', 'おとめ座',
  'てんびん座', 'さそり座', 'いて座', 'やぎ座', 'みずがめ座', 'うお座'
];

const bloodTypes = ['A型', 'B型', 'O型', 'AB型'];

type Fortune = {
  level: string;
  color: string;
  description?: string;
  descriptions?: string[];
};

const fortunes: Fortune[] = [
  { 
    level: '大吉', 
    color: 'text-red-500', 
    descriptions: [
      '今日は最高の運勢です！何をしても成功するでしょう。新しいことに挑戦するのに最適な日です。思い切った行動が良い結果を生むかもしれません。',
      '大吉です！今日は特別な日になるでしょう。思いがけない幸運が訪れるかもしれません。積極的に行動すると、さらに良いことがあるでしょう。',
      '最高の運勢です！今日はあなたの才能が開花する日かもしれません。周りの人々もあなたをサポートしてくれるでしょう。',
      '大吉が訪れました！今日は新しい出会いやチャンスに恵まれるでしょう。直感を信じて行動すると良い結果が得られるかもしれません。',
      '素晴らしい運勢です！今日はあなたの努力が報われる日になるでしょう。周りの人々もあなたの成功を喜んでくれるはずです。'
    ]
  },
  { 
    level: '中吉', 
    color: 'text-orange-500', 
    descriptions: [
      '良い運勢です。積極的に行動すると良いことがあります。周りの人との協力が吉と出るでしょう。',
      '今日は前向きな気持ちで過ごせそうです。新しいアイデアが浮かぶかもしれません。',
      'チャレンジ精神を持って行動すると、思わぬ発見があるかもしれません。',
      '周りの人からの支援を得られそうです。コミュニケーションを大切にしましょう。'
    ]
  },
  { 
    level: '小吉', 
    color: 'text-yellow-500', 
    descriptions: [
      'まずまずの運勢です。慎重に行動しましょう。小さな幸せを見つけられる日です。',
      '穏やかな一日になりそうです。日常の中に楽しみを見つけましょう。',
      '着実に物事を進めることで、良い結果が得られるでしょう。',
      '小さな変化に気づくことで、新しい発見があるかもしれません。'
    ]
  },
  { 
    level: '吉', 
    color: 'text-green-500', 
    descriptions: [
      '安定した運勢です。普段通り過ごすのが良いでしょう。無理をせず、自分のペースで進めましょう。',
      '堅実な行動が吉となります。基本に忠実に過ごしましょう。',
      '着実な努力が実を結ぶ日です。焦らず進むことが大切です。',
      '周りとの調和を大切にすることで、良い一日になるでしょう。'
    ]
  },
  { 
    level: '末吉', 
    color: 'text-blue-500', 
    descriptions: [
      '少し注意が必要です。慎重に行動しましょう。周りの人の意見を聞くことで、良い方向に進めるかもしれません。',
      '予期せぬ出来事に備えて、余裕を持って行動しましょう。',
      '今日は特に計画を立てて行動することをお勧めします。',
      '周りの助言に耳を傾けることで、困難を回避できるかもしれません。'
    ]
  },
  { 
    level: '平', 
    color: 'text-gray-500', 
    descriptions: [
      '平穏な運勢です。特別な変化はありませんが、安定した日々を過ごせるでしょう。',
      '日常を大切にする日です。当たり前の日常に感謝しましょう。',
      '無理のない範囲で物事を進めることをお勧めします。',
      '穏やかに過ごすことで、心が落ち着く一日になるでしょう。'
    ]
  },
  { 
    level: '凶', 
    color: 'text-purple-500', 
    descriptions: [
      '今日は慎重に過ごしましょう。大きな決断は避け、周りの人に相談しながら行動することをお勧めします。',
      '予定変更や遅れに注意が必要です。余裕を持った行動を心がけましょう。',
      '慌てずに一つ一つ確認しながら行動することが大切です。',
      '困ったときは周りの人に相談することで、解決の糸口が見つかるかもしれません。'
    ]
  }
];

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
        luckyColor,
        description: fortune.descriptions
          ? fortune.descriptions[Math.floor(Math.random() * fortune.descriptions.length)]
          : fortune.description || ''
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
              占ってみる
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
