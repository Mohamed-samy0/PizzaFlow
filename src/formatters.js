const intl = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export const formatCurrency = (amount) => intl.format(amount);
