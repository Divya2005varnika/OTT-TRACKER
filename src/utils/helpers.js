export const getStatusClass = (s) => {
  if (s === "Watching") return "status-watching";
  if (s === "Completed") return "status-completed";
  if (s === "Plan to Watch") return "status-plan";
  return "status-dropped";
};

export const getPlatformEmoji = (p) => ({ 
  Netflix: "🎬", "Prime Video": "📦", "Disney+": "✨", 
  "Apple TV+": "🍎", "HBO Max": "⭕", Hulu: "💚" 
}[p] || "📺");