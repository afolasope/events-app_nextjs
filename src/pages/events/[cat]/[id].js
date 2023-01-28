import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const SingleEvent = ({ data }) => {
  const emailValue = useRef();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailValue.current.value;
    const eventId = router?.query.id;
    try {
      const response = await fetch('../../api/registerEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, eventId }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <img src={data[0].image} alt="" height={400} width={900} />
      <p>{data[0].description}</p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum magni
        eligendi maxime laboriosam dolorum temporibus sapiente mollitia. Facere,
        doloremque voluptatum? Aliquam harum debitis quos unde velit! Dolorem
        obcaecati officiis nam?
      </p>
      <form onSubmit={onSubmit}>
        <label htmlFor="event">Register for this event</label>
        <input type="email" name="email" id="email" ref={emailValue} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SingleEvent;

export async function getStaticPaths() {
  const { allEvents } = await import('../../../../data/data.json');
  const paths = allEvents.map((event) => {
    return {
      params: {
        cat: event.city,
        id: event.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { allEvents } = await import('../../../../data/data.json');
  const id = context?.params.id;
  const event = allEvents.filter((ev) => id === ev.id);
  return {
    props: {
      data: event,
    },
  };
}
