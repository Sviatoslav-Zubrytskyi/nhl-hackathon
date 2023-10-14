const diffAray = ["Easy", "Medium", "Hard"]
        let count = 1;
        function changeDiff() {
            let d = document.querySelector("#difficulty");
            d.textContent = "Difficulty: " + diffAray[count];
            if (count == 2) count = 0;
            else count++
            
            

        }
        function showControls() {
            Swal.fire({
                title: 'Game Controls',
                html: 'Use the following controls to play the game:<br>' +
                    '<ul style="text-align: left; margin-left: 20px;">' +
                    '<li><b>W, A, S, D:</b> Use these keys to move your character.</li>' +
                    '<li><b>E:</b> Press E to shoot.</li>' +
                    '<li><b>H:</b> Press H to heal yourself (only one time).</li>' +
                    '</ul>',
                icon: 'info',
                confirmButtonText: 'Got it!',
                allowOutsideClick: false,
            });
        }
        
        function startGame() {
            console.log("start game")
        }

        function goBack() {
            document.getElementById('start-screen').style.display = 'block';
            document.getElementById('settings-screen').style.display = 'none'; // Hide the settings screen
            document.getElementById('credits-screen').style.display = 'none';
        }

        function openCredits() {
            // Hide the start screen and show the Credits screen
            document.getElementById('start-screen').style.display = 'none';
            document.getElementById('settings-screen').style.display = 'none'; // Hide the settings screen
            document.getElementById('credits-screen').style.display = 'block';
        }
        
        function openSettings() {
            // Hide the start screen and show the Settings screen
            document.getElementById('start-screen').style.display = 'none';
            document.getElementById('credits-screen').style.display = 'none'; // Hide the credits screen
            document.getElementById('settings-screen').style.display = 'block';
        }