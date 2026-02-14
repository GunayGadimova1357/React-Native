export const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.match(/.{1,4}/g)?.join(" ") ?? "";
};

export const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export const formatCVV = (value: string) =>
  value.replace(/\D/g, "").slice(0, 3);

export const maskCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  return last4 ? `•••• •••• •••• ${last4}` : "•••• •••• •••• ••••";
};

export const getCardBrand = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^6/.test(digits)) return "Discover";
  return "Card";
};
