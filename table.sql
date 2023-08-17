const createTableQuery =`
CREATE TABLE greetingP (
    id SERIAL PRIMARY KEY ,
    username VARCHAR(50) NOT NULL,
    number INT
)
`;