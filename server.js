import express from 'express';
import 'airbnb-browser-shims';
import helmet from 'helmet';
import compression from 'compression';
import routes from './server/routes/routes';

const app = express();

routes(app);

app.use(helmet());
app.use(compression());

const port = process.env.PORT || 3000;
const server = app.listen(port);
export default server;
