export async function getServerSideProps(context) {
  // Get the query parameters from the context
  const { keywords, hasCardUnity, battleStyle, cost, deckID, q, type } =
    context.query;

  // Build the filter string based on the query parameters
  let filter = "";
  if (title) {
    filter += `&title_contains=${title}`;
  }
  if (author) {
    filter += `&author_contains=${author}`;
  }

  // Fetch the data from the API using the filter string
  const res = await fetch(`https://example.com/api/posts?_limit=10${filter}`);
  const posts = await res.json();

  // Return the posts as props
  return {
    props: {
      posts,
    },
  };
}
