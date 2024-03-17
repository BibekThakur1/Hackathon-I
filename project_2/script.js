 


 const fanOnButton = document.getElementById('toggleFan');
const decreaseSpeedButton = document.getElementById('decreaseSpeed');
const increaseSpeedButton = document.getElementById('increaseSpeed');
const fanSpeedDisplay = document.getElementById('fanSpeed');
const fanImage = document.querySelector('.device:first-child img');

let fanSpeed = 0;
let fanIntervalId;

fanOnButton.addEventListener('click', () => {
  if (fanOnButton.textContent === 'On') {
    fanOnButton.textContent = 'Off';
    fanIntervalId = setInterval(() => {
      fanImage.style.animationPlayState = 'running';
    //   fanSpeed++;
      fanSpeedDisplay.textContent = `Speed: ${fanSpeed}`;
      fetch('https://kodessphere-api.vercel.app/api/fan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speed: fanSpeed, mode: 'circular' }),
      });
    }, 200);
  } else {
    fanOnButton.textContent = 'On';
    fanImage.style.animationPlayState = 'paused';
    clearInterval(fanIntervalId);
    fetch('https://kodessphere-api.vercel.app/api/fan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ speed: fanSpeed, mode: 'stopped' }),
    });
  }
});

decreaseSpeedButton.addEventListener('click', () => {
  if (fanSpeed > 0) {
    fanSpeed--;
    fanSpeedDisplay.textContent = `Speed: ${fanSpeed}`;
    fetch('https://kodessphere-api.vercel.app/api/fan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ speed: fanSpeed }),
    });
  }
});

increaseSpeedButton.addEventListener('click', () => {
if (fanSpeed < 5) {
    fanSpeed++;
    fanSpeedDisplay.textContent = `Speed: ${fanSpeed}`;
    fetch('https://kodessphere-api.vercel.app/api/fan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ speed: fanSpeed }),
    });
  }
});

fanOnButton.textContent = 'On';
fanImage.style.animationPlayState = 'paused';
// const bulbOnButton = document.getElementById('toggleBulb');

// bulbOnButton.addEventListener('click', () => {
//   if (bulbOnButton.textContent === 'Turn Bulb On') {
//     bulbOnButton.textContent = 'Turn Bulb Off';
//     fetch('https://kodessphere-api.vercel.app/api/bulb', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ state: true }),
//     });
//   } else {
//     bulbOnButton.textContent = 'Turn Bulb On';
//     fetch('https://kodessphere-api.vercel.app/api/bulb', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ state: false }),
//     });
//   }
// });

const bulbOnButton = document.getElementById('toggleBulb');
const bulbImage = document.querySelector('.device:nth-child(2) img');

bulbOnButton.addEventListener('click', () => {
  if (bulbOnButton.textContent === 'Turn Bulb On') {
    bulbOnButton.textContent = 'Turn Bulb Off';
    fetch('https://kodessphere-api.vercel.app/api/bulb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: true }),
    });
    bulbImage.style.boxShadow = '0 0 10px 5px rgba(255, 165, 0, 0.5)';
  } else {
    bulbOnButton.textContent = 'Turn Bulb On';
    fetch('https://kodessphere-api.vercel.app/api/bulb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: false }),
    });
    bulbImage.style.boxShadow = 'none';
  }
});

// const ledColorPicker = document.getElementById('ledColorPicker');
// const ledImage = document.querySelector('.device img'); // Assuming the LED image is inside the device element

// ledColorPicker.value = '#ffffff'; // Set initial color to white

// ledColorPicker.addEventListener('input', () => {
//   const enteredColor = ledColorPicker.value;
//   if (enteredColor.length === 7 && enteredColor.startsWith('#')) {
//     ledImage.style.backgroundColor = enteredColor;
//   } else {
//     // Handle invalid color input (optional)
//     ledColorPicker.style.borderColor = 'red'; // Example for visual feedback
//   }
// });



const ledColorCode = document.getElementById('ledColorCode');
const ledImage = document.getElementById('ledImage');
const applyColorButton = document.getElementById('applyColorButton');

applyColorButton.addEventListener('click', async () => {
  const colorCode = ledColorCode.value.trim();
  if (colorCode.startsWith('#')) {
    ledImage.style.filter = `hue-rotate(${parseInt(colorCode.slice(1), 16) * 3.6}deg)`;
    ledImage.style.backgroundColor = colorCode;
    try {
      const response = await fetch('https://kodessphere-api.vercel.app/api/led', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color: colorCode }),
      });
      if (!response.ok) {
        throw new Error('Failed to set LED color');
      }
      console.log('LED color set successfully');
    } catch (error) {
      console.error('Error setting LED color:', error);
    }
  }
});


ledColorCode.addEventListener('input', () => {
  const colorCode = ledColorCode.value.trim();
  if (colorCode.startsWith('#')) {
    ledImage.style.filter = `hue-rotate(${parseInt(colorCode.slice(1), 16) * 3.6}deg)`;
    ledImage.style.backgroundColor = colorCode;
  }
});

const toggleACButton = document.getElementById('toggleAC');
const acTempDisplay = document.getElementById('acTempDisplay');
const acTempInput = document.getElementById('acTempInput');
let acOn = false; // Flag to track AC state

toggleACButton.addEventListener('click', () => {
  acOn = !acOn; // Toggle AC state

  if (acOn) {
    toggleACButton.textContent = 'Turn AC Off';
    acTempDisplay.textContent = acTempInput.value + '°C'; // Update displayed temp

    // Send API request to turn AC on with the current temperature (replace with your actual API call)
    fetch('https://kodessphere-api.vercel.app/api/ac', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'cool', temperature: acTempInput.value }), // Adjust mode and temperature based on needs
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data); // Handle successful API response (optional)
      })
      .catch(error => {
        console.error('API error:', error); // Handle API errors (optional)
      });
  } else {
    toggleACButton.textContent = 'Turn AC On';
    acTempDisplay.textContent = '-'; // Display placeholder or empty value when AC is off

    // Send API request to turn AC off (replace with your actual API call)
    fetch('https://kodessphere-api.vercel.app/api/ac', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'off' }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data); // Handle successful API response (optional)
      })
      .catch(error => {
        console.error('API error:', error); // Handle API errors (optional)
      });
  }
});




