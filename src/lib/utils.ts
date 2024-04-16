import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RoleType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

////////////////////////////////////////
///////// generate hslColor ///////////
const getHashOfString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  return hash;
};

const normalizeHash = (hash: number, min: number, max: number) => {
  return Math.floor((hash % (max - min)) + min);
};

const generateHSL = (name: string) => {
  const hRange = [0, 360];
  const sRange = [50, 75];
  const lRange = [25, 60];
  const hash = getHashOfString(name);
  const h = normalizeHash(hash, hRange[0], hRange[1]);
  const s = normalizeHash(hash, sRange[0], sRange[1]);
  const l = normalizeHash(hash, lRange[0], lRange[1]);
  return [h, s, l];
};

export const getHSLColor = (name: string) => {
  const hsl = generateHSL(name);

  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

export function formatSlug(text: string) {
  // Supprimer les accents
  const chaineSansAccents = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  // Remplacer les caractères spéciaux par des tirets
  const chaineSansSpeciaux = chaineSansAccents.replace(/[^\w\s-]/g, "");
  // Remplacer les espaces et apostrophes par des tirets
  const chaineSansEspacesApostrophes = chaineSansSpeciaux.replace(
    /[\s']/g,
    "-"
  );
  // Mettre tout en minuscules
  const chaineMinuscules = chaineSansEspacesApostrophes.toLowerCase();

  return chaineMinuscules;
}

export function roleLabel(role: RoleType) {
  switch (role) {
    case "subscriber":
      return "Abonné";
      break;
    case "author":
      return "Auteur";
      break;
    case "editor":
      return "Éditeur";
      break;
    case "admin":
      return "Admin";
      break;
    default:
      break;
  }
}
