import Portfolio from "../components/Portfolio";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;

  return <Portfolio skipInitialLoader={params?.skipLoader === "1"} />;
}
