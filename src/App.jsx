const LOGOS = {
  fitinn: "https://logo.clearbit.com/fitinn.at",
  joe: "https://logo.clearbit.com/joebonus.at",
  cineplexx: "https://logo.clearbit.com/cineplexx.at",
  billa: "https://logo.clearbit.com/billa.at",
  spar: "https://logo.clearbit.com/spar.at",
  lidl: "https://logo.clearbit.com/lidl.at",
  hofer: "https://logo.clearbit.com/hofer.at",
  dm: "https://logo.clearbit.com/dm.de",
  mcdonalds: "https://logo.clearbit.com/mcdonalds.com",
  burgerking: "https://logo.clearbit.com/burgerking.com",
  starbucks: "https://logo.clearbit.com/starbucks.com",
  ikea: "https://logo.clearbit.com/ikea.com",
  amazon: "https://logo.clearbit.com/amazon.com",
  netflix: "https://logo.clearbit.com/netflix.com",
  spotify: "https://logo.clearbit.com/spotify.com",
  adidas: "https://logo.clearbit.com/adidas.com",
  nike: "https://logo.clearbit.com/nike.com",
  zalando: "https://logo.clearbit.com/zalando.com",
  paypal: "https://logo.clearbit.com/paypal.com",
  google: "https://logo.clearbit.com/google.com",
  apple: "https://logo.clearbit.com/apple.com",
};
``
import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  Plus,
  Settings,
  ShieldCheck,
  MapPin,
  Bell,
  Lock,
  Unlock,
  X,
  QrCode,
  SmartphoneNfc,
  Trash2,
  Sparkles,
  Check,
} from "lucide-react";

const STORAGE_KEYS = {
  cards: "tascherl_cards",
  settings: "tascherl_settings",
};

const initialCards = [
  {
    id: 1,
    name: "Fitinn Gym",
    company: "FITINN",
    brand: "fitinn",
    type: "NFC",
    category: "Fitness",
    color: "from-lime-400 via-green-500 to-emerald-700",
    info: "Mitgliedskarte · Zugang zum Gym",
    code: "FITINN-AT-2024-8841",
    locationHint: "Aktiviert sich automatisch in der Nähe deines Studios.",
    favorite: true,
  },
  {
    id: 2,
    name: "JÖ Karte",
    company: "jö Bonus Club",
    brand: "joe",
    type: "QR",
    category: "Bonuskarte",
    color: "from-rose-400 via-red-500 to-pink-700",
    info: "1240 Ös gesammelt",
    code: "JOE-4459-8820-AT",
    locationHint: "Wird bei BILLA, BIPA, OMV & Partnern vorgeschlagen.",
    favorite: true,
  },
  {
    id: 3,
    name: "Cineplexx Bonus",
    company: "Cineplexx",
    brand: "cineplexx",
    type: "Barcode",
    category: "Entertainment",
    color: "from-sky-400 via-blue-500 to-indigo-700",
    info: "Movie Bonus Card",
    code: "CPX-9922-1048",
    locationHint: "Bereit beim Kinoeingang oder an der Kassa.",
    favorite: false,
  },
];

const initialSettings = {
  darkMode: true,
  biometricLock: false,
  locationSmartCards: true,
  notifications: true,
  secureCloud: true,
  serverRegion: "Österreich / EU",
};

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (booting) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#3b0764,#020617_55%,#000)] flex items-center justify-center p-4">
      <style>{`
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes softPulse {
          0%, 100% {
            transform: scale(1);
            opacity: .75;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes scanPulse {
          0%, 100% {
            transform: scale(.96);
            opacity: .6;
          }
          50% {
            transform: scale(1.06);
            opacity: 1;
          }
        }

        .animate-floatIn {
          animation: floatIn .45s ease-out both;
        }

        .animate-softPulse {
          animation: softPulse 2s ease-in-out infinite;
        }

        .animate-scanPulse {
          animation: scanPulse 1.7s ease-in-out infinite;
        }

        .glass {
          background: rgba(255,255,255,.10);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,.16);
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <Phone>
        <TascherlApp />
      </Phone>
    </div>
  );
}

/* ---------------- SPLASH SCREEN ---------------- */

function SplashScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center gap-5">
        <div className="absolute w-44 h-44 rounded-full bg-fuchsia-500/30 blur-3xl animate-softPulse" />

        <div className="relative w-24 h-24 rounded-[30px] bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 shadow-2xl shadow-pink-500/30 flex items-center justify-center animate-bounce">
          <span className="text-white text-4xl font-black">T</span>
        </div>

        <div className="text-4xl font-black bg-gradient-to-r from-purple-300 via-pink-400 to-orange-300 bg-clip-text text-transparent tracking-tight">
          Tascherl
        </div>

        <div className="text-white/45 text-sm">
          Deine Karten. Sicher. Immer dabei.
        </div>
      </div>
    </div>
  );
}

/* ---------------- PHONE FRAME ---------------- */

function Phone({ children }) {
  return (
    <div className="relative w-[340px] h-[710px] bg-black rounded-[46px] p-[9px] shadow-2xl shadow-black/70 border border-white/10">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-7 rounded-full bg-black z-30 border border-white/5" />

      <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-neutral-950">
        {children}
      </div>
    </div>
  );
}

/* ---------------- MAIN APP ---------------- */

function TascherlApp() {
  const [cards, setCards] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.cards);
      return saved ? JSON.parse(saved) : initialCards;
    } catch {
      return initialCards;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.settings);
      return saved
        ? { ...initialSettings, ...JSON.parse(saved) }
        : initialSettings;
    } catch {
      return initialSettings;
    }
  });

  const [tab, setTab] = useState("cards");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);
  const [locked, setLocked] = useState(settings.biometricLock);
  const [smartSuggestion, setSmartSuggestion] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cards, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));

    if (!settings.biometricLock) {
      setLocked(false);
    }
  }, [settings]);

  useEffect(() => {
    if (!settings.locationSmartCards) return;

    const timer = setTimeout(() => {
      if (cards.length > 0) {
        setSmartSuggestion(cards[0]);
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [settings.locationSmartCards, cards]);

  const themeClass = settings.darkMode
    ? "bg-gradient-to-b from-slate-950 via-neutral-950 to-black text-white"
    : "bg-gradient-to-b from-slate-100 via-white to-slate-200 text-slate-950";

  if (locked) {
  return (
    <LockScreen
      onUnlock={() => {
        setLocked(false);
        setSelectedCard(cards[0]); // ✅ AUTO OPEN wie Widget
      }}
      darkMode={settings.darkMode}
    />
  );
}

  return (
    <div className={`h-full flex flex-col ${themeClass}`}>
      <AppHeader settings={settings} />

      {smartSuggestion && tab === "cards" && (
        <SmartSuggestion
          card={smartSuggestion}
          onOpen={() => setSelectedCard(smartSuggestion)}
          onClose={() => setSmartSuggestion(null)}
        />
      )}

      <main className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-3">
        {tab === "cards" && (
          <CardsScreen
            cards={cards}
            settings={settings}
            onCardClick={setSelectedCard}
            onAdd={() => setShowAddCard(true)}
          />
        )}

        {tab === "settings" && (
          <SettingsScreen
            settings={settings}
            setSettings={setSettings}
            cards={cards}
            setCards={setCards}
          />
        )}
      </main>

      <BottomNav
        tab={tab}
        setTab={setTab}
        onAdd={() => setShowAddCard(true)}
      />

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          settings={settings}
        />
      )}

      {showAddCard && (
        <AddCardModal
          onClose={() => setShowAddCard(false)}
          onAdd={(newCard) => {
            setCards([newCard, ...cards]);
            setShowAddCard(false);
          }}
        />
      )}
    </div>
  );
}

/* ---------------- HEADER ---------------- */

function AppHeader({ settings }) {
  return (
    <header className="pt-10 px-4 pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg shadow-pink-500/25 overflow-hidden">
            <div className="absolute inset-0 bg-white/20 rotate-12 translate-x-8" />
            <span className="relative text-white font-black text-xl">T</span>
          </div>

          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-purple-300 via-pink-400 to-orange-300 bg-clip-text text-transparent leading-none">
              Tascherl
            </h1>
            <p className="text-xs opacity-55 mt-1">
              Alles dabei. Ohne dicke Geldbörse.
            </p>
          </div>
        </div>

        <div className="glass rounded-full px-3 py-2 text-xs flex items-center gap-1">
          <ShieldCheck size={14} className="text-emerald-300" />
          {settings.serverRegion}
        </div>
      </div>
    </header>
  );
}

/* ---------------- CARDS SCREEN ---------------- */

function CardsScreen({ cards, settings, onCardClick, onAdd }) {
  return (
    <div className="space-y-4 animate-floatIn">
      <div className="glass rounded-3xl p-4 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-pink-500/20 blur-2xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm opacity-60">Smart Wallet</p>
            <h2 className="text-xl font-bold mt-1">
              {cards.length} Karten gespeichert
            </h2>
            <p className="text-xs opacity-55 mt-2">
              QR, Barcode, Mitgliedskarten und NFC-Demo an einem Ort.
            </p>
          </div>

          <button
            onClick={onAdd}
            className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition"
          >
            <Plus size={22} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold opacity-70">Meine Karten</h3>

        {settings.locationSmartCards && (
          <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-400/15 text-emerald-300 flex items-center gap-1">
            <MapPin size={12} />
            Standort aktiv
          </span>
        )}
      </div>

      <div className="space-y-3">
        {cards.map((card, index) => (
          <WalletCard
            key={card.id}
            card={card}
            index={index}
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

function WalletCard({ card, index, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-[28px] p-[1px] bg-gradient-to-br ${card.color} shadow-xl active:scale-[0.98] transition animate-floatIn`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden rounded-[27px] p-4 min-h-[118px]">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/20 blur-2xl" />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <CompanyLogo brand={card.brand} company={card.company} />

            <div>
              <p className="text-white/70 text-xs">{card.company}</p>
              <h3 className="text-white text-lg font-bold leading-tight">
                {card.name}
              </h3>
              <p className="text-white/70 text-xs mt-1">{card.category}</p>
            </div>
          </div>

          <CardTypeBadge type={card.type} />
        </div>

        <div className="relative mt-5 flex items-end justify-between">
          <p className="text-white/80 text-xs max-w-[180px]">{card.info}</p>

          {card.favorite && (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles size={15} className="text-white" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function CompanyLogo({ brand, company }) {
  const logo = LOGOS[brand];

  if (logo) {
    return (
      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-2 shadow">
        <img
          src={logo}
          alt={company}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
      {company?.slice(0, 2).toUpperCase()}
    </div>
  );
}

function CardTypeBadge({ type }) {
  const icon =
    type === "NFC" ? (
      <SmartphoneNfc size={13} />
    ) : type === "QR" ? (
      <QrCode size={13} />
    ) : (
      <CreditCard size={13} />
    );

  return (
    <div className="px-2 py-1 rounded-full bg-black/25 text-white text-[11px] flex items-center gap-1">
      {icon}
      {type}
    </div>
  );
}

/* ---------------- SMART SUGGESTION ---------------- */

function SmartSuggestion({ card, onOpen, onClose }) {
  return (
    <div className="mx-4 mb-3 glass rounded-3xl p-3 animate-floatIn">
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
        >
          <MapPin size={20} className="text-white" />
        </div>

        <div className="flex-1">
          <p className="text-xs opacity-55">In deiner Nähe erkannt</p>
          <p className="text-sm font-semibold">{card.name}</p>
        </div>

        <button
          onClick={onOpen}
          className="px-3 py-2 rounded-xl bg-white text-black text-xs font-bold active:scale-95 transition"
        >
          Öffnen
        </button>

        <button onClick={onClose} className="opacity-50">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- DETAIL MODAL ---------------- */

function CardDetailModal({ card, onClose, settings }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center">
      <div className="w-full max-w-[360px] p-2">
        <div
          className={`rounded-[34px] overflow-hidden bg-gradient-to-br ${card.color} shadow-2xl`}
        >
          <div className="relative p-5 min-h-[245px]">
            <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -left-10 bottom-0 w-32 h-32 rounded-full bg-black/20 blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-3">
                <CompanyLogo brand={card.brand} company={card.company} />

                <div>
                  <p className="text-white/70 text-xs">{card.company}</p>
                  <h2 className="text-white text-2xl font-black leading-tight">
                    {card.name}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/25 text-white flex items-center justify-center active:scale-95 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative mt-5 rounded-3xl p-4 bg-white/15 backdrop-blur-xl border border-white/15">
              <p className="text-white/75 text-xs">Info</p>
              <p className="text-white font-semibold mt-1">{card.info}</p>

              <div className="mt-3 flex items-center gap-2 text-xs text-white/80">
                <MapPin size={14} />
                {card.locationHint}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-t-[34px] p-5 text-black">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-black/50">Kartencode</p>
                <p className="font-mono text-sm">{card.code}</p>
              </div>

              <CardTypeBadgeLight type={card.type} />
            </div>

            <CardCredentialDisplay card={card} />

            <div className="mt-5 flex gap-3">
              <button className="flex-1 py-3.5 rounded-2xl bg-black text-white font-bold active:scale-95 transition flex items-center justify-center gap-2 shadow-lg">
                {card.type === "NFC" && <SmartphoneNfc size={18} />}
                {card.type === "QR" && <QrCode size={18} />}
                {card.type === "Barcode" && <CreditCard size={18} />}

                {card.type === "NFC"
                  ? "NFC bereit"
                  : card.type === "QR"
                  ? "Code bereit"
                  : "Barcode bereit"}
              </button>

              <button
                onClick={onClose}
                className="px-5 py-3.5 rounded-2xl bg-black/5 font-bold active:scale-95 transition"
              >
                Fertig
              </button>
            </div>

            {settings.secureCloud && (
              <p className="mt-4 text-[11px] text-black/45 flex items-center gap-1">
                <ShieldCheck size={13} />
                Demo: Daten sicher über {settings.serverRegion} geschützt.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardTypeBadgeLight({ type }) {
  return (
    <div className="px-3 py-1 rounded-full bg-black/5 text-black text-xs font-semibold">
      {type}
    </div>
  );
}

/* ---------------- CARD CREDENTIAL DISPLAY ---------------- */

function CardCredentialDisplay({ card }) {
  if (card.type === "NFC") {
    return <NFCDisplay card={card} />;
  }

  if (card.type === "Barcode") {
    return <BarcodeDisplay value={card.code} />;
  }

  return <QRDisplay value={card.code} />;
}

function QRDisplay({ value }) {
  return (
    <div className="rounded-[28px] bg-neutral-100 p-4 border border-black/10 shadow-inner">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-black/45">QR-Code</p>
          <p className="text-sm font-bold text-black">Zum Scannen bereit</p>
        </div>

        <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
          <QrCode size={18} />
        </div>
      </div>

      <FakeQRCode value={value} />

      <p className="mt-3 text-center text-[11px] text-black/45 font-mono">
        {value}
      </p>
    </div>
  );
}

function BarcodeDisplay({ value }) {
  const bars = useMemo(() => {
    let seed = 0;

    for (let i = 0; i < value.length; i++) {
      seed = (seed + value.charCodeAt(i) * (i + 3)) % 997;
    }

    return Array.from({ length: 42 }, (_, i) => {
      const width = ((i * 7 + seed) % 4) + 1;
      const height = ((i * 11 + seed) % 18) + 46;
      return { width, height };
    });
  }, [value]);

  return (
    <div className="rounded-[28px] bg-white p-4 border border-black/10 shadow-inner">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-black/45">Barcode</p>
          <p className="text-sm font-bold text-black">Kassa-Scan bereit</p>
        </div>

        <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
          <CreditCard size={18} />
        </div>
      </div>

      <div className="h-28 bg-white rounded-2xl flex items-end justify-center gap-[2px] px-3 py-4 border border-black/5">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="bg-black rounded-sm"
            style={{
              width: `${bar.width}px`,
              height: `${bar.height}px`,
            }}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-[11px] text-black/55 font-mono tracking-widest">
        {value}
      </p>
    </div>
  );
}

function NFCDisplay({ card }) {
  return (
    <div className="rounded-[28px] bg-neutral-950 text-white p-5 border border-white/10 shadow-inner overflow-hidden relative">
      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="absolute -left-10 bottom-0 w-24 h-24 rounded-full bg-lime-400/20 blur-2xl" />

      <div className="relative flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-white/45">NFC-Zugang</p>
          <p className="text-sm font-bold text-white">Bereit zum Aktivieren</p>
        </div>

        <div className="w-11 h-11 rounded-2xl bg-emerald-400 text-black flex items-center justify-center animate-softPulse">
          <SmartphoneNfc size={22} />
        </div>
      </div>

      <div className="relative h-32 rounded-3xl bg-white/10 border border-white/10 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full border border-emerald-300/25 flex items-center justify-center animate-scanPulse">
          <div className="w-18 h-18 rounded-full border-2 border-emerald-300/50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-300/80 flex items-center justify-center">
              <SmartphoneNfc size={24} className="text-emerald-300" />
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-white/55">
          Handy ans Terminal halten
        </p>
      </div>

      <p className="relative mt-3 text-center text-[11px] text-white/40 font-mono">
        Token: {card.code}
      </p>
    </div>
  );
}

/* ---------------- FAKE QR CODE ---------------- */

function FakeQRCode({ value }) {
  const cells = useMemo(() => {
    let seed = 0;

    for (let i = 0; i < value.length; i++) {
      seed = (seed + value.charCodeAt(i) * (i + 1)) % 9973;
    }

    const generated = [];

    for (let i = 0; i < 121; i++) {
      const col = i % 11;
      const row = Math.floor(i / 11);

      const finder =
        (col < 3 && row < 3) ||
        (col > 7 && row < 3) ||
        (col < 3 && row > 7);

      generated.push(finder || ((i * 17 + seed) % 5 < 2));
    }

    return generated;
  }, [value]);

  return (
    <div className="mx-auto w-44 h-44 bg-white border border-black/10 rounded-2xl p-3 shadow-inner">
      <div className="grid grid-cols-11 gap-[3px]">
        {cells.map((filled, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-[2px] ${
              filled ? "bg-black" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- ADD CARD MODAL ---------------- */

function AddCardModal({ onClose, onAdd }) {
  const [type, setType] = useState("QR");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const canAdd = name.trim().length > 1 && company.trim().length > 1;

  function handleAdd() {
    if (!canAdd) return;

    const colors = {
      QR: "from-violet-400 via-purple-500 to-fuchsia-700",
      NFC: "from-amber-300 via-orange-500 to-red-700",
      Barcode: "from-cyan-300 via-sky-500 to-blue-700",
    };

    onAdd({
      id: Date.now(),
      name,
      company,
      brand: company.toLowerCase().replace(/\s/g, ""),
      type,
      category:
        type === "NFC"
          ? "Zugangskarte"
          : type === "QR"
          ? "QR Karte"
          : "Barcode Karte",
      color: colors[type],
      info: "Neu hinzugefügt",
      code: `${type}-${Math.floor(Math.random() * 999999)}-${Date.now()
        .toString()
        .slice(-4)}`,
      locationHint: "Noch keine Standortregel eingerichtet.",
      favorite: false,
    });
  }

  return (
    <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end">
      <div className="w-full bg-neutral-950 text-white rounded-t-[34px] p-5 animate-floatIn border-t border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black">Neue Karte</h2>
            <p className="text-xs opacity-50">
              QR, Barcode oder NFC-Demo hinzufügen
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {["QR", "Barcode", "NFC"].map((item) => (
            <button
              key={item}
              onClick={() => setType(item)}
              className={`py-3 rounded-2xl text-sm font-semibold transition ${
                type === item
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name der Karte, z.B. McFit"
            className="w-full bg-white/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Unternehmen, z.B. McFit"
            className="w-full bg-white/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
        </div>

        <button
          onClick={handleAdd}
          disabled={!canAdd}
          className={`mt-5 w-full py-4 rounded-2xl font-bold transition ${
            canAdd
              ? "bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-white active:scale-95"
              : "bg-white/10 text-white/30"
          }`}
        >
          Karte hinzufügen
        </button>
      </div>
    </div>
  );
}

/* ---------------- SETTINGS ---------------- */

function SettingsScreen({ settings, setSettings, cards, setCards }) {
  function updateSetting(key, value) {
    setSettings((prev) => ({
      ...prev,
      value,
    }));
  }

  function resetDemo() {
    setCards(initialCards);
    setSettings(initialSettings);
    localStorage.removeItem(STORAGE_KEYS.cards);
    localStorage.removeItem(STORAGE_KEYS.settings);
  }

  return (
    <div className="space-y-4 animate-floatIn">
      <div className="glass rounded-3xl p-4">
        <h2 className="text-xl font-black">Einstellungen</h2>
        <p className="text-xs opacity-55 mt-1">
          Alles funktioniert lokal als Demo und wird im Browser gespeichert.
        </p>
      </div>

      <SettingToggle
        icon={<Sparkles size={18} />}
        title="Dark Mode"
        description="Schaltet das App-Design um."
        value={settings.darkMode}
        onChange={(v) => updateSetting("darkMode", v)}
      />

      <SettingToggle
        icon={<Lock size={18} />}
        title="Face-ID / App-Sperre Demo"
        description="Beim Aktivieren wird ein Lockscreen angezeigt."
        value={settings.biometricLock}
        onChange={(v) => updateSetting("biometricLock", v)}
      />

      <SettingToggle
        icon={<MapPin size={18} />}
        title="Smart Cards per Standort"
        description="Schlägt automatisch passende Karten in der Nähe vor."
        value={settings.locationSmartCards}
        onChange={(v) => updateSetting("locationSmartCards", v)}
      />

      <SettingToggle
        icon={<Bell size={18} />}
        title="Benachrichtigungen"
        description="Demo-Schalter für Push-Hinweise."
        value={settings.notifications}
        onChange={(v) => updateSetting("notifications", v)}
      />

      <SettingToggle
        icon={<ShieldCheck size={18} />}
        title="Sichere Cloud"
        description="Zeigt Datenschutz- und Server-Hinweise an."
        value={settings.secureCloud}
        onChange={(v) => updateSetting("secureCloud", v)}
      />

      <div className="glass rounded-3xl p-4">
        <p className="text-sm font-semibold mb-2">Serverregion</p>

        <select
          value={settings.serverRegion}
          onChange={(e) => updateSetting("serverRegion", e.target.value)}
          className="w-full bg-black/30 rounded-2xl px-3 py-3 outline-none text-white"
        >
          <option>Österreich / EU</option>
          <option>Deutschland / EU</option>
          <option>Europa DSGVO-konform</option>
        </select>
      </div>

      <div className="glass rounded-3xl p-4">
        <p className="text-sm font-semibold">App Status</p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <StatusPill label={`${cards.length} Karten`} />
          <StatusPill label="Demo v1.0" />
          <StatusPill label="QR aktiv" />
          <StatusPill label="NFC Demo" />
        </div>
      </div>

      <button
        onClick={resetDemo}
        className="w-full p-4 rounded-3xl bg-red-500/15 text-red-300 flex items-center justify-center gap-2 active:scale-95 transition"
      >
        <Trash2 size={17} />
        Demo zurücksetzen
      </button>
    </div>
  );
}

function SettingToggle({ icon, title, description, value, onChange }) {
  return (
    <div className="glass rounded-3xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs opacity-50 mt-1">{description}</p>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`w-14 h-8 rounded-full p-1 transition ${
          value ? "bg-emerald-400" : "bg-white/15"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full bg-white transition flex items-center justify-center ${
            value ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {value && <Check size={13} className="text-emerald-500" />}
        </div>
      </button>
    </div>
  );
}

function StatusPill({ label }) {
  return (
    <div className="rounded-2xl bg-white/10 px-3 py-2 text-center opacity-75">
      {label}
    </div>
  );
}



/* ---------------- BOTTOM NAV ---------------- */

function BottomNav({ tab, setTab, onAdd }) {
  return (
    <nav className="px-4 pb-4 pt-2">
      <div className="glass rounded-[28px] p-2 flex items-center justify-around shadow-xl">
        <NavButton
          active={tab === "cards"}
          icon={<CreditCard size={21} />}
          label="Karten"
          onClick={() => setTab("cards")}
        />

        <button
          onClick={onAdd}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex items-center justify-center text-white shadow-lg shadow-pink-500/25 active:scale-95 transition"
        >
          <Plus size={25} />
        </button>

        <NavButton
          active={tab === "settings"}
          icon={<Settings size={21} />}
          label="Setup"
          onClick={() => setTab("settings")}
        />
      </div>
    </nav>
  );
}

function NavButton({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-20 py-2 rounded-2xl flex flex-col items-center gap-1 transition ${
        active ? "bg-white/15 scale-105" : "opacity-55"
      }`}
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
