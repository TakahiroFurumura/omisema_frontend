function breakPoint() {
  const w = document.body.clientWidth;
  if (w < 600) return 'xs';
  if (w < 960) return 'sm';
  if (w < 1264) return 'md';
  if (w < 1904) return 'lg';
  return 'xl';
}

export {
    breakPoint
}