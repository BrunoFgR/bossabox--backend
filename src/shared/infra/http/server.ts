import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import AppErrors from '@shared/errors/AppErrors';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppErrors) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(3000, () => {
    console.log('Server running port 3000');
});
