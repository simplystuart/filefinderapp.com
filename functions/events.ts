import * as Functions from "@netlify/functions";

const createRecord = (event: Functions.HandlerEvent): Promise<any> =>
  fetch(
    "https://api.airtable.com/v0/" +
      [process.env.AIRTABLE_BASE, process.env.AIRTABLE_TABLE].join("/"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.AIRTABLE_TOKEN,
      },
      body: JSON.stringify({
        records: [
          { fields: { Event: event.path.slice(8), Payload: event.body } },
        ],
      }),
    }
  );

export const handler: Functions.Handler = async (
  event: Functions.HandlerEvent,
  _context: Functions.HandlerContext
) =>
  createRecord(event)
    .then((response: Response) =>
      response.text().then((body) => ({
        statusCode: 200,
        body: JSON.stringify({
          airtable: { statusCode: response.status, body: body },
        }),
      }))
    )
    .catch((reason: any) => ({
      statusCode: 500,
      body: JSON.stringify(reason),
    }));
