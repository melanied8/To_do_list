<?php

	$verif = false;

	if ($_SERVER['REQUEST_METHOD']==="POST")
	{
		//We verify the field are filled in
		if (isset($_POST['listName']) )
		{  
			//we retrieve the id that corresponds to the open session  
			$email_id = $_SESSION["email"];
			$sql = $db->prepare("SELECT id FROM users WHERE email=? LIMIT 1");
			$sql->execute([$email_id]);
			$usersId = $sql-> fetchAll(PDO::FETCH_ASSOC);
			foreach($usersId as $row) {
			$id = $row["id"];
			}

			//we check that the name of the list does not already exist 
			$stmt = $db->prepare("SELECT * FROM list WHERE name = :name AND id = :id");
			$stmt->execute( [ 'name' => $_POST['listName'], 'id'=> $id]);
			$result  = $stmt-> fetchAll(PDO::FETCH_ASSOC);
			
			if ($result!=null)
			{
				$_SESSION["msg_addList"] = "La liste existe déjà";
				//If the login exist, vérif = false
				$verif = false; 
				header("Location: home");
			}
			else {
				$verif = true;
			}
			if ($verif===true)
			{
				//we add the list to the database
				$request = $db->prepare("INSERT INTO list (name, id)
					VALUES(:name, :id)");

					//the parameters are bind to a specific variable name
					$name = $_POST['listName'];
					$request->bindParam(':name', $name);
					$request->bindParam(':id', $id);
					$request->execute();




				   //To get the newly created list ID
						$idListCree;
						$request = $db->prepare("SELECT idList FROM list WHERE name = :name"); 
						$request->execute(['name'=> $_POST['listName'] ]);
						$idOfTheList = $request-> fetch(PDO::FETCH_ASSOC);
			
						if($idOfTheList!=NULL)
						{
							$idListCree=$idOfTheList['idList'];
						}
						else
						{
							echo("Erreur dans la récupération de l'ID de la liste");
						}

					//Go to listDetails page, to the list that was just created
					header("Location: listDetails?id=" . $idListCree);										
                    exit();
			} 

		}
	}
?>
