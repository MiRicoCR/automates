CREATE TABLE address(
    addr_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    addr_street VARCHAR(300) NOT NULL,
    addr_number VARCHAR(20) NOT NULL,
    addr_zipcode VARCHAR(20) NOT NULL,
    addr_neighborhood VARCHAR(100),
    addr_city VARCHAR(100) NOT NULL,
    addr_state VARCHAR(100) NOT NULL,
    addr_country VARCHAR(100) NOT NULL,
    addr_zone VARCHAR(100) NOT NULL,
    addr_latitude VARCHAR(100) NOT NULL,
    addr_longitude VARCHAR(100) NOT NULL
);

CREATE TABLE store(
    stre_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    stre_name VARCHAR(100) NOT NULL,
    stre_rsocial VARCHAR(50) NOT NULL,
    stre_type_rsocial VARCHAR(50) NOT NULL,
    stre_tplace VARCHAR(100) NOT NULL,
    addr_id INT NOT NULL,
    FOREIGN KEY (addr_id) REFERENCES address(addr_id) ON DELETE CASCADE ON UPDATE CASCADE,
    stre_element VARCHAR(50) NOT NULL
);

CREATE TABLE record(
    rcrd_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    stre_id INT NOT NULL,
    FOREIGN KEY (stre_id) REFERENCES store(stre_id) ON UPDATE CASCADE,
    rcrd_type VARCHAR(50) NOT NULL,
    rcrd_family VARCHAR(50) NOT NULL,
    rcrd_name VARCHAR(100) NOT NULL,
    rcrd_size VARCHAR(50) NOT NULL,
    rcrd_modality VARCHAR(50) NOT NULL,
    rcrd_milk VARCHAR(50) NOT NULL,
    rcrd_sugar VARCHAR(50) NOT NULL,
    rcrd_tapioca VARCHAR(50) NOT NULL,
    rcrd_tapioca_extra VARCHAR(50) NOT NULL,
    rcrd_topping VARCHAR(50) NOT NULL,
    rcrd_jelly_coffee VARCHAR(50) NOT NULL,
    rcrd_jelly_samba VARCHAR(50) NOT NULL,
    rcrd_jelly_strawberry VARCHAR(50) NOT NULL,
    rcrd_jelly_lychee VARCHAR(50) NOT NULL,
    rcrd_pb_blueberry VARCHAR(50) NOT NULL,
    rcrd_pb_strawberry VARCHAR(50) NOT NULL,
    rcrd_pb_lychee VARCHAR(50) NOT NULL,
    rcrd_cheesefoam VARCHAR(50) NOT NULL,
    rcrd_pudding_taro VARCHAR(50) NOT NULL,
    rcrd_pudding_flan VARCHAR(50) NOT NULL,
    rcrd_chamoymiguelito VARCHAR(50) NOT NULL
);