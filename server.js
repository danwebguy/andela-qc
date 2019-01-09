import express from 'express';
import 'airbnb-browser-shims';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import routes from './server/routes/routes';

const app = express();

routes(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

const port = process.env.PORT || 3000;
const server = app.listen(port);
export default server;
