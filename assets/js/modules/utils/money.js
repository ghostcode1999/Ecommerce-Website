function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

function calcPrecentDiscount(newPrice, oldPrice) {
  return Math.floor(((oldPrice - newPrice) / oldPrice) * 100);
}

export { formatCurrency, calcPrecentDiscount };
