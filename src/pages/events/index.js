import React from 'react';

const Page = ({ events }) => {
  return (
    <div>
      {events.map((event) => {
        return (
          <div key={event.id}>
            <a href={`/events/${event.id}`}>
              <img src={event.image} alt={event.id} height={300} width={300} />
              <p>{event.description}</p>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Page;

export async function getStaticProps() {
  const { events_categories } = await import('../../../data/data.json');
  return {
    props: {
      events: events_categories,
    },
  };
}
