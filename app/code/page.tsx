export default async function CodePage() {
  async function getCode() {
    const url = `${process.env.NEXT_PUBLIC_URL}/api/getEmailContents`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    data.date = new Date(data?.date).toLocaleString();

    return data;
  }

  const code = await getCode();
  return (
    <div>
      <h4>{code.date}</h4>
      <h1>{code.code}</h1>
    </div>
  );
}
