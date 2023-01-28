import Link from 'next/link';

const EventCatPage = ({ data }) => {
  return (
    <div>
      {data.map((event) => {
        return (
          <Link key={event.id} href={`/events/${event.city}/${event.id}`}>
              <h1>{event.title}</h1>
              <img
                src={event.image}
                alt={event.title}
                height={300}
                width={300}
              />
              <p>{event.description}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default EventCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import('../../../../data/data.json');
  const paths = events_categories.map((event) => {
    return {
      params: {
        cat: event.id.toString(),
      },
    };
  });
  console.log(paths);

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const { allEvents } = await import('../../../../data/data.json');
  const id = context?.params.cat;
  const data = allEvents.filter((event) => event.city === id);

  return {
    props: {
      data,
    },
  };
}
