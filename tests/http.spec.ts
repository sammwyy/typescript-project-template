import app from "../src/app";
import fetch from 'node-fetch';

it('Listen server', async () => {
  expect.assertions(1);

  let isRunning = await app.listen(6789, "127.0.0.1").catch((e) => {
    console.error(e);
    return false;
  })

  expect(isRunning).toEqual(true);
});

it('Request to server', async () => {
  expect.assertions(1);

  let request = await fetch("http://127.0.0.1:6789");

  expect(request.status).toEqual(200);
});

it('Testing ping route', async () => {
  expect.assertions(1);

  let request = await fetch("http://127.0.0.1:6789/ping");
  let body = await request.text();

  expect(body).toEqual("Pong");
});

it('Close server', async () => {
  expect.assertions(1);

  let isClosed = await app.close().catch((e) => {
    console.error(e);
    return false;
  })

  expect(isClosed).toEqual(true);
});
