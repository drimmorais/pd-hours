CREATE TABLE squad (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    estimated_hours INT NOT NULL CHECK (estimated_hours BETWEEN 1 AND 12),
    squad_id BIGINT,
    FOREIGN KEY (squad_id) REFERENCES squad(id)
);

CREATE TABLE report (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    employee_id BIGINT,
    spent_hours INT NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);
