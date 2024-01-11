# PC Components Shopping

PC Components Shopping is an e-commerce website for purchasing PC hardware and other accessories. It connects PC vendors to customers and provides an easy-to-navigate UI for all users.

This project is developed as part of my SYBBACA (Second Year Bachelor of Business Administration in Computer Application) curriculum.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js and npm installed
- MySQL database server installed

### Installation

Clone the repository & install dependencies:

   ```bash
   git clone https://github.com/Varad-gz/pc-components-shopping.git
   cd pc-components-shopping
   npm install
  ```

## Configuration

### Database & .env Setup

To set up the database for the project, follow these steps:

1. **Run SQL Scripts:**
   - Navigate to the `config` folder.
   - Locate the `database.sql` for setting up the database.
   - Run the SQL scripts in your SQL environment to create the necessary tables and schema.

2. **Update .env File:**
   - Create a `.env` file in the root directory if you haven't already.
   - Open the `.env` file and update the following values with your database configuration:
     
     ```dotenv
     PORT=your_port_number
     
     DATABASE_HOST=your_database_host
     DATABASE_PORT=your_database_port
     DATABASE_USER=your_database_user
     DATABASE_PASSWORD=your_database_password
     DATABASE_DB=pc_components_shopping
     
     ADMIN_PROXY_CHECK=your_admin_proxy_check
     VENDOR_PROXY_CHECK=your_vendor_proxy_check
     ```
     
   - Replace placeholders (`your_...`) with your actual configuration values.
   - *Note:* By default, the database name is set to `pc_components_shopping`. You can change it if necessary.

## Start the Application:
   - After completing the above steps, you can start the application using the provided startup command:
     
     ```bash
     npm start
     ```
     
   - Visit [http://localhost:your_port_number](http://localhost:your_port_number) in your browser to access the application.

## Default Admin Credentials

The project includes default admin credentials. New admin credentials can be created from the admin dashboard. It's possible to delete the default admin from the "Miscellaenous" section in the dashboard.

*Note:*
Only the default admin, upon login, has the capability to delete itself. If, for any reason, you delete the default credentials without creating new credentials, you need to run the insert script into the admin table from `database.sql` in the `config` folder to restore the default admin.

- **Username:** defadmin
- **Email:** admin@temp.com
- **Password:** admin
