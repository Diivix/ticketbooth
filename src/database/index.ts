import { createConnection, Connection } from 'typeorm';

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables
export const connection = async (): Promise<Connection> => await createConnection();
