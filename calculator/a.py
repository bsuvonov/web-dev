import mysql.connector

# Database connection configuration
config = {
    'user': 'root',
    'password': 'your_password',  # Replace with your root password
    'host': '127.0.0.1',          # Replace with your server IP
    'port': 19930,                # Replace with the query port
    'database': 'your_database'   # Replace with your database name
}

try:
    # Connect to Doris
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    # Execute a query
    query = "SELECT * FROM your_table LIMIT 10;"
    cursor.execute(query)

    # Fetch and print the results
    for row in cursor.fetchall():
        print(row)

    # Close the connection
    cursor.close()
    conn.close()

except mysql.connector.Error as err:
    print(f"Error: {err}")

