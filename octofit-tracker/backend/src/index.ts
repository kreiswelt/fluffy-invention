import { app, port, apiBaseUrl } from './server';

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on ${apiBaseUrl}`);
});
