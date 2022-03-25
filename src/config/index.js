import configDev from "./index.dev";
import configProd from "./index.prod";

const config = process.env.NODE_ENV === "production" ? configProd : configDev;
//const config = configProd;
export default config;
