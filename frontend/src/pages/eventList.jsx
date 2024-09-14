import React from "react";

const EventList = ({ events }) => {
  return (
    <div>
      <h2>Events</h2>
      <table>
        <thead>
          <tr>
            <th>UserID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.user_id}</td>
              <td>{event.title}</td>
              <td>{event.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
