const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
  password: 'vijay565', // Replace with your password
    database: 'business_supply',
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// Example Endpoint to Add Employee
app.post('/addEmployee', (req, res) => {
    const { username, firstName, lastName, address, birthdate, taxID, hiredDate, experience, salary } = req.body;
    console.log('Request Data:', req.body); 
    db.query(
        `CALL add_employee(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [username, firstName, lastName,  address, birthdate, taxID, hiredDate, experience, salary],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Employee Added Successfully');
        }
    );
});

app.post('/addOwner', (req, res) => {
    const { username, firstName, lastName, address, birthdate} = req.body;
    console.log('Request Data:', req.body);
    db.query(
        `CALL add_owner(?, ?, ?, ?, ?)`,
        [username, firstName, lastName, address, birthdate],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Owner Added Successfully');
        }
    );
});

app.post('/fire_employee', (req, res) => {
    const { username, id } = req.body;
    console.log('Request Data:', req.body); // Debug log
    db.query(
        `CALL fire_employee(?, ?)`,
        [username, id],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Employee Fired Successfully');
        }
    );
});

app.post('/hire_employee', (req, res) => {
    const { username, id } = req.body;
    console.log('Request Data:', req.body); // Debug log
    db.query(
        `CALL hire_employee(?, ?)`,
        [username, id],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Employee Hired Successfully');
        }
    );
});

app.post('/add_business', (req, res) => {
    const { long_name, rating, spent, location } = req.body;
    console.log('Request Data:', req.body); // Debug log
    db.query(
        `CALL add_business(?, ?, ?, ?)`,
        [long_name, rating, spent, location],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Business Added Successfully');
        }
    );
});

app.post('/start_funding', (req, res) => {
    const { owner, amount, long_name, fund_date } = req.body;
    db.query(
        `CALL start_funding(?, ?, ?, ?)`,
        [owner, amount, long_name, fund_date],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Funding Started Successfully');
        }
    );
});

app.get('/owners', (req, res) => {
    db.query(`SELECT username FROM business_owners`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results);
    });
});

app.get('/businesses', (req, res) => {
    db.query(`SELECT long_name FROM businesses`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results);
    });
});

app.post('/add_driver_role', (req, res) => {
    const { username, licenseID, license_type, driver_experience  } = req.body;
    db.query(
        `CALL add_driver_role(?, ?, ?, ?)`,
        [username, licenseID, license_type, driver_experience],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Driver Role Added Successfully');
        }
    );
});

app.post('/remove_driver_role', (req, res) => {
    const { username } = req.body;
    db.query(
        `CALL remove_driver_role(?)`,
        [username],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Driver Role Removed Successfully');
        }
    );
});

app.get('/drivers', (req, res) => {
    db.query(`SELECT username FROM drivers`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results);
    });
});

app.get('/display_owner_view', (req, res) => {
    db.query(`SELECT * FROM display_owner_view`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results);
    });
});

app.get('/display_employee_view', (req, res) => {
    db.query(`SELECT * FROM display_employee_view`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results);
    });
});

app.get('/display_driver_view', (req, res) => {
    db.query(`SELECT * FROM display_driver_view`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results);
    });
});

app.get('/display_location_view', (req, res) => {
    db.query(`SELECT * FROM display_location_view`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results);
    });
});

app.get('/display_product_view', (req, res) => {
    db.query(`SELECT * FROM display_product_view`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results);
    });
});

app.get('/display_service_view', (req, res) => {
    db.query(`SELECT * FROM display_service_view`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results);
    });
});

app.post('/add_product', (req, res) => {
    const { barcode, name, weight } = req.body;

    db.query(
        `CALL add_product(?, ?, ?)`,
        [barcode, name, weight],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Product added successfully');
        }
    );
});

app.post('/purchase_product', (req, res) => {
    const { longName, id, tag, barcode, quantity } = req.body;

    db.query(
        `CALL purchase_product(?, ?, ?, ?, ?)`,
        [longName, id, tag, barcode, quantity],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Product purchased successfully');
        }
    );
});

app.post('/remove_product', (req, res) => {
    const { barcode } = req.body;

    db.query(
        `CALL remove_product(?)`,
        [barcode],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Product removed successfully');
        }
    );
});

app.get('/get_barcodes', (req, res) => {
    db.query(`SELECT barcode FROM products`, (err, results) => {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).send(err.message);
            return;
        }
        res.json(results); // Send the barcodes as JSON
    });
});

app.post('/add_service', (req, res) => {
    const { id, long_name, home_base, manager } = req.body;
     console.log('Request Data:', req.body); // Debug log
    db.query(
        `CALL add_service(?, ?, ?, ?)`,
        [id, long_name, home_base, manager],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Service added successfully');
        }
    );
});

app.post('/manage_service', (req, res) => {
    const { username, id } = req.body;

    db.query(
        `CALL manage_service(?, ?)`,
        [username, id],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send(err.message);
                return;
            }
            res.send('Service managed successfully');
        }
    );
});

app.post('/add_location', (req, res) => {
    const { label, x_coord, y_coord, space } = req.body;

    db.query(
        `CALL add_location(?, ?, ?, ?)`,
        [label, x_coord, y_coord, space],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send('Error executing procedure');
                return;
            }
            res.send('Location added successfully!');
        }
    );
});

app.post('/add_worker_role', (req, res) => {
    const { username } = req.body;

    db.query(
        `CALL add_worker_role(?)`,
        [username],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send('Error executing procedure');
                return;
            }
            res.send('Worker added successfully!');
        }
    );
});

// Endpoint to add a van
app.post('/add_van', (req, res) => {
    const { id, tag, fuel, capacity, sales, driven_by } = req.body;

    db.query(
        `CALL add_van(?, ?, ?, ?, ?, ?)`,
        [id, tag, fuel, capacity, sales, driven_by],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send('Error executing procedure');
                return;
            }
            res.send('Van added successfully!');
        }
    );
});

// Endpoint to fetch IDs for dropdown
app.get('/get_ids', (req, res) => {
    db.query('SELECT id FROM delivery_services', (err, results) => {
        if (err) {
            console.error('Error fetching IDs:', err.message);
            res.status(500).send('Error fetching IDs');
            return;
        }
        res.json(results.map((row) => row.id));
    });
});

// Endpoint to fetch drivers for dropdown
app.get('/get_drivers', (req, res) => {
    db.query('SELECT username FROM drivers', (err, results) => {
        if (err) {
            console.error('Error fetching drivers:', err.message);
            res.status(500).send('Error fetching drivers');
            return;
        }
        res.json(results.map((row) => row.username));
    });
});

// Endpoint to execute takeover_van procedure
app.post('/takeover_van', (req, res) => {
    const { username, id, tag } = req.body;

    db.query(
        `CALL takeover_van(?, ?, ?)`,
        [username, id, tag],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send('Error executing procedure');
                return;
            }
            res.send('Van successfully taken over!');
        }
    );
});

// Endpoint to fetch usernames for dropdown
app.get('/get_usernames', (req, res) => {
    db.query('SELECT username FROM drivers', (err, results) => {
        if (err) {
            console.error('Error fetching usernames:', err.message);
            res.status(500).send('Error fetching usernames');
            return;
        }
        res.json(results.map((row) => row.username));
    });
});

// Endpoint to fetch van IDs for dropdown
app.get('/get_van_ids', (req, res) => {
    db.query('SELECT id FROM delivery_services', (err, results) => {
        if (err) {
            console.error('Error fetching van IDs:', err.message);
            res.status(500).send('Error fetching van IDs');
            return;
        }
        res.json(results.map((row) => row.id));
    });
});

// Endpoint to execute load_van procedure
app.post('/load_van', (req, res) => {
    const { id, tag, barcode, num_packages, price } = req.body;
    console.log('Request Data:', req.body); // Debug log
    db.query(
        `CALL load_van(?, ?, ?, ?, ?)`,
        [id, tag, barcode, num_packages, price],
        (err, results) => {
            if (err) {
                console.error('Database Error:', err.message);
                res.status(500).send('Error executing procedure');
                return;
            }
            res.send('Van successfully loaded!');
        }
    );
});

// Endpoint to fetch van IDs for dropdown
app.get('/get_pvan_ids', (req, res) => {
    db.query('SELECT id FROM delivery_services', (err, results) => {
        if (err) {
            console.error('Error fetching van IDs:', err.message);
            res.status(500).send('Error fetching van IDs');
            return;
        }
        res.json(results.map((row) => row.id));
    });
});

// Endpoint to fetch barcodes for dropdown
app.get('/get_pbarcodes', (req, res) => {
    db.query('SELECT barcode FROM products', (err, results) => {
        if (err) {
            console.error('Error fetching barcodes:', err.message);
            res.status(500).send('Error fetching barcodes');
            return;
        }
        res.json(results.map((row) => row.barcode));
    });
});

app.post('/refuel_van', (req, res) => {
  const { id, tag, more_fuel } = req.body;

  db.query(
    `CALL refuel_van(?, ?, ?)`, // Replace with your actual stored procedure
    [id, tag, more_fuel],
    (err, results) => {
      if (err) {
        console.error('Database Error:', err.message);
        res.status(500).send('Error executing procedure');
        return;
      }
      res.send({ message: 'Van successfully refueled!' });
    }
  );
});

app.get('/get_fvan_ids', (req, res) => {
  db.query('SELECT id FROM delivery_services', (err, results) => {
    if (err) {
      console.error('Error fetching van IDs:', err.message);
      res.status(500).send('Error fetching van IDs');
      return;
    }
    res.json(results.map((row) => row.id)); // Send IDs as JSON array
  });
});

// Endpoint to execute drive_van procedure
app.post('/drive_van', (req, res) => {
  const { id, tag, destination } = req.body;

  db.query(
    `CALL drive_van(?, ?, ?)`, // Replace with your actual stored procedure
    [id, tag, destination],
    (err, results) => {
      if (err) {
        console.error('Database Error:', err.message);
        res.status(500).send('Error executing procedure');
        return;
      }
      res.send({ message: 'Van driven successfully!' });
    }
  );
});

// Endpoint to fetch van IDs for the dropdown
app.get('/get_dvan_ids', (req, res) => {
  db.query('SELECT id FROM delivery_services', (err, results) => {
    if (err) {
      console.error('Error fetching van IDs:', err.message);
      res.status(500).send('Error fetching van IDs');
      return;
    }
    res.json(results.map((row) => row.id));
  });
});

// Endpoint to execute remove_van procedure
app.post('/remove_van', (req, res) => {
  const { id, tag } = req.body;

  db.query(
    `CALL remove_van(?, ?)`, // Replace with your actual stored procedure
    [id, tag],
    (err, results) => {
      if (err) {
        console.error('Database Error:', err.message);
        res.status(500).send('Error executing procedure');
        return;
      }
      res.send({ message: 'Van removed successfully!' });
    }
  );
});

// Endpoint to fetch van IDs for the dropdown
app.get('/get_rvan_ids', (req, res) => {
  db.query('SELECT id FROM delivery_services', (err, results) => {
    if (err) {
      console.error('Error fetching van IDs:', err.message);
      res.status(500).send('Error fetching van IDs');
      return;
    }
    res.json(results.map((row) => row.id));
  });
});


app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
