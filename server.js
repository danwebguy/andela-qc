import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import 'babel-polyfill';
import routes from './server/routes/routes';

const app = express();

routes(app);

app.use(helmet());
app.use(compression());

const port = process.env.PORT || 3000;
console.log(`Server Running on port ${port}`);
const server = app.listen(port);
export default server;
