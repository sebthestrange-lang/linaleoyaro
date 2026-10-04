// Highscore-Speicher im Browser (localStorage), Top 5
const STORAGE_KEY = 'linaundleo_highscores';
const MAX_ENTRIES = 5;

export function loadHighscores() {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

// Trägt das Ergebnis ein und gibt den Platz zurück (0-basiert) oder -1
export function addHighscore(character, score, won) {
  if (score <= 0) return -1;
  const entry = { character, score, won, date: new Date().toLocaleDateString('de-DE') };
  const list = loadHighscores();
  list.push(entry);
  list.sort((a, b) => b.score - a.score);
  const top = list.slice(0, MAX_ENTRIES);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
  } catch (e) {
    // Speichern nicht möglich (z.B. privater Modus) – Spiel läuft trotzdem
  }
  return top.indexOf(entry);
}
