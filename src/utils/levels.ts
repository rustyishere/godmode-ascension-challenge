
const LEVEL_NAMES = [
  'INITIATE',
  'DISCIPLINE SEEKER',
  'PAIN TAMER',
  'CRAVING KILLER',
  'LIMIT BENDER',
  'SHADOW OF WILL',
  'FLESH REAPER',
  'HUMAN+',
  'BIOLOGICAL ANOMALY',
  'GODMODE: ACTIVE'
];

export const getLevelName = (level: number): string => {
  if (level >= LEVEL_NAMES.length) {
    return 'GODMODE: TRANSCENDENT';
  }
  return LEVEL_NAMES[level] || 'INITIATE';
};

export const getLevelProgress = (xp: number): number => {
  const currentLevelXP = xp % 100;
  return currentLevelXP;
};

export const getXPForNextLevel = (xp: number): number => {
  return 100 - (xp % 100);
};
