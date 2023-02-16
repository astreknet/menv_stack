import express from 'express';
import cors from 'cors';
import MoviesRoute from './api/MoviesRoute.js';

class Index {
    static app = express();
    static router = express.Router();
    static main() { 
        Index.setUpServer();
    }
    static setUpServer() { 
        Index.app.use(cors()); 
        Index.app.use(express.json());
        Index.app.use('/api/v1/movies', MoviesRoute.configRoutes(Index.router)); 
        Index.app.use('*', (req, res) => {
            res.status(404).json({ error: 'not found' }); 
        });
    } 
}
Index.main();
