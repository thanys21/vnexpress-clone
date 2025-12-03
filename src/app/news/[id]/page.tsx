const NewsDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <h1>{id}</h1>;
};

export default NewsDetailPage;
