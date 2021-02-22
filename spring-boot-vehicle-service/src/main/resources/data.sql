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
    (1, 'A3'),
    (1, 'Q3'),
    (2, '1 series'),
    (2, '3 series'),
    (2, 'X5');

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
        35894.81),
    (1, 2, 'Sportback S-line', 
        'Sportback S-line model - 
            * Leather seats
            * Front sports seats
            * 18” alloy wheels
            * Sports suspension
            * Flat-bottomed steering wheel
            * LED Front lights with LED dynamic rear lights
            * Audi drive select
            * S line exterior styling
             - Roof spoiler
             - Sports front and rear bumpers
            * S line interior elements
             - Stainless steel pedals
             - S line scuff plates in doors
             - S line steering wheel
             - Black headliner
             - Split folding rear seat back rest with centre armrest and cupholders
             - Armrest in leather',
        38280.14),
    (1, 3, 'Sportback SE', 
        'Saloon SE model - 
            * 18” 5-arm alloy wheels
            * LED headlamps (Low)
            * Audi PreSense basic & PreSense front
            * Audi smartphone interface
            * Dual Zone climate control
            * Audi eCall
            * Hill hold and descent control
            * Virtual cockpit -10.25” screen
            * Electric tailgate',
        42011.69),
    (2, 4, 'SE', 
        'Hatchback SE model - 
            The SE model marks the entry point to the range, offering a high level of standard equipment and trademark BMW driving dynamics.',
        32891.56),
    (2, 4, 'M Sport', 
        'Hatchback M sport - 
            The M Sport model offers a sharpened appearance with M aerodynamic bodystyling, High-gloss Shadowline exterior trim and upgraded M light alloy wheels. Inside, the sporty feel is further enhanced by the leather upholstery and M-specific steering wheel.',
        38325.42),
    (2, 4, 'M Models', 
        'Hatchback M models - 
            BMW M Models are born on the racetrack. Inspired by BMWs rich motorsport history, M Models offer an outstanding combination of agility, dynamics and power. Equipped with powerful engines and M design enhancements, M Models are a statement of performance.',
        53977.79),
    (2, 5, 'SE Touring', 
        'SE Touring - 
            The SE model marks the entry point to the range, offering a high level of standard equipment and trademark BMW driving dynamics.',
        46425.01),
    (2, 6, 'Sport Touring', 
        'Sport Touring - 
            The Sport model offers a more athletic look with High-gloss Black exterior design elements as well as upgraded light alloy wheels. Interior highlights include Sport seats for the driver and front passenger and an exclusive Sport interior trim.',
        48445.01);

INSERT INTO model_option (model_edition_id, name, price) VALUES
    (1, '16 alloy wheels', 1478.88),
    (1, 'Cruise control', 3250.78),
    (1, 'Rear parking sensor', 567.78),
    (2, '18 alloy wheels', 2478.88),
    (2, 'Heated seats', 2890.78),
    (2, 'Rear parking camera', 1567.78);