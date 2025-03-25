'use client';

import { useState } from 'react';

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
      '今日は最高の運勢です！何をしても成功するでしょう。新しいことに挑戦するのに最適な日です。思い切った行動が良い結果を生むかもしれません。周りの人からの支援も期待できるでしょう。今までやりたかったことにチャレンジするのにぴったりのタイミングです。',
      '大吉です！今日は特別な日になるでしょう。思いがけない幸運が訪れるかもしれません。積極的に行動すると、さらに良いことがあるでしょう。人との出会いも大切にしてください。新しい可能性が広がる予感があります。直感を信じて前に進むことをお勧めします。',
      '最高の運勢です！今日はあなたの才能が開花する日かもしれません。周りの人々もあなたをサポートしてくれるでしょう。長年の夢が叶うきっかけになるかもしれません。自信を持って行動することで、さらなる発展が期待できます。チャンスを逃さないように注意を払いましょう。',
      '大吉が訪れました！今日は新しい出会いやチャンスに恵まれるでしょう。直感を信じて行動すると良い結果が得られるかもしれません。これまでの努力が実を結ぶ日になるかもしれません。周りの人との関係も良好で、協力を得られやすい日です。',
      '素晴らしい運勢です！今日はあなたの努力が報われる日になるでしょう。周りの人々もあなたの成功を喜んでくれるはずです。新しいプロジェクトや挑戦も成功する可能性が高いです。自分の直感を信じて、積極的に行動することをお勧めします。'
    ]
  },
  { 
    level: '中吉', 
    color: 'text-orange-500', 
    descriptions: [
      '良い運勢です。積極的に行動すると良いことがあります。周りの人との協力が吉と出るでしょう。特に、チームワークを必要とする活動で良い結果が期待できます。新しいアイデアも浮かびやすい日なので、クリエイティブな活動もお勧めです。',
      '今日は前向きな気持ちで過ごせそうです。新しいアイデアが浮かぶかもしれません。人との交流も活発になり、有意義な情報交換ができるでしょう。学びの機会も多く、自己成長につながる日になりそうです。',
      'チャレンジ精神を持って行動すると、思わぬ発見があるかもしれません。普段とは違う角度から物事を見ることで、新しい可能性が見えてくるでしょう。好奇心を持って過ごすことで、より充実した一日になりそうです。',
      '周りの人からの支援を得られそうです。コミュニケーションを大切にしましょう。特に、普段あまり話さない人との会話から、貴重なアドバイスをもらえるかもしれません。新しい友好関係を築くチャンスもあります。'
    ]
  },
  { 
    level: '小吉', 
    color: 'text-yellow-500', 
    descriptions: [
      'まずまずの運勢です。慎重に行動しましょう。小さな幸せを見つけられる日です。日常の中に隠れている素晴らしい発見があるかもしれません。些細なことにも感謝の気持ちを持って過ごすと、より充実した一日になるでしょう。',
      '穏やかな一日になりそうです。日常の中に楽しみを見つけましょう。特に、趣味や創作活動で新しい発見があるかもしれません。自分のペースを保ちながら、着実に前進することをお勧めします。',
      '着実に物事を進めることで、良い結果が得られるでしょう。焦らず、一つ一つの作業に丁寧に取り組むことが大切です。小さな成功の積み重ねが、大きな達成につながる日になりそうです。',
      '小さな変化に気づくことで、新しい発見があるかもしれません。普段見過ごしていることにも注意を払うと、思わぬ良い機会に恵まれるかもしれません。周りの人との会話も大切にしましょう。'
    ]
  },
  { 
    level: '吉', 
    color: 'text-green-500', 
    descriptions: [
      '安定した運勢です。普段通り過ごすのが良いでしょう。無理をせず、自分のペースで進めましょう。日常の中に小さな幸せを見つけることができる日です。基本に忠実に行動することで、着実な成果が得られるでしょう。',
      '堅実な行動が吉となります。基本に忠実に過ごしましょう。特に、routine作業や長期的なプロジェクトで良い進展が期待できます。地道な努力が実を結ぶ時期かもしれません。',
      '着実な努力が実を結ぶ日です。焦らず進むことが大切です。計画的に行動することで、効率的に目標を達成できるでしょう。周りの人からのサポートも期待できます。',
      '周りとの調和を大切にすることで、良い一日になるでしょう。特に、チームワークを必要とする活動で良い結果が期待できます。コミュニケーションを大切にすることで、新しい発見や機会に恵まれるかもしれません。'
    ]
  },
  { 
    level: '末吉', 
    color: 'text-blue-500', 
    descriptions: [
      '少し注意が必要です。慎重に行動しましょう。周りの人の意見を聞くことで、良い方向に進めるかもしれません。特に重要な決定を行う際は、十分な情報収集と分析を心がけましょう。焦らず、じっくりと物事を進めることが大切です。',
      '予期せぬ出来事に備えて、余裕を持って行動しましょう。計画に柔軟性を持たせることで、突発的な状況にも対応できるでしょう。周りの人からのアドバイスに耳を傾けることで、より良い選択ができるかもしれません。',
      '今日は特に計画を立てて行動することをお勧めします。時間管理を意識し、優先順位をつけて物事を進めましょう。慎重な判断が求められる場面もありますが、冷静に対応することで良い結果につながるでしょう。',
      '周りの助言に耳を傾けることで、困難を回避できるかもしれません。特に、経験豊富な人からのアドバイスは貴重です。新しい視点や考え方を取り入れることで、問題解決のヒントが見つかるかもしれません。'
    ]
  },
  { 
    level: '平', 
    color: 'text-gray-500', 
    descriptions: [
      '平穏な運勢です。特別な変化はありませんが、安定した日々を過ごせるでしょう。この時期は自己啓発や新しいスキルの習得に適しています。焦らず、着実に前進することで、将来の成功につながる基盤を作ることができます。',
      '日常を大切にする日です。当たり前の日常に感謝しましょう。普段の生活の中に小さな喜びを見つけることで、充実感を得られるでしょう。家族や友人との時間を大切にすることをお勧めします。',
      '無理のない範囲で物事を進めることをお勧めします。基本的な生活リズムを保ちながら、少しずつ目標に向かって進んでいきましょう。地道な努力が、将来の大きな成果につながる可能性があります。',
      '穏やかに過ごすことで、心が落ち着く一日になるでしょう。この時期は、自分を見つめ直し、今後の方向性を考えるのに適しています。瞑想やヨガなど、心身をリフレッシュする活動もお勧めです。'
    ]
  },
  { 
    level: '凶', 
    color: 'text-purple-500', 
    descriptions: [
      '今日は慎重に過ごしましょう。大きな決断は避け、周りの人に相談しながら行動することをお勧めします。特に金銭に関する判断は、十分な検討が必要です。困ったときは、信頼できる人に相談することで、適切な解決策が見つかるかもしれません。',
      '予定変更や遅れに注意が必要です。余裕を持った行動を心がけましょう。特に重要な約束や締め切りがある場合は、早めの準備と確認を怠らないようにしましょう。臨機応変な対応が求められる場面もあるかもしれません。',
      '慌てずに一つ一つ確認しながら行動することが大切です。特に、書類の作成や重要な連絡事項の確認には、細心の注意を払いましょう。ミスを防ぐために、チェックリストを活用することをお勧めします。',
      '困ったときは周りの人に相談することで、解決の糸口が見つかるかもしれません。一人で抱え込まず、信頼できる人に相談することで、新しい視点や解決策が見えてくるでしょう。この経験は、将来の成長につながる貴重な学びとなるかもしれません。'
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
  { name: '赤', color: 'text-red-500' },
  { name: '青', color: 'text-blue-500' },
  { name: '黄', color: 'text-yellow-500' },
  { name: '緑', color: 'text-green-500' },
  { name: '紫', color: 'text-purple-500' },
  { name: 'ピンク', color: 'text-pink-500' },
  { name: 'オレンジ', color: 'text-orange-500' },
  { name: '白', color: 'text-white' },
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
        luckyColor: luckyColor.name,
        luckyColorClass: luckyColor.color,
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
