DROP TABLE IF EXISTS model_option CASCADE;
DROP TABLE IF EXISTS model_edition CASCADE;
DROP TABLE IF EXISTS model;
DROP TABLE IF EXISTS make;

CREATE TABLE make (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

CREATE TABLE model (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make_id INT NOT NULL,
    name VARCHAR(250) NOT NULL,
    foreign key (make_id) references make(id)
);

CREATE TABLE model_edition (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make_id INT NOT NULL,
    model_id INT NOT NULL,
    name VARCHAR(250) NOT NULL,
    description CLOB NOT NULL,
    base_price DECIMAL(8, 2) NOT NULL,
    foreign key (make_id) references make(id),
    foreign key (model_id) references model(id)
);

CREATE TABLE model_option (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model_edition_id INT NOT NULL,
    name VARCHAR(250) NOT NULL,
    price DECIMAL(7, 2) NOT NULL,
    foreign key (model_edition_id) references model_edition(id)
);

INSERT INTO make (name) VALUES 
    ('Audi'),
    ('BMW'),
    ('Ford');

INSERT INTO model (make_id, name) VALUES
    (1, 'A1'),
    (1, 'A2'),
    (1, 'A3'),
    (1, 'A4'),
    (1, 'Q3'),
    (1, 'Q5'),
    (2, '1 series'),
    (2, '2 series'),
    (2, '3 series'),
    (2, '4 series'),
    (2, 'X3'),
    (2, 'X5'),
    (3, 'Fiesta'),
    (3, 'Focus'),
    (3, 'Galaxy'),
    (3, 'Puma'),
    (3, 'Kuga');

INSERT INTO model_edition (make_id, model_id, name, description, base_price) VALUES
    (1, 1, 'Sportback Attraction', 
        'Sportback attraction model - 
            * 15" alloy wheels 
            * Leather multi-function steering wheel 
            * Audi smartphone interface * 8.8" MMI Radio Plus',
        25460.21),
    (1, 1, 'Sportback SE', 
        'Sportback SE model - 
            * 16" alloy wheels 
            * Cruise control
            * Rear parking sensors
            * Audi smartphone interface',
        27480.74),
    (1, 2, 'Saloon SE', 
        'Saloon SE model - 
            * 17” Alloy Wheels
            * Cruise Control
            * Aluminium inserts in door sills
            * 2 Zone Climate Control
            * SE Bumpers
            * Split-folding rear seat',
        35894.81);

INSERT INTO model_option (model_edition_id, name, price) VALUES
    (1, '16 alloy wheels', 1478.88),
    (1, 'Cruise control', 3250.78);