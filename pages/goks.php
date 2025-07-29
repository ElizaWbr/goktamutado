<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <link rel="icon" href="../img/icons/cat.svg">
        <link rel="stylesheet" href="../styles/index.css">
        <link rel="stylesheet" href="../styles/goks.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Possíveis Goks</title>
    </head>
    <body class="background-main">
        <div class="background-main-box">
            <div class="topbar">
                <div class="topbar-specialz topbar-left flex-center">
                    <a href="control.php" class="nav-button flex-center">
                        <img src="../img/icons/home-heart.svg" alt="Home icon" class="icon"/>
                        <span>início</span>
                    </a>
                </div>
                <div class="flex-center">
                    <a href="prove.php" class="nav-button color-white">atualizar status</a>
                    <a href="goks.php" class="nav-button color-white">possíveis goks</a>
                    <a href="info.php" class="nav-button color-white">dados</a>
                </div>
                <div class="topbar-specialz topbar-right flex-center">
                    <a href="contact.php" class="nav-button flex-center">
                        <img src="../img/icons/phone.svg" alt="Contact" class="icon"/>
                        <span>contato</span>
                    </a>
                </div>
            </div>
            <div class="full-screen" style="display: flex;flex-direction: column;align-items: center;">
                <h2>Possíveis Goks</h2>
                <div id="goks-container" class="container" style="padding-bottom: 20px;"></div>
            </div>
        </div>
        <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
        <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

        <script type="module" src="../main.js"></script>
        <script type="module" src="../js/theGoks.js"></script>
    </body>
</html>
