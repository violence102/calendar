<?php
        $month = 0;
        $year = 0;
        if (isset($_GET['month'])) {
                $month = $_GET['month'];
        }else{
                // Fallback behaviour goes here
        }
        if (isset($_GET['year'])) {
                $year = $_GET['year'];
        }else{
                // Fallback behaviour goes here
        }

        // set up the connection variables
        $db_name  = 'fenixzespol';
        $hostname = '127.0.0.1';
        $username = 'fenixzespol';
        $password = 'Mncjdkfj6784FD56fk';

        // connect to the database
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

        // a query get all the records from the users table
        $sql = 'SELECT * FROM kalendarz WHERE miesiac = ' . $month . ' AND rok = ' . $year;

        // use prepared statements, even if not strictly required is good practice
        $stmt = $dbh->prepare( $sql );

        // execute the query
        $stmt->execute();

        // fetch the results into an array
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );

        // convert to json
        $json = json_encode( $result );

        // echo the json string
        echo $json;
?>
