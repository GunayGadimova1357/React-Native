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
