import { useState, useEffect } from "react";
import { CreditCard, Home, User } from "lucide-react";

const LOCATIONS = [
  { name: "Fitinn Wien", lat: 48.21, lon: 16.37, card: "gym" },
  { name: "Billa (JÖ)", lat: 48.22, lon: 16.36, card: "joe" },
  { name: "Uni Wien", lat: 48.213, lon: 16.36, card: "uni" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <IPhoneFrame>
        <HomeScreen />
      </IPhoneFrame>
    </div>
  );
}

function IPhoneFrame({ children }) {
  return (
    <div className="relative w-[320px] h-[680px] bg-black rounded-[45px] shadow-2xl border border-neutral-700 overflow-hidden">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full" />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}

function HomeScreen() {
  const [tab, setTab] = useState("home");
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const nearest = findNearest(
          pos.coords.latitude,
          pos.coords.longitude
        );
        setActiveCard(nearest.card);

        // automatisch auf Karten springen
        setTab("cards");
      });
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-neutral-900 to-black text-white">
      {/* Bunter App Name */}
      <div className="p-4 text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        Tascherl
      </div>

      <div className="flex-1 px-4 overflow-y-auto">
        {tab === "home" && <Dashboard />}
        {tab === "cards" && <CardsScreen activeCard={activeCard} />}
        {tab === "profile" && <Profile />}
      </div>

      {/* interne Navigation */}
      <div className="m-4 p-2 rounded-2xl bg-white/10 backdrop-blur-xl flex justify-around">
        <TabButton
          icon={<Home />}
          active={tab === "home"}
          onClick={() => setTab("home")}
        />
        <TabButton
          icon={<CreditCard />}
          active={tab === "cards"}
          onClick={() => setTab("cards")}
        />
        <TabButton
          icon={<User />}
          active={tab === "profile"}
          onClick={() => setTab("profile")}
        />
      </div>
    </div>
  );
}

// 👉 wichtigste Logik (nächstes Geschäft finden)
function findNearest(lat, lon) {
  let best = LOCATIONS[0];
  let bestDist = 999;

  LOCATIONS.forEach((loc) => {
    const d = Math.sqrt((lat - loc.lat) ** 2 + (lon - loc.lon) ** 2);
    if (d < bestDist) {
      bestDist = d;
      best = loc;
    }
  });

  return best;
}

function TabButton({ icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 ${active ? "scale-110" : "opacity-70"}`}
    >
      {icon}
    </button>
  );
}

// 👉 Karten Screen (wird automatisch geöffnet)
function CardsScreen({ activeCard }) {
  return (
    <div className="space-y-4">
      <Card
        name="Fitinn Gym"
        active={activeCard === "gym"}
        color="from-green-400 to-emerald-600"
      />
      <Card
        name="JÖ Karte"
        active={activeCard === "joe"}
        color="from-red-400 to-pink-500"
      />
      <Card
        name="Uni Card"
        active={activeCard === "uni"}
        color="from-blue-400 to-indigo-500"
      />
    </div>
  );
}

function Card({ name, active, color }) {
  return (
    <div
      className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-lg ${
        active ? "ring-4 ring-white scale-105" : ""
      }`}
    >
      <div className="text-lg font-semibold text-white">{name}</div>

      {active && (
        <div className="text-sm text-white opacity-90 mt-1">
          Automatisch geöffnet ✅
        </div>
      )}

      <button className="mt-3 text-xs px-3 py-1 bg-white/20 rounded-lg text-white">
        NFC simulieren
      </button>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="text-center opacity-70 mt-10">
      Smart Wallet erkennt automatisch deinen Standort
    </div>
  );
}

function Profile() {
  return <div className="p-4">Profil Bereich</div>;
}
``
