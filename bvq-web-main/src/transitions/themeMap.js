export function themeFor(path) {
  if (!path) return 'gold';
  if (path.includes('/spa')) return 'sakura';
  if (path.includes('/du-lich')) return 'wave';
  if (path.includes('/nha-hang')) return 'steam';
  if (path.includes('/o-to')) return 'speed';
  if (path.includes('/bat-dong-san')) return 'blueprint';
  if (path.includes('/thoi-trang')) return 'silk';
  if (path.includes('/pricing')) return 'gold';
  return 'gold';
}

export function labelFor(theme) {
  switch (theme) {
    case 'sakura': return 'An Nhiên';
    case 'wave': return 'Vịnh Việt Nam';
    case 'steam': return "L'Artisan";
    case 'speed': return 'The Drive';
    case 'blueprint': return 'Residence';
    case 'silk': return 'Velas';
    default: return 'Bách Vân Quán';
  }
}
