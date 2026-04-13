import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  UserCircle2,
  Car,
  CalendarDays,
  Timer,
  Activity,
  HeartPulse,
  Thermometer,
  Camera,
  Video,
  Trophy,
  CreditCard,
  BarChart3,
  Flag,
  Users,
  BookOpen,
  Award,
  FileCheck,
  Radar,
  Gauge,
  ShoppingBag,
  ExternalLink,
  Plane,
  Image as ImageIcon,
  Server,
  Workflow,
  Medal,
  TrendingUp,
  Target,
  Database,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

// =====================================================
// OXV V8 — VERSION DEMO PARTAGEABLE
// - convertie en projet Vite + React + TypeScript
// - dépendances canvas/shadcn remplacées par composants locaux
// - prête pour GitHub et Vercel
// =====================================================

type PageId =
  | "home"
  | "experience"
  | "booking"
  | "driver"
  | "circuit"
  | "leaderboard"
  | "partnership"
  | "marketplace"
  | "platform"
  | "contact";

type OfferType = "ACCES" | "PROMOTION" | "SIMULATION";
type BookingStatus = "confirmee" | "a_payer" | "terminee";

type DriverProfile = {
  firstName: string;
  lastName: string;
  stageName: string;
  carNumber: string;
  email: string;
  phone: string;
};

type VehicleProfile = {
  brand: string;
  model: string;
  year: string;
  horsepower: string;
  powertrain: string;
  transmission: string;
  tires: string;
  preparation: string;
  plate: string;
};

type BookingSlot = {
  id: string;
  label: string;
  date: string;
  remaining: number;
  experience: OfferType;
};

type BookingRecord = {
  id: string;
  offer: OfferType;
  slotLabel: string;
  circuit: string;
  status: BookingStatus;
  amount: string;
  vehicleLabel: string;
};

type PerformanceRecord = {
  label: string;
  chrono: string;
  progression: string;
  temperature: string;
  physical: string;
  mental: string;
  score: number;
};

type LinkCard = {
  title: string;
  desc: string;
  url: string;
};

type LeaderboardEntry = {
  rank: number;
  driver: string;
  car: string;
  progress: string;
  bestLap: string;
  sessions: number;
  score: number;
  streak: string;
};

const navItems: { id: PageId; label: string }[] = [
  { id: "home", label: "Accueil" },
  { id: "experience", label: "Expérience" },
  { id: "booking", label: "Réserver" },
  { id: "driver", label: "Pilote" },
  { id: "circuit", label: "Circuit" },
  { id: "leaderboard", label: "Classement" },
  { id: "partnership", label: "Partenariat" },
  { id: "marketplace", label: "Boutique" },
  { id: "platform", label: "Plateforme" },
  { id: "contact", label: "Contact" },
];

const offerMeta: Record<
  OfferType,
  {
    title: string;
    subtitle: string;
    desc: string;
    bullets: string[];
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    price: string;
  }
> = {
  ACCES: {
    title: "OFFRE ACCES",
    subtitle: "Circuit privatisé",
    desc: "Accès premium au circuit privatisé pour 20 participants maximum sur une demi-journée, avec rythme maîtrisé, sélection claire et réservation synchronisée.",
    bullets: ["20 pilotes maximum", "Demi-journée privatisée", "Compte pilote + véhicule", "Planning partagé circuit"],
    icon: Flag,
    gradient: "from-red-700/30 via-orange-500/20 to-yellow-300/20",
    price: "790 €",
  },
  PROMOTION: {
    title: "OFFRE PROMOTION",
    subtitle: "Marketing & contenu",
    desc: "Production de contenu photo et vidéo premium pour valoriser le pilote, le véhicule, l’expérience et l’image de marque OXV.",
    bullets: ["Pack photo premium", "Pack vidéo immersif", "Contenu social media", "Valorisation image pilote"],
    icon: Camera,
    gradient: "from-fuchsia-500/25 via-red-500/20 to-orange-500/20",
    price: "990 €",
  },
  SIMULATION: {
    title: "OFFRE SIMULATION",
    subtitle: "Suivi performance",
    desc: "Mesure, analyse et historique : chronos, température performance, état physique, état mental et progression session après session.",
    bullets: ["Chronométrie", "Température performance", "État physique et mental", "Dashboard évolutif"],
    icon: Activity,
    gradient: "from-cyan-500/25 via-blue-500/20 to-purple-500/20",
    price: "490 €",
  },
};

const partnershipLinks: LinkCard[] = [
  {
    title: "Site officiel du Circuit de Haute Saintonge",
    desc: "Page institutionnelle principale du site.",
    url: "https://www.circuitdehautesaintonge.com/",
  },
  {
    title: "Organiser un événement",
    desc: "Page idéale pour une proposition de collaboration ou privatisation.",
    url: "https://www.circuitdehautesaintonge.com/organiser-evenement/",
  },
  {
    title: "Nous contacter",
    desc: "Point de contact direct pour formuler une proposition OXV.",
    url: "https://www.circuitdehautesaintonge.com/contact/",
  },
  {
    title: "Piste vitesse",
    desc: "Informations techniques sur la piste et l’infrastructure.",
    url: "https://www.circuitdehautesaintonge.com/piste-vitesse/",
  },
  {
    title: "Plan de la piste",
    desc: "Support utile pour la projection technique et le storytelling pilote.",
    url: "https://www.circuitdehautesaintonge.com/piste-vitesse/plan-piste/",
  },
  {
    title: "Stage de pilotage",
    desc: "Référence utile pour positionner la collaboration OXV dans l’écosystème du circuit.",
    url: "https://www.circuitdehautesaintonge.com/stage-pilotage/",
  },
];

const keyStats = [
  { value: "20", label: "Pilotes maximum", text: "Une demi-journée maîtrisée pour préserver la qualité perçue." },
  { value: "01", label: "Compte OXV", text: "Pilote, véhicule, données et sessions centralisés." },
  { value: "03", label: "Offres piliers", text: "ACCES, PROMOTION et SIMULATION, seules ou combinées." },
  { value: "360°", label: "Expérience globale", text: "Circuit, performance, contenu, boutique et suivi premium." },
];

const certifications = [
  "Encadrement premium et briefing structuré",
  "Qualification pilote avant session",
  "Traçabilité des données sur compte utilisateur",
  "Gestion maîtrisée des réservations et créneaux",
  "Production de contenu premium encadrée",
  "Suivi évolutif des performances par session",
];

const platformTables = [
  "driver_profiles",
  "vehicles",
  "offers",
  "sessions",
  "bookings",
  "performance_logs",
  "certifications",
  "drone_plans",
  "photo_bank_assets",
  "partnership_leads",
];

const apiRoutes = [
  "POST /api/auth/sign-up",
  "POST /api/auth/sign-in",
  "POST /api/bookings/create",
  "GET /api/calendar/availability",
  "POST /api/stripe/checkout",
  "POST /api/stripe/webhook",
  "GET /api/dashboard/driver/:id",
  "POST /api/partnership/request",
  "POST /api/media/upload",
];

const circuitSummary = [
  "Piste vitesse de 2 200 m",
  "Deux lignes droites de 650 m",
  "7 virages",
  "Largeur de 11 à 15 m",
  "Paddock, box et espaces d’accueil",
  "Lecture de piste idéale pour progression",
  "Freinages à construire proprement",
  "Trajectoires fluides et relances propres",
];

const circuitTips = [
  {
    title: "Soignez le tour de chauffe",
    text: "Mettez rapidement les pneus et les freins dans une bonne fenêtre de fonctionnement sans brusquer l’auto dès les premiers virages.",
  },
  {
    title: "Privilégiez la sortie de virage",
    text: "Sur un tracé avec longues relances, une bonne sortie vaut souvent plus qu’une entrée trop agressive.",
  },
  {
    title: "Freinez droit puis relâchez progressivement",
    text: "Stabilisez la voiture au freinage avant de charger l’avant en entrée pour garder une auto lisible.",
  },
  {
    title: "Lissez vos trajectoires",
    text: "Cherchez la fluidité, évitez les corrections inutiles et construisez un rythme constant avant de vouloir attaquer fort.",
  },
  {
    title: "Travaillez le regard loin",
    text: "Anticipez la sortie et le virage suivant pour gagner en précision et en sérénité dans les enchaînements.",
  },
  {
    title: "Mesurez votre évolution",
    text: "Comparez vos chronos, températures et sensations mentales à chaque session pour progresser durablement.",
  },
];

const leaderboardEntries: LeaderboardEntry[] = [
  { rank: 1, driver: "Alex V. / Trackname", car: "Porsche 911 GT3", progress: "+12%", bestLap: "1:12.84", sessions: 18, score: 98, streak: "6 sessions" },
  { rank: 2, driver: "Lucas M.", car: "BMW M4", progress: "+10.4%", bestLap: "1:13.67", sessions: 14, score: 92, streak: "4 sessions" },
  { rank: 3, driver: "Nolan R.", car: "Alpine A110 R", progress: "+9.7%", bestLap: "1:14.11", sessions: 11, score: 89, streak: "5 sessions" },
  { rank: 4, driver: "Emma D.", car: "Porsche Cayman GT4", progress: "+8.9%", bestLap: "1:14.48", sessions: 12, score: 84, streak: "3 sessions" },
  { rank: 5, driver: "Anthony L.", car: "Audi RS3", progress: "+8.1%", bestLap: "1:15.03", sessions: 10, score: 80, streak: "4 sessions" },
  { rank: 6, driver: "Mia C.", car: "Toyota GR Yaris", progress: "+7.6%", bestLap: "1:15.44", sessions: 9, score: 77, streak: "2 sessions" },
];

const mockSlots: BookingSlot[] = [
  { id: "slot-1", label: "Mercredi 14 • Matin", date: "14 mai 2026", remaining: 6, experience: "ACCES" },
  { id: "slot-2", label: "Samedi 17 • Après-midi", date: "17 mai 2026", remaining: 12, experience: "ACCES" },
  { id: "slot-3", label: "Mardi 20 • Matin", date: "20 mai 2026", remaining: 0, experience: "SIMULATION" },
  { id: "slot-4", label: "Jeudi 22 • Après-midi", date: "22 mai 2026", remaining: 8, experience: "PROMOTION" },
];

const initialDriver: DriverProfile = {
  firstName: "Alex",
  lastName: "Vasseur",
  stageName: "Trackname",
  carNumber: "#24",
  email: "alex@oxv-drive.com",
  phone: "+33 6 24 00 00 24",
};

const initialVehicle: VehicleProfile = {
  brand: "Porsche",
  model: "911 GT3",
  year: "2022",
  horsepower: "510 ch",
  powertrain: "Thermique",
  transmission: "Propulsion",
  tires: "Cup 2",
  preparation: "Track ready",
  plate: "AA-124-OXV",
};

const initialBookings: BookingRecord[] = [
  {
    id: "booking-1",
    offer: "ACCES",
    slotLabel: "Haute Saintonge • Mercredi 14 • Matin",
    circuit: "Haute Saintonge",
    status: "confirmee",
    amount: "790 €",
    vehicleLabel: "Porsche 911 GT3",
  },
  {
    id: "booking-2",
    offer: "SIMULATION",
    slotLabel: "Haute Saintonge • Mardi 20 • Matin",
    circuit: "Haute Saintonge",
    status: "terminee",
    amount: "490 €",
    vehicleLabel: "Porsche 911 GT3",
  },
];

const initialPerformance: PerformanceRecord[] = [
  { label: "S1", chrono: "1:16.20", progression: "+2%", temperature: "82°C", physical: "Bon", mental: "Stable", score: 42 },
  { label: "S2", chrono: "1:15.42", progression: "+4%", temperature: "84°C", physical: "Bon", mental: "Concentré", score: 54 },
  { label: "S3", chrono: "1:14.87", progression: "+6%", temperature: "85°C", physical: "Très bon", mental: "Focus élevé", score: 63 },
  { label: "S4", chrono: "1:14.22", progression: "+7%", temperature: "86°C", physical: "Très bon", mental: "Focus élevé", score: 72 },
  { label: "S5", chrono: "1:13.56", progression: "+9%", temperature: "86°C", physical: "Stable", mental: "Focus élevé", score: 82 },
  { label: "S6", chrono: "1:12.84", progression: "+12%", temperature: "87°C", physical: "Stable", mental: "Excellent", score: 91 },
];

function BackgroundFX() {
  return (
    <>
      <div className="fixed inset-0 -z-30 bg-[#050608]" />
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(185,28,28,0.22),transparent_18%),radial-gradient(circle_at_80%_12%,rgba(250,204,21,0.20),transparent_18%),radial-gradient(circle_at_80%_70%,rgba(56,189,248,0.16),transparent_20%),radial-gradient(circle_at_18%_85%,rgba(232,121,249,0.15),transparent_22%)]" />
      <div className="fixed inset-0 -z-10 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.62)_100%)]" />
    </>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-4xl">
      <p className="text-sm uppercase tracking-[0.34em] text-yellow-300">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl xl:text-6xl">{title}</h2>
      <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">{text}</p>
    </div>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.04)] ${className}`}>{children}</div>;
}

function StatRow({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">{label}</span>
      <span className={`text-sm font-medium ${accent}`}>{value}</span>
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-zinc-300">{label}</label>
      <Input className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500" placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} />
    </div>
  );
}

function SiteHeader({
  page,
  setPage,
  isAuthenticated,
  onAuthClick,
}: {
  page: PageId;
  setPage: (value: PageId) => void;
  isAuthenticated: boolean;
  onAuthClick: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button onClick={() => setPage("home")} className="flex items-center gap-3 text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-700/30 via-yellow-300/18 to-cyan-400/12 shadow-[0_0_30px_rgba(185,28,28,0.18)]">
            <span className="font-mono text-sm font-bold tracking-[0.3em] text-yellow-300">OXV</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Only Xtreme Vehicle</p>
            <p className="text-sm font-medium text-white">V8 premium foundation</p>
          </div>
        </button>

        <nav className="hidden items-center gap-2 xl:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${page === item.id ? "bg-gradient-to-r from-red-700 via-orange-500 to-yellow-300 text-black" : "text-zinc-300 hover:bg-white/5 hover:text-white"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden gap-3 xl:flex">
          <Button variant="outline" className="rounded-full border-cyan-400/20 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15" onClick={onAuthClick}>
            {isAuthenticated ? "Mon compte" : "Connexion pilote"}
          </Button>
          <Button className="rounded-full bg-gradient-to-r from-red-700 via-orange-500 to-yellow-300 px-5 text-black hover:opacity-90" onClick={() => setPage("booking")}>
            Réserver une session
          </Button>
        </div>

        <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white xl:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-white/10 xl:hidden">
            <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6 lg:px-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    setOpen(false);
                  }}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${page === item.id ? "bg-gradient-to-r from-red-700 via-orange-500 to-yellow-300 text-black" : "bg-white/5 text-zinc-200"}`}
                >
                  {item.label}
                </button>
              ))}
              <Button className="mt-2 w-full rounded-full bg-gradient-to-r from-red-700 via-orange-500 to-yellow-300 text-black" onClick={onAuthClick}>
                {isAuthenticated ? "Ouvrir mon compte" : "Connexion pilote"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function AuthModal({
  open,
  onClose,
  isAuthenticated,
  setAuthenticated,
}: {
  open: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <Panel className="w-full max-w-2xl bg-gradient-to-br from-red-700/18 via-fuchsia-500/10 to-cyan-500/10 p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">Accès pilote</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">{isAuthenticated ? "Compte connecté" : mode === "login" ? "Connexion OXV" : "Créer un compte OXV"}</h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 p-2 text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {!isAuthenticated && (
          <div className="mt-6 flex gap-3">
            <Button className={`rounded-full ${mode === "login" ? "bg-white text-black" : "bg-white/10 text-white"}`} onClick={() => setMode("login")}>Connexion</Button>
            <Button className={`rounded-full ${mode === "register" ? "bg-white text-black" : "bg-white/10 text-white"}`} onClick={() => setMode("register")}>Inscription</Button>
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {mode === "register" && !isAuthenticated && <Field label="Nom" placeholder="Votre nom" />}
          {mode === "register" && !isAuthenticated && <Field label="Prénom" placeholder="Votre prénom" />}
          <Field label="Email" placeholder="nom@email.com" />
          <Field label="Mot de passe" placeholder="********" />
          {mode === "register" && !isAuthenticated && <Field label="Nom de scène" placeholder="Trackname" />}
          {mode === "register" && !isAuthenticated && <Field label="Numéro voiture" placeholder="#24" />}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {!isAuthenticated ? (
            <Button className="rounded-full bg-gradient-to-r from-red-700 via-orange-500 to-yellow-300 text-black hover:opacity-90" onClick={() => { setAuthenticated(true); onClose(); }}>
              {mode === "login" ? "Se connecter" : "Créer mon compte"}
            </Button>
          ) : (
            <Button className="rounded-full bg-gradient-to-r from-red-700 via-orange-500 to-yellow-300 text-black hover:opacity-90" onClick={onClose}>Continuer vers mon espace</Button>
          )}
        </div>
      </Panel>
    </div>
  );
}

function Hero({ setPage }: { setPage: (value: PageId) => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,28,28,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_24%),linear-gradient(180deg,#050608_0%,#070910_50%,#050608_100%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24 xl:py-28">
        <div className="lg:col-span-7 xl:pr-8">
          <Badge className="mb-6 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-1 text-yellow-200 hover:bg-yellow-300/10">
            Compte pilote • Réservation • Leaderboard • Partenariat circuit
          </Badge>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl xl:text-7xl">
            OXV V8 : une base premium stable, orientée progression et leadership.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
            Le circuit devient plus lisible, plus utile pour le roulage, et la progression des pilotes devient visible grâce à une logique de classement et d’évolution.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => setPage("circuit")} className="rounded-full bg-gradient-to-r from-red-700 via-orange-500 to-yellow-300 px-6 text-black hover:opacity-90">
              Découvrir le circuit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => setPage("leaderboard")} className="rounded-full border-cyan-400/20 bg-cyan-400/10 px-6 text-cyan-100 hover:bg-cyan-400/15">
              Voir le classement
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Panel className="relative overflow-hidden p-5 shadow-[0_0_60px_rgba(185,28,28,0.12)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.18),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(232,121,249,0.16),transparent_24%),radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.12),transparent_28%)]" />
            <div className="relative space-y-4">
              <Panel className="border-white/10 bg-black/40 p-5">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">OXV Driver OS</span>
                  <span className="rounded-full bg-red-700/20 px-3 py-1 text-xs text-red-200">Leaderboard ready</span>
                </div>
                <div className="space-y-4">
                  <StatRow label="Pilote" value="#24 • Alex V. • Trackname" accent="text-yellow-300" />
                  <StatRow label="Meilleur tour" value="1:12.84" accent="text-red-300" />
                  <StatRow label="Progression" value="+12%" accent="text-cyan-300" />
                  <StatRow label="Classement" value="#1 évolution" accent="text-fuchsia-300" />
                </div>
              </Panel>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function HomePage({ setPage }: { setPage: (value: PageId) => void }) {
  return (
    <>
      <Hero setPage={setPage} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {keyStats.map((item, index) => (
            <Panel key={item.label} className={`bg-gradient-to-br ${[
              "from-red-700/20 via-orange-500/10 to-yellow-300/10",
              "from-yellow-300/16 via-orange-500/10 to-red-700/14",
              "from-fuchsia-500/15 via-red-500/10 to-orange-500/12",
              "from-cyan-500/15 via-blue-500/10 to-purple-500/12",
            ][index]} p-6`}>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.value}</p>
              <h3 className="mt-4 text-xl font-semibold text-white">{item.label}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-100/80">{item.text}</p>
            </Panel>
          ))}
        </div>
      </section>
    </>
  );
}

function ExperiencePage({ setPage }: { setPage: (value: PageId) => void }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionIntro eyebrow="Expérience OXV" title="Trois offres piliers, une seule signature premium." text="Une page simple, solide et prête à évoluer vers la V8 full stack réelle." />

      <div className="mt-14 space-y-8">
        {(Object.keys(offerMeta) as OfferType[]).map((key) => {
          const offer = offerMeta[key];
          const Icon = offer.icon;
          return (
            <Panel key={offer.title} className={`overflow-hidden bg-gradient-to-r ${offer.gradient}`}>
              <div className="grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10 xl:p-12">
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/20 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-8 text-xs uppercase tracking-[0.3em] text-zinc-100/70">{offer.subtitle}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{offer.title}</h3>
                </div>
                <div>
                  <p className="text-base leading-8 text-zinc-100/90">{offer.desc}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {offer.bullets.map((bullet) => (
                      <div key={bullet} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-zinc-100">
                        {bullet}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button className="rounded-full bg-black/25 text-white hover:bg-black/35" onClick={() => setPage("booking")}>
                      Ajouter à mon parcours
                    </Button>
                    <Button variant="outline" className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={() => setPage("marketplace")}>
                      Voir les options
                    </Button>
                  </div>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </section>
  );
}

function BookingPage({
  isAuthenticated,
  onRequireAuth,
  selectedOffer,
  setSelectedOffer,
  selectedSlotId,
  setSelectedSlotId,
  addBooking,
  vehicle,
}: {
  isAuthenticated: boolean;
  onRequireAuth: () => void;
  selectedOffer: OfferType;
  setSelectedOffer: (value: OfferType) => void;
  selectedSlotId: string;
  setSelectedSlotId: (value: string) => void;
  addBooking: () => void;
  vehicle: VehicleProfile;
}) {
  const selectedSlot = mockSlots.find((slot) => slot.id === selectedSlotId) ?? null;
  const selectedOfferMeta = offerMeta[selectedOffer];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionIntro eyebrow="Réservation" title="Un tunnel de réservation cohérent avec une marque premium." text="Le choix d’offre, la synchronisation du calendrier et la validation des places sont déjà simulés proprement." />

      <div className="mt-14 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Panel className="p-7 lg:p-8">
            <h3 className="text-2xl font-semibold text-white">Étape 1 — Choisir l’offre</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {(Object.keys(offerMeta) as OfferType[]).map((key) => {
                const offer = offerMeta[key];
                const Icon = offer.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedOffer(key)}
                    className={`rounded-[26px] border p-5 text-left transition ${selectedOffer === key ? "border-yellow-300/40 bg-gradient-to-br from-red-700/20 via-orange-500/12 to-yellow-300/12" : "border-white/10 bg-white/5 hover:bg-white/8"}`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/20 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm uppercase tracking-[0.3em] text-zinc-500">{offer.subtitle}</p>
                    <h4 className="mt-2 text-lg font-semibold text-white">{offer.title}</h4>
                  </button>
                );
              })}
            </div>
          </Panel>

          <Panel className="p-7 lg:p-8">
            <h3 className="text-2xl font-semibold text-white">Étape 2 — Synchroniser le calendrier</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {mockSlots.map((slot) => {
                const isDisabled = slot.remaining === 0;
                return (
                  <button
                    key={slot.id}
                    onClick={() => !isDisabled && setSelectedSlotId(slot.id)}
                    disabled={isDisabled}
                    className={`rounded-2xl border p-5 text-left transition ${selectedSlotId === slot.id ? "border-cyan-300/40 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/10" : "border-white/10 bg-black/20 hover:bg-black/30"} ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{slot.date}</p>
                    <h4 className="mt-2 text-lg font-semibold text-white">{slot.label}</h4>
                    <p className="mt-2 text-sm text-zinc-300">Places restantes : {slot.remaining}</p>
                  </button>
                );
              })}
            </div>
          </Panel>
        </div>

        <Panel className={`bg-gradient-to-br ${selectedOfferMeta.gradient} p-7 lg:sticky lg:top-28 lg:h-fit`}>
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">Résumé</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">{selectedOfferMeta.title}</h3>
          <div className="mt-6 space-y-3">
            <StatRow label="Pilote" value={isAuthenticated ? "Compte connecté" : "Connexion requise"} accent="text-yellow-300" />
            <StatRow label="Véhicule" value={`${vehicle.brand} ${vehicle.model}`} accent="text-red-300" />
            <StatRow label="Créneau" value={selectedSlot ? selectedSlot.label : "À sélectionner"} accent="text-cyan-300" />
            <StatRow label="Tarif" value={selectedOfferMeta.price} accent="text-green-300" />
          </div>
          <div className="mt-7 flex flex-col gap-3">
            <Button
              className="w-full rounded-full bg-black/25 text-white hover:bg-black/35"
              onClick={() => {
                if (!isAuthenticated) {
                  onRequireAuth();
                  return;
                }
                addBooking();
              }}
            >
              {isAuthenticated ? "Confirmer ma réservation" : "Se connecter pour réserver"}
            </Button>
            <Button variant="outline" className="w-full rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10">
              Payer un acompte
            </Button>
          </div>
        </Panel>
      </div>
    </section>
  );
}

function DriverPage({
  driver,
  setDriver,
  vehicle,
  setVehicle,
  bookings,
  performance,
}: {
  driver: DriverProfile;
  setDriver: React.Dispatch<React.SetStateAction<DriverProfile>>;
  vehicle: VehicleProfile;
  setVehicle: React.Dispatch<React.SetStateAction<VehicleProfile>>;
  bookings: BookingRecord[];
  performance: PerformanceRecord[];
}) {
  const latest = performance[performance.length - 1];
  const metrics = [
    { title: "Chrono", value: latest.chrono, icon: Timer, color: "text-yellow-300" },
    { title: "Température", value: latest.temperature, icon: Thermometer, color: "text-red-300" },
    { title: "État physique", value: latest.physical, icon: HeartPulse, color: "text-cyan-300" },
    { title: "État mental", value: latest.mental, icon: Radar, color: "text-fuchsia-300" },
    { title: "Progression", value: latest.progression, icon: BarChart3, color: "text-green-300" },
    { title: "Sessions", value: String(bookings.length), icon: BookOpen, color: "text-orange-300" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionIntro eyebrow="Espace pilote" title="Le compte OXV devient la mémoire vivante du pilote et de sa machine." text="Profil, véhicule, historique et indicateurs de performance sont déjà reliés dans une même interface." />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <Panel className="bg-gradient-to-br from-fuchsia-500/15 via-red-700/10 to-yellow-300/15 p-7 lg:sticky lg:top-28 lg:h-fit">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-black/20">
            <UserCircle2 className="h-16 w-16 text-yellow-300" />
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-white">Driver Avatar</h2>
            <p className="mt-1 text-sm text-zinc-300">{driver.carNumber} • {driver.firstName} {driver.lastName} • {driver.stageName}</p>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-7 lg:p-8">
            <h3 className="text-3xl font-semibold text-white">Compte OXV</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Nom" placeholder="Votre nom" value={driver.lastName} onChange={(value) => setDriver((prev) => ({ ...prev, lastName: value }))} />
              <Field label="Prénom" placeholder="Votre prénom" value={driver.firstName} onChange={(value) => setDriver((prev) => ({ ...prev, firstName: value }))} />
              <Field label="Nom de scène" placeholder="Trackname" value={driver.stageName} onChange={(value) => setDriver((prev) => ({ ...prev, stageName: value }))} />
              <Field label="Numéro voiture" placeholder="#24" value={driver.carNumber} onChange={(value) => setDriver((prev) => ({ ...prev, carNumber: value }))} />
              <Field label="Email" placeholder="nom@email.com" value={driver.email} onChange={(value) => setDriver((prev) => ({ ...prev, email: value }))} />
              <Field label="Téléphone" placeholder="06 00 00 00 00" value={driver.phone} onChange={(value) => setDriver((prev) => ({ ...prev, phone: value }))} />
            </div>
          </Panel>

          <Panel className="bg-gradient-to-br from-red-700/14 via-orange-500/10 to-yellow-300/10 p-7 lg:p-8">
            <h3 className="text-3xl font-semibold text-white">Véhicule référencé</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <Field label="Marque" placeholder="Porsche" value={vehicle.brand} onChange={(value) => setVehicle((prev) => ({ ...prev, brand: value }))} />
              <Field label="Modèle" placeholder="911 GT3" value={vehicle.model} onChange={(value) => setVehicle((prev) => ({ ...prev, model: value }))} />
              <Field label="Année" placeholder="2022" value={vehicle.year} onChange={(value) => setVehicle((prev) => ({ ...prev, year: value }))} />
              <Field label="Puissance" placeholder="510 ch" value={vehicle.horsepower} onChange={(value) => setVehicle((prev) => ({ ...prev, horsepower: value }))} />
              <Field label="Motorisation" placeholder="Thermique" value={vehicle.powertrain} onChange={(value) => setVehicle((prev) => ({ ...prev, powertrain: value }))} />
              <Field label="Transmission" placeholder="Propulsion" value={vehicle.transmission} onChange={(value) => setVehicle((prev) => ({ ...prev, transmission: value }))} />
              <Field label="Pneumatiques" placeholder="Cup 2" value={vehicle.tires} onChange={(value) => setVehicle((prev) => ({ ...prev, tires: value }))} />
              <Field label="Préparation" placeholder="Track ready" value={vehicle.preparation} onChange={(value) => setVehicle((prev) => ({ ...prev, preparation: value }))} />
              <Field label="Immatriculation" placeholder="AA-124-OXV" value={vehicle.plate} onChange={(value) => setVehicle((prev) => ({ ...prev, plate: value }))} />
            </div>
          </Panel>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Panel key={metric.title} className={`bg-gradient-to-br ${[
              "from-red-700/18 via-orange-500/10 to-yellow-300/10",
              "from-yellow-300/16 via-orange-500/10 to-red-700/14",
              "from-cyan-500/15 via-blue-500/10 to-purple-500/12",
              "from-fuchsia-500/15 via-red-500/10 to-orange-500/12",
              "from-green-500/14 via-cyan-500/10 to-blue-500/12",
              "from-orange-500/16 via-red-500/10 to-fuchsia-500/12",
            ][index]} p-6`}>
              <div className="flex items-center justify-between">
                <Icon className={`h-5 w-5 ${metric.color}`} />
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">Live</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{metric.title}</h3>
              <p className="mt-2 text-2xl font-bold text-white">{metric.value}</p>
            </Panel>
          );
        })}
      </div>
    </section>
  );
}

function CircuitPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionIntro eyebrow="Circuit de Haute Saintonge" title="Une page circuit plus directe, plus utile et plus performante pour le roulage." text="Le circuit est présenté avec un grand visuel, un accès direct au site officiel, les points techniques clés et des conseils de roulage pour progresser plus vite." />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Panel className="overflow-hidden">
          <div className="relative h-[440px] w-full bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-8">
              <Badge className="border border-yellow-300/20 bg-yellow-300/10 text-yellow-200">Circuit partenaire</Badge>
              <h3 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Haute Saintonge</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-200">
                Un tracé lisible, technique et cohérent pour construire de la progression, valoriser le pilote et donner une vraie dimension premium à l’expérience OXV.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://www.circuitdehautesaintonge.com/" target="_blank" rel="noreferrer">
                  <Button className="rounded-full bg-gradient-to-r from-red-700 via-orange-500 to-yellow-300 text-black hover:opacity-90">
                    Voir le site officiel
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="https://www.circuitdehautesaintonge.com/piste-vitesse/plan-piste/" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15">
                    Voir le plan de piste
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Panel>

        <Panel className="bg-gradient-to-br from-red-700/16 via-orange-500/10 to-yellow-300/10 p-7 lg:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">Détails importants</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {circuitSummary.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-zinc-100">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel className="bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/12 p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-cyan-300">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold text-white">Conseils de piste pour mieux performer</h3>
          <div className="mt-5 space-y-3">
            {circuitTips.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-base font-medium text-white">{tip.title}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-300">{tip.text}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="bg-gradient-to-br from-fuchsia-500/15 via-red-500/10 to-orange-500/12 p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-fuchsia-300">
            <Gauge className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold text-white">Lecture de roulage</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Chercher d’abord la fluidité avant la recherche absolue du chrono.",
              "Construire des freinages propres et reproductibles.",
              "Prioriser les sorties de virage pour profiter pleinement des relances.",
              "Stabiliser l’auto avant de remettre du volant ou de l’accélérateur.",
              "Comparer sensations et data pour trouver les gains réels.",
              "Monter en intensité progressivement sur chaque session.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-zinc-100">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function LeaderboardPage() {
  const topDriver = leaderboardEntries[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionIntro eyebrow="Classement évolution" title="Une page récap pour valoriser les pilotes qui progressent le plus." text="Le but est de créer une sensation de leadership, de progression visible et de désir d’appartenance pour pousser les utilisateurs à revenir et à s’améliorer." />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Panel className="overflow-hidden bg-gradient-to-br from-yellow-300/18 via-orange-500/10 to-red-700/18 p-7 lg:p-8">
          <div className="flex items-center justify-between">
            <Badge className="border border-yellow-300/20 bg-yellow-300/10 text-yellow-200">Leader actuel</Badge>
            <Medal className="h-6 w-6 text-yellow-300" />
          </div>
          <h3 className="mt-6 text-3xl font-semibold text-white">{topDriver.driver}</h3>
          <p className="mt-2 text-sm text-zinc-200">{topDriver.car}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <StatRow label="Progression" value={topDriver.progress} accent="text-yellow-300" />
            <StatRow label="Meilleur tour" value={topDriver.bestLap} accent="text-red-300" />
            <StatRow label="Score" value={`${topDriver.score}/100`} accent="text-cyan-300" />
            <StatRow label="Série" value={topDriver.streak} accent="text-fuchsia-300" />
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-zinc-100">
            Cette carte doit devenir un aimant psychologique : elle récompense l’évolution, valorise la régularité et pousse chaque pilote à revenir pour gagner des places au classement.
          </div>
        </Panel>

        <div className="space-y-4">
          {leaderboardEntries.map((entry) => (
            <Panel key={entry.rank} className={`p-5 ${entry.rank === 1 ? "bg-gradient-to-r from-yellow-300/16 via-orange-500/10 to-red-700/14" : "bg-white/5"}`}>
              <div className="grid items-center gap-4 md:grid-cols-[80px_1.4fr_1fr_1fr_120px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-white">#{entry.rank}</div>
                  {entry.rank <= 3 ? <Medal className={`h-5 w-5 ${entry.rank === 1 ? "text-yellow-300" : entry.rank === 2 ? "text-zinc-300" : "text-orange-300"}`} /> : null}
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{entry.driver}</p>
                  <p className="text-sm text-zinc-400">{entry.car}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Progression</p>
                  <p className="mt-1 text-lg font-semibold text-green-300">{entry.progress}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Meilleur tour</p>
                  <p className="mt-1 text-lg font-semibold text-cyan-300">{entry.bestLap}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Score</p>
                  <p className="mt-1 text-lg font-semibold text-yellow-300">{entry.score}</p>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Panel className="bg-gradient-to-br from-red-700/18 via-orange-500/10 to-yellow-300/10 p-6">
          <TrendingUp className="h-5 w-5 text-yellow-300" />
          <h3 className="mt-4 text-xl font-semibold text-white">Progression visible</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-300">Chaque pilote voit son évolution de manière concrète, ce qui renforce l’engagement et la répétition des sessions.</p>
        </Panel>
        <Panel className="bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/12 p-6">
          <Trophy className="h-5 w-5 text-cyan-300" />
          <h3 className="mt-4 text-xl font-semibold text-white">Sensation de leader</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-300">Le classement met en avant les meilleurs gains, pas seulement les voitures les plus puissantes ou les plus rapides.</p>
        </Panel>
        <Panel className="bg-gradient-to-br from-fuchsia-500/15 via-red-500/10 to-orange-500/12 p-6">
          <Users className="h-5 w-5 text-fuchsia-300" />
          <h3 className="mt-4 text-xl font-semibold text-white">Communauté premium</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-300">Les utilisateurs avancent dans un univers plus exclusif, plus compétitif et plus valorisant.</p>
        </Panel>
      </div>
    </section>
  );
}

function PartnershipPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionIntro eyebrow="Partenariat" title="Une page complète pour proposer une collaboration avec Haute Saintonge." text="Elle met en avant le circuit, crée des passerelles vers les pages officielles et installe une posture sérieuse de collaboration OXV x Haute Saintonge." />

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Panel className="bg-gradient-to-br from-red-700/18 via-orange-500/10 to-yellow-300/10 p-7">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">Vision OXV</p>
          <div className="mt-5 space-y-3 text-sm text-zinc-100">
            {[
              "Journées premium limitées à 20 pilotes",
              "Valorisation image du circuit",
              "Formats photo / vidéo / drone co-brandés",
              "Banque de contenus réutilisable",
              "Approche corporate et événementielle haut de gamme",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">{item}</div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-4 md:grid-cols-2">
          {partnershipLinks.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="rounded-[24px] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Lien officiel</p>
              <h4 className="mt-2 text-lg font-semibold text-white">{link.title}</h4>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{link.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-cyan-300">
                <span>Ouvrir</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Panel className="bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/12 p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-cyan-300"><Plane className="h-5 w-5" /></div>
          <h3 className="mt-5 text-2xl font-semibold text-white">Plan drone</h3>
          <div className="mt-4 space-y-3 text-sm text-zinc-100">
            {["Ligne droite principale", "Paddock / accueil", "Box et préparation", "Vue haute globale"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">{item}</div>
            ))}
          </div>
        </Panel>

        <Panel className="bg-gradient-to-br from-fuchsia-500/15 via-red-500/10 to-orange-500/12 p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-fuchsia-300"><ImageIcon className="h-5 w-5" /></div>
          <h3 className="mt-5 text-2xl font-semibold text-white">Banque photo</h3>
          <div className="mt-4 space-y-3 text-sm text-zinc-100">
            {["Driver portrait", "Vehicle beauty shots", "Paddock & hospitality", "Drone top shots"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">{item}</div>
            ))}
          </div>
        </Panel>

        <Panel className="bg-gradient-to-br from-yellow-300/14 via-orange-500/10 to-red-700/14 p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-yellow-300"><FileCheck className="h-5 w-5" /></div>
          <h3 className="mt-5 text-2xl font-semibold text-white">Certifications</h3>
          <div className="mt-4 space-y-3 text-sm text-zinc-100">
            {certifications.slice(0, 4).map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">{item}</div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function MarketplacePage() {
  const items = [
    { title: "Pack photo Signature", desc: "Shooting premium du pilote, du véhicule et de l’expérience.", price: "390 €", category: "Image", icon: Camera, gradient: "from-red-700/18 via-orange-500/10 to-yellow-300/10" },
    { title: "Pack vidéo Immersive", desc: "Capsules sociales, teaser premium et séquences cockpit.", price: "790 €", category: "Vidéo", icon: Video, gradient: "from-fuchsia-500/15 via-red-500/10 to-orange-500/12" },
    { title: "Coaching Performance", desc: "Accompagnement technique et progression par session.", price: "290 €", category: "Coaching", icon: Award, gradient: "from-cyan-500/15 via-blue-500/10 to-purple-500/12" },
    { title: "Merch & lifestyle", desc: "Produits premium et univers de marque.", price: "À partir de 49 €", category: "Lifestyle", icon: ShoppingBag, gradient: "from-yellow-300/14 via-orange-500/10 to-red-700/14" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionIntro eyebrow="Boutique additionnelle" title="Des services qui prolongent la valeur du parcours OXV." text="La boutique reste alignée avec l’univers premium automobile et complète le panier moyen." />
      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Panel key={item.title} className={`bg-gradient-to-br ${item.gradient} p-6`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-yellow-300"><Icon className="h-5 w-5" /></div>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-zinc-500">{item.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-100/85">{item.desc}</p>
              <p className="mt-4 text-lg font-semibold text-yellow-300">{item.price}</p>
            </Panel>
          );
        })}
      </div>
    </section>
  );
}

function PlatformPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionIntro eyebrow="Plateforme digitale" title="Le socle full stack est clairement posé dans l’interface." text="La V8 montre les tables, les routes API, les flux Supabase et Stripe, sans fragiliser le preview." />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        <Panel className="bg-gradient-to-br from-red-700/18 via-orange-500/10 to-yellow-300/10 p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-yellow-300"><Database className="h-5 w-5" /></div>
          <h3 className="mt-5 text-2xl font-semibold text-white">Supabase</h3>
          <div className="mt-4 space-y-3 text-sm text-zinc-100">
            {platformTables.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-cyan-200">{item}</div>
            ))}
          </div>
        </Panel>

        <Panel className="bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/12 p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-cyan-300"><Server className="h-5 w-5" /></div>
          <h3 className="mt-5 text-2xl font-semibold text-white">API</h3>
          <div className="mt-4 space-y-3 text-sm text-zinc-100">
            {apiRoutes.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs text-zinc-200">{item}</div>
            ))}
          </div>
        </Panel>

        <Panel className="bg-gradient-to-br from-fuchsia-500/15 via-red-500/10 to-orange-500/12 p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-fuchsia-300"><Workflow className="h-5 w-5" /></div>
          <h3 className="mt-5 text-2xl font-semibold text-white">Flux V8</h3>
          <div className="mt-4 space-y-3 text-sm text-zinc-100">
            {[
              "Sign-up / sign-in pilote",
              "Création du profil et du véhicule",
              "Choix de l’offre",
              "Lecture des disponibilités",
              "Création du booking",
              "Checkout Stripe",
              "Webhook → statut confirmé",
              "Dashboard alimenté par la data",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">{item}</div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-2">
        <SectionIntro eyebrow="Contact" title="Un point d’entrée premium pour les demandes corporate et partenariales." text="Cette page peut accueillir les demandes de collaboration, privatisation, contenu ou partenariat circuit." />

        <Panel className="bg-gradient-to-br from-red-700/15 via-fuchsia-500/10 to-cyan-500/10 p-7 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom" placeholder="Votre nom" />
            <Field label="Entreprise" placeholder="Votre société" />
            <Field label="Email" placeholder="nom@entreprise.com" />
            <Field label="Téléphone" placeholder="06 00 00 00 00" />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm text-zinc-300">Objet</label>
            <Input className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500" placeholder="Partenariat, projet circuit, contenu, corporate..." />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm text-zinc-300">Votre demande</label>
            <Textarea className="min-h-[140px] border-white/10 bg-white/5 text-white placeholder:text-zinc-500" placeholder="Décrivez votre besoin et le niveau de prestation souhaité." />
          </div>
          <Button className="mt-6 w-full rounded-full bg-gradient-to-r from-red-700 via-orange-500 to-yellow-300 text-black hover:opacity-90">Envoyer la demande</Button>
        </Panel>
      </div>
    </section>
  );
}

function Footer({ setPage }: { setPage: (value: PageId) => void }) {
  return (
    <footer className="border-t border-white/10 bg-black/45 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">OXV</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">Une plateforme immersive premium pour inscrire le pilote, référencer son véhicule, réserver une session, suivre la performance et valoriser l’expérience OXV.</p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Navigation</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setPage(item.id)} className="rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white">
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Signature digitale</p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">Version stabilisée pour le partage, enrichie avec une page circuit plus concrète et un leaderboard orienté progression utilisateur.</p>
        </div>
      </div>
    </footer>
  );
}

export default function OXVV8ShareableProject() {
  const [page, setPage] = useState<PageId>("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [driver, setDriver] = useState<DriverProfile>(initialDriver);
  const [vehicle, setVehicle] = useState<VehicleProfile>(initialVehicle);
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings);
  const [performance] = useState<PerformanceRecord[]>(initialPerformance);
  const [selectedOffer, setSelectedOffer] = useState<OfferType>("ACCES");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("slot-1");

  const selectedSlot = mockSlots.find((slot) => slot.id === selectedSlotId) ?? mockSlots[0];

  const addBooking = () => {
    const newRecord: BookingRecord = {
      id: `booking-${bookings.length + 1}`,
      offer: selectedOffer,
      slotLabel: selectedSlot.label,
      circuit: "Haute Saintonge",
      status: "a_payer",
      amount: offerMeta[selectedOffer].price,
      vehicleLabel: `${vehicle.brand} ${vehicle.model}`,
    };
    setBookings((prev) => [newRecord, ...prev]);
    setPage("driver");
  };

  const pageContent = useMemo(() => {
    switch (page) {
      case "experience":
        return <ExperiencePage setPage={setPage} />;
      case "booking":
        return (
          <BookingPage
            isAuthenticated={isAuthenticated}
            onRequireAuth={() => setAuthOpen(true)}
            selectedOffer={selectedOffer}
            setSelectedOffer={setSelectedOffer}
            selectedSlotId={selectedSlotId}
            setSelectedSlotId={setSelectedSlotId}
            addBooking={addBooking}
            vehicle={vehicle}
          />
        );
      case "driver":
        return <DriverPage driver={driver} setDriver={setDriver} vehicle={vehicle} setVehicle={setVehicle} bookings={bookings} performance={performance} />;
      case "circuit":
        return <CircuitPage />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "partnership":
        return <PartnershipPage />;
      case "marketplace":
        return <MarketplacePage />;
      case "platform":
        return <PlatformPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage setPage={setPage} />;
    }
  }, [page, isAuthenticated, selectedOffer, selectedSlotId, vehicle, driver, bookings, performance]);

  return (
    <div className="min-h-screen text-white">
      <BackgroundFX />
      <SiteHeader page={page} setPage={setPage} isAuthenticated={isAuthenticated} onAuthClick={() => setAuthOpen(true)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} isAuthenticated={isAuthenticated} setAuthenticated={setIsAuthenticated} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
            {pageContent}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
