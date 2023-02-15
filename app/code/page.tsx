async function getCode() {
  const url = `${process.env.BASE_URL}/api/getEmailContents`;
  const res = await fetch(url, {cache: 'no-store'});
  const data = await res.json();
  return data?.code;
}

export default async function CodePage() {
  const code = await getCode();
  return (
    <div>
      <Code code={code} />
    </div>
  )
}

function Code({ code }: any) {
  return <h1>{code}</h1>
}