<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="./css/style.css" />
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"
  	/>
	<title>Connexion</title>
</head>
<body>
	<?php
		//we test if a session is open 
		//if yes, we redirect to the home page
		if (isset($_SESSION["email"])) {
			header("Location: home");
			exit(); 
		} 
		//else we show the login page 
		else { ?>
			<div class="login-wrapper">
			<form action="<?= route('/processLogin') ?>" method="POST" class="login">
				<label>Adresse e-mail</label> 
				<input class="box-model" type="email" name="email" placeholder="mail@provider.com">
				<label>Mot de passe</label>
				<input class="box-model" type="password" name="password" placeholder="password">
				<button class="button box-model pink" type="submit">Connexion</button>
				<div id ="red">
				<?php
					//Information on the current process
					if (!empty($_SESSION["msg_new_password"])) 
					{
						echo '<span style="color:green;">' .$_SESSION["msg_new_password"] .'</span>';
					}
					if (!empty($_SESSION["msg_login"])) 
					{
						echo '<span style="color:red;">' .$_SESSION["msg_login"] .'</span>';
					}
					if (!empty($_SESSION["msg_register"])) 
					{
						echo '<span style="color:green;">' .$_SESSION["msg_register"] .'</span>';
					}
		      			if (!empty($_SESSION["msg_connection"])) 
					{
						echo ($_SESSION["msg_connection"]); 
					}
					?>
					</div>
				<a href="<?= route('/forgottenPassword') ?>">J'ai oublié mon mot de passe</a>
				<a href="<?= route('/signUp')?>">Pas encore de compte ? Inscrivez-vous !</a>
			</form>
			</div>			
	<?php } ?>
</body>
</html>
