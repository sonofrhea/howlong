import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        yellow: { 50: "#FEFCE8", 300: "#FDE047" },
        orange: { 50: "#FFF7ED", 200: "#FED7AA" },
        green: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#22C55E",
          600: "#16A34A",
        },
        blue: { 50: "#EFF6FF", 100: "#DBEAFE", 200: "#BFDBFE", 500: "#3B82F6", 600: "#2563EB", 700: "#1D4ED8" },
        red: { 50: "#FEF2F2", 100: "#FEE2E2", 500: "#EF4444", 700: "#B91C1C" },
        purple: { 50: "#F5F3FF", 100: "#EDE9FE", 500: "#8B5CF6", 600: "#7C3AED" },
        amber: { 50: "#FFFBEB", 600: "#D97706" },
        rose: { 50: "#FFF1F2", 100: "#FFE4E6", 700: "#BE123C" },
        indigo: { 100: "#E0E7FF" },
      },
      keyframes: {
        terminal: { "0%": { width: "0%" }, "50%": { width: "80%" }, "100%": { width: "0%" } },
      },
      animation: { "terminal-bar": "terminal 1.2s ease-in-out infinite" },
    },
  },
  plugins: [],
} as any; 

(config as any).safelist = [
  // layout & widths
  "w-[10vw]", "w-[30%]", "w-[50%]", "w-[60%]", "w-[70%]", "w-[80%]", "w-[100%]",
  "tracking-[0.1em]", "tracking-widest",
  
  // text
  "text-black","text-white","text-gray-400","text-gray-500","text-gray-600","text-gray-700","text-gray-800","text-gray-900",
  "text-green-400","text-green-600","text-blue-600","text-purple-600","text-red-500","text-red-700","text-amber-600",
  "text-amber-700","text-amber-800","text-rose-700","text-rose-800",
  
  // background colors
  "bg-white","bg-black","bg-gray-50","bg-gray-100","bg-gray-200","bg-gray-300","bg-gray-400","bg-gray-500","bg-gray-600","bg-gray-700","bg-gray-800","bg-gray-900",
  "bg-yellow-50","bg-yellow-300","bg-orange-50","bg-orange-200","bg-green-50","bg-green-100","bg-green-200","bg-green-300","bg-green-400","bg-green-500","bg-green-600",
  "bg-blue-50","bg-blue-100","bg-blue-200","bg-blue-500","bg-blue-600","bg-blue-700",
  "bg-red-50","bg-red-100","bg-red-500","bg-red-700",
  "bg-purple-50","bg-purple-100","bg-purple-500","bg-purple-600",
  "bg-indigo-100","bg-amber-50","bg-rose-50",
  
  // borders
  "border-gray-100","border-gray-200","border-gray-300","border-rose-100","border-amber-100","border-violet-300",
  
  // focus & hover rings
  "focus:ring-1","focus:ring-2","focus:ring-blue-500","focus:ring-green-300","focus:ring-green-500","focus:ring-purple-500",
  "hover:bg-blue-700","hover:bg-purple-50","hover:bg-yellow-50","hover:border-yellow-300","hover:border-purple-500","hover:text-blue-600",
  "disabled:opacity-50",
  
  // shadows
  "drop-shadow-md","shadow-inner","shadow-lg","shadow-xl","shadow-gray-300","shadow-3xl",
  
  // animation
  "animate-spin","animate-terminal-bar","animate-progress",
  
  // forms & inputs
  "w-full","px-3","py-2","rounded","rounded-lg","rounded-xl","rounded-2xl","rounded-3xl","p-1","p-1.5","p-2","p-4","p-6","pt-6","pl-10","pr-2","mb-2","mt-2","mt-4","mt-5",
  
  // custom classes from Styles.ts and sidebar/dashboard
  "min-h-screen","bg-white/80","backdrop-blur-sm","transition-all","transition-colors","transition-shadow","duration-200","cursor-pointer","flex","flex-col","flex-row","items-center","justify-between","justify-end","justify-center","gap-2","gap-4","gap-6","grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-3","lg:grid-cols-4","lg:grid-cols-5","lg:grid-cols-6","lg:grid-cols-7",
  "border-t","border-b","border-r","border-l","overflow-hidden","truncate",
  "text-sm","text-xs","text-xl","font-medium","font-semibold","font-light","font-bold","uppercase","tracking-wide",
  "text-center","text-left","text-right","ml-2","ml-4","mr-1",
  "bg-gradient-to-b","bg-gradient-to-br","from-blue-500","from-green-500","from-purple-50","from-purple-600","to-indigo-100","to-purple-600",
  "w-64","w-6","w-8","h-4","h-6","h-8","h-16","h-20","rounded-full","rounded-lg","max-w-3xl","max-h-[0vh]"
];

export default config;
