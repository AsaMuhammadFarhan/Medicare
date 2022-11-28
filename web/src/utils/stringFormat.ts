export const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

export const dateFormat = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const stringMinutes = minutes < 10 ? '0'+minutes.toString() : minutes.toString();
  const stringHours = hours < 10 ? '0'+hours.toString() : hours.toString()
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}, ${stringHours}:${stringMinutes} ${ampm}`
}

export const dateFormatWithoutDay = (date: Date, option?: "no date") => {
  if (option === "no date") return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export const timeDifference = (date: Date, dateDifference?: Date) => {
  const now = dateDifference ?? new Date();
  var seconds = (now.getTime() - date.getTime()) / 1000;
  if(seconds >= 31536000) return `${Math.floor(seconds / 31536000)} tahun`;
  if(seconds >= 86400) return `${Math.floor(seconds / 86400)} hari`;
  if(seconds >= 3600) return `${Math.floor(seconds / 3600)} jam`;
  if(seconds >= 60) return `${Math.floor(seconds / 60)} menit`;
  if(seconds > 0) return `${Math.floor(seconds)} detik`;
  return "beberapa saat";
} 

export function numberWithSeparator(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}