export default function getCurrentDate(separator = "") {
  const current = new Date();
  const date = `${current.getFullYear()}/${current.getDate()}/${
    current.getMonth() + 1
  }`;

  return `${date}`;
}
