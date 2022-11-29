export const timeDifference = (date: Date, dateDifference?: Date) => {
  const now = dateDifference ?? new Date();
  var seconds = (now.getTime() - date.getTime()) / 1000;
  if (seconds > 31536000) return `${Math.floor(seconds / 31536000)} tahun`;
  if (seconds > 86400) return `${Math.floor(seconds / 86400)} hari`;
  if (seconds > 3600) return `${Math.floor(seconds / 3600)} jam`;
  if (seconds > 60) return `${Math.floor(seconds / 60)} menit`;
  if (seconds > 0) return `${Math.floor(seconds)} detik`;
  return "beberapa saat";
};

export const dayDifference = (date: Date, dateDifference?: Date) => {
  const now = dateDifference ?? new Date();
  var seconds = (now.getTime() - date.getTime()) / 1000;
  return Math.floor(seconds / 86400); // detik dalam satu hari 60 * 60 * 24
};

export const getArrayofYearbyAmount = (numberofYears?: number) => {
  const thisYear = new Date().getFullYear();
  const fromYear = thisYear - (numberofYears ?? 20);
  const yearsStock: number[] = [];

  for (let index = fromYear; index < thisYear; index++) {
    yearsStock.push(index);
  };

  return yearsStock;
};

export const getArrayofYearbyStartYear = (start?: number) => {
  const thisYear = new Date().getFullYear();
  const fromYear = start ?? 1990;
  const yearsStock: number[] = [];

  for (let index = fromYear; index < thisYear; index++) {
    yearsStock.push(index);
  };

  return yearsStock;
};