-- Create the database
CREATE DATABASE IF NOT EXISTS pc_components_shopping;

-- Use the created database
USE pc_components_shopping;

-- Table: admin
CREATE TABLE IF NOT EXISTS admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(200) NOT NULL
);

INSERT INTO admin (username, email, password) VALUES ('defadmin', 'admin@temp.com', '$2b$10$OHghxZZ0uwrJBOoY9Y1bPOnk7B7CJJvLTRgtDz7HOyPcnPdr2fgJe');

-- Table: personal_info
CREATE TABLE IF NOT EXISTS personal_info (
    personal_info_id INT AUTO_INCREMENT PRIMARY KEY,
    phone1 VARCHAR(50) NOT NULL,
    phone2 VARCHAR(50),
    address_line1 VARCHAR(70) NOT NULL,
    address_line2 VARCHAR(70),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(50) NOT NULL
);

-- Table: customers
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    personal_info_id INT NOT NULL,
    FOREIGN KEY (personal_info_id) REFERENCES personal_info(personal_info_id)
);

-- Table: delisted_table
CREATE TABLE IF NOT EXISTS delisted_table (
    delisted_table_id INT AUTO_INCREMENT PRIMARY KEY,
    delisted_reason VARCHAR(50) NOT NULL,
    delisted_description VARCHAR(200) NOT NULL
);

INSERT INTO delisted_table (delisted_reason, delisted_description) VALUES
('cat_depth_changed', 'Category depth changed. The product category hierarchy has been modified.'),
('desc_requires_change', 'Product description requires change. The existing description is not accurate or needs improvement.'),
('images_require_change', 'Product images require change. The current images are not suitable or need to be updated.'),
('name_requires_change', 'Product name requires change. The name of the product needs to be updated.'),
('out_of_stock', 'Product out of stock. The item is no longer available for purchase.'),
('pricing_issue', 'Pricing issue. There is a problem with the product pricing.'),
('quality_concerns', 'Quality concerns. The product did not meet quality standards.'),
('discontinued', 'Product discontinued. The item has been permanently removed from the inventory.');

-- Table: new_category
CREATE TABLE IF NOT EXISTS new_category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    category_description VARCHAR(200) NOT NULL,
    alt_name VARCHAR(50) NOT NULL,
    category_id_ref INT,
    category_depth INT NOT NULL,
    FOREIGN KEY (category_id_ref) REFERENCES new_category(category_id)
);

-- Table: pending_image_deletions
CREATE TABLE IF NOT EXISTS pending_image_deletions (
    pending_paths VARCHAR(300)
);

-- Table: vendor_table
CREATE TABLE IF NOT EXISTS vendor_table (
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    organization_name VARCHAR(50) NOT NULL UNIQUE,
    email_id VARCHAR(50) NOT NULL,
    vendor_password VARCHAR(200) NOT NULL,
    personal_info_id INT NOT NULL,
    is_approved TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (personal_info_id) REFERENCES personal_info(personal_info_id)
);

-- Table: products
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(500) NOT NULL,
    product_description VARCHAR(1500) NOT NULL,
    unit_price DOUBLE NOT NULL,
    total_stock INT NOT NULL,
    total_price DOUBLE GENERATED ALWAYS AS (unit_price * total_stock) STORED,
    category_id INT NOT NULL,
    vendor_id INT NOT NULL,
    product_image VARCHAR(300) DEFAULT 'noimg',
    added_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    delisted_id_ref INT,
    FULLTEXT INDEX search(product_name),
    INDEX (vendor_id),
    INDEX (category_id),
    FOREIGN KEY (category_id) REFERENCES new_category(category_id),
    FOREIGN KEY (vendor_id) REFERENCES vendor_table(vendor_id),
    FOREIGN KEY (delisted_id_ref) REFERENCES delisted_table(delisted_table_id)
);

-- Table: shippers
CREATE TABLE IF NOT EXISTS shippers (
    shippers_id INT AUTO_INCREMENT PRIMARY KEY,
    shipping_company VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL
);

-- Table: payment
CREATE TABLE IF NOT EXISTS payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    payment_type VARCHAR(50) NOT NULL,
    is_allowed TINYINT NOT NULL
);

-- Table: orders
CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_amount INT NOT NULL,
    shippers_id INT NOT NULL,
    payment_id INT NOT NULL,
    order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    shipping_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (shippers_id) REFERENCES shippers(shippers_id),
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id)
);

-- Table: order_items
CREATE TABLE IF NOT EXISTS order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    price_per_unit DOUBLE NOT NULL,
    quantity INT NOT NULL,
    item_amount DOUBLE GENERATED ALWAYS AS (price_per_unit * quantity) STORED,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Table: cart
CREATE TABLE IF NOT EXISTS cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DOUBLE NOT NULL,
    total_amount DOUBLE GENERATED ALWAYS AS (unit_price * quantity) STORED,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

DELIMITER //
CREATE PROCEDURE DelistAndAddCategory(
    IN p_categoryName VARCHAR(50),
    IN p_categoryDesc VARCHAR(50),
    IN p_altName VARCHAR(50),
    IN p_categoryID INT,
    IN p_catDepth INT
)
BEGIN
    DECLARE exit handler FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;

    UPDATE products SET delisted_id_ref = (SELECT delisted_table_id from delisted_table WHERE delisted_reason = 'cat_depth_changed') WHERE category_id = p_categoryID;

    INSERT INTO new_category (
        category_name,
        category_description,
        alt_name,
        category_id_ref,
        category_depth
    ) VALUES (
        p_categoryName,
        p_categoryDesc,
        p_altName,
        p_categoryID,
        p_catDepth
    );
    
    COMMIT;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE deleteVendor(IN vendorId INT, IN personalInfoId INT)
BEGIN
	DELETE FROM vendor_table WHERE vendor_id = vendorId;
    DELETE FROM personal_info WHERE personal_info_id = personalInfoId;
END //
DELIMITER ;