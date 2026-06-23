import { useState, useEffect } from "react";
import { CreditCard, Home, User, MapPin } from "lucide-react";

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
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl pointer-events-none" />
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-10" />
      <div className="w-full h-full overflow-hidden">{children}</div>
    </div>
  );
}

function HomeScreen() {
  const [tab, setTab] = useState("home");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation(
          `${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`
        );
      });
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-neutral-900 via-neutral-800 to-black text-white">
      <div className="p-4 text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        Tascherl
      </div>

      <div className="flex-1 px-4 overflow-y-auto space-y-4">
        {tab === "home" && <Dashboard location={location} />}
        {tab === "cards" && <CardsScreen />}
        {tab === "profile" && <Profile />}
      </div>

      <div className="m-4 p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg flex justify-around">
        <TabButton icon={<Home />} active={tab === "home"} onClick={() => setTab("home")} />
        <TabButton icon={<CreditCard />} active={tab === "cards"} onClick={() => setTab("cards")} />
        <TabButton icon={<User />} active={tab === "profile"} onClick={() => setTab("profile")} />
      </div>
    </div>
  );
}

function TabButton({ icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl transition ${
        active ? "bg-white/20 scale-110" : "opacity-70"
      }`}
    >
      {icon}
    </button>
  );
}

function Dashboard({ location }) {
  return (
    <div className="space-y-4">
      <GlassCard title="Standort" value={location || "lade..."} icon={<MapPin size={16} />} />
      <GlassCard title="Aktive Karten" value="3 Karten" />
    </div>
  );
}

function CardsScreen() {
  return (
    <div className="space-y-4">
      <CardItem name="Fitinn Gym" type="Fitness" color="from-green-400 to-emerald-600" />
      <CardItem name="JÖ Karte" type="Rewards" color="from-red-400 to-pink-500" />
      <CardItem name="Uni Card" type="NFC Zugang" color="from-blue-400 to-indigo-500" />
    </div>
  );
}

function CardItem({ name, type, color }) {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-sm opacity-80">{type}</div>
      <button className="mt-3 text-xs px-3 py-1 bg-white/20 rounded-lg">
        NFC simulieren
      </button>
    </div>
  );
}

function Profile() {
  return (
    <div className="space-y-4">
      <GlassCard title="User" value="Roman" />
      <GlassCard title="Plan" value="All-in Wallet" />
    </div>
  );
}

function GlassCard({ title, value, icon }) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg">
      <div className="flex justify-between items-center text-sm opacity-70">
        {title}
        {icon}
      </div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
