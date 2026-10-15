type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0];

  return <div>{tag}</div>;
}