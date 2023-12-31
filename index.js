import Express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'

const app = Express();
const PORT = 3000;
// const DB = 'mongodb://localhost:27017/todo';
const DB = "mongodb+srv://amin:user@cluster01.kcpynb7.mongodb.net/?retryWrites=true&w=majority"
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Documentation of my first Backend Project",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Mukhammadamin",
                url: "https://github.com/Mukhammad-amin-ai",
                email: "aminahmadov123@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/swagger.js"]

};

const specs = swaggerJSDoc(options);


app.use(Express.json());
app.use('/api', router);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

const StarterFunc = async () => {
    try {
        await mongoose.connect(DB);
        app.listen(PORT, () => {
            console.log('Server is working on port ' + PORT);
        });
    } catch (e) {
        console.error(e);
    }
};

StarterFunc();
