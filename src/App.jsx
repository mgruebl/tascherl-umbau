
// === App.jsx ===
export default function App() {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <IPhoneFrame>
        <HomeScreen />
      </IPhoneFrame>
    </div>
  );
}

// === iPhone Frame ===
function IPhoneFrame({ children }) {
  return (
    <div className="relative w-[320px] h-[680px] bg-black rounded-[45px] shadow-2xl border border-neutral-700 overflow-hidden">
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl pointer-events-none" />

      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-10" />

      {/* Content */}
      <div className="w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// === Home Screen ===
import { useState } from "react";
import { CreditCard, Home, User } from "lucide-react";

function HomeScreen() {
  const [tab, setTab] = useState("home");

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
      {/* Header */}
      <div className="p-4 text-xl font-semibold">Tascherl</div>

      {/* Content */}
      <div className="flex-1 px-4 overflow-y-auto">
        {tab === "home" && <Dashboard />}
        {tab === "cards" && <CardsScreen />}
        {tab === "profile" && <Profile />}
      </div>

      {/* Internal Tab Bar (Liquid Glass) */}
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

// === Dashboard ===
function Dashboard() {
  return (
    <div className="space-y-4">
      <GlassCard title="Balance" value="€2,430" />
      <GlassCard title="Expenses" value="€740" />
    </div>
  );
}

// === Cards Screen ===
function CardsScreen() {
  return (
    <div className="space-y-4">
      <CreditCardItem name="Visa" number="**** 1234" />
      <CreditCardItem name="Mastercard" number="**** 5678" />
    </div>
  );
}

function CreditCardItem({ name, number }) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg">
      <div className="text-lg font-medium">{name}</div>
      <div className="text-sm opacity-70">{number}</div>
    </div>
  );
}

// === Profile ===
function Profile() {
  return (
    <div className="space-y-4">
      <GlassCard title="User" value="Roman" />
      <GlassCard title="Plan" value="Premium" />
    </div>
  );
}

// === Reusable Glass Card ===
function GlassCard({ title, value }) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg">
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
