export default async function CodePage() {
  async function getCode() {
    const url = `${process.env.BASE_URL}/api/getEmailContents`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data?.code;
  }

  const code = await getCode();
  return (
    <div>
      <h1>{code}</h1>
    </div>
  );
}
