const buttons = document.querySelectorAll('.btn');
const screen = document.getElementById('calculator-screen');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.value === 'C') {
            screen.value = '';
        } else if (button.value === '=') {
            // Create a FormData object to send the data via POST
            const formData = new FormData();
            formData.append('expression', screen.value);
            
            // Send the data via fetch API
            fetch('calculate.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network error');
                }
                return response.json();
            })
            .then(data => {
                if (data.result !== undefined) {
                    screen.value = data.result;
                } else if (data.error !== undefined) {
                    screen.value = data.error;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                screen.value = 'Error';
            });
        } else {
            screen.value += button.value;
        }
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= 0 && key <= 9 || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        screen.value += key;
    } else if (key === 'Enter') {
        const formData = new FormData();
        formData.append('expression', screen.value);

        fetch('calculate.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.result !== undefined) {
                screen.value = data.result;
            } else if (data.error !== undefined) {
                screen.value = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            screen.value = 'Error';
        });
    } else if (key === 'Backspace') {
        screen.value = screen.value.slice(0, -1);
    } else if (key === 'Escape') {
        screen.value = '';
    }
});
