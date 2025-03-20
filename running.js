
// Running man
document.addEventListener('mousemove', (event) => {
    const stage = document.querySelector('.running-stage');
    const running = document.querySelector('.running-man');
    const runningImg = running.querySelector('img');
    const standing = document.querySelector('.standing-man');
    const standingImg = standing.querySelector('img');
    
    // Get dimensions
    const stageRect = stage.getBoundingClientRect();
    const imgRect = runningImg.getBoundingClientRect(); // Actual image position
    
    // Calculate positions
    const cursorX = event.clientX - stageRect.left; // Relative to stage
    const imgCenterX = (imgRect.left + imgRect.right) / 2 - stageRect.left; // Image center
    
    // Calculate target X for container
    const targetX = cursorX - running.offsetWidth / 2;
    const maxX = stageRect.width - running.offsetWidth;
    const newX = Math.max(0, Math.min(targetX, maxX));
    
    // Update container position
    running.style.transform = `translateX(${newX}px)`;
    standing.style.transform = `translateX(${newX}px)`;
    
    // Calculate flip condition (using IMAGE center)
    const isToRightOfCursor = imgCenterX > cursorX;
    
    // Apply rotation to image only
    runningImg.style.transform = `translate(7px, 4px) rotateY(${isToRightOfCursor ? '180deg' : '0deg'})`;

    const isDirectlyBelow = Math.abs(imgCenterX - cursorX) == 0;
    if (isDirectlyBelow) {
        // Running character is directly below the cursor
        runningImg.style.opacity = 0;
        standingImg.style.opacity = 1;
    } else {
        // Running character is not directly below the cursor
        runningImg.style.opacity = 1;
        standingImg.style.opacity = 0;
    }

});



// const stage = document.querySelector('.running-stage');
// const running = document.querySelector('.running-man');
// const runningImg = running.querySelector('img');
// const standing = document.querySelector('.standing-man');
// const standingImg = standing.querySelector('img');

// let lastCursorX = null; // Store last cursor X position
// let isCursorMoving = false; // Track if the cursor is moving
// let timeoutId = null; // Timeout ID for detecting when the cursor stops

// document.addEventListener('mousemove', (event) => {
//     const stageRect = stage.getBoundingClientRect();
//     const cursorX = event.clientX - stageRect.left; // Relative to stage

//     // If cursor position has changed, it's moving
//     if (lastCursorX !== cursorX) {
//         isCursorMoving = true;
//         lastCursorX = cursorX;

//         // Hide standing character and show running character
//         runningImg.style.opacity = 1;
//         standingImg.style.opacity = 0;

//         // Clear any existing timeout
//         if (timeoutId) {
//             clearTimeout(timeoutId);
//         }

//         // Set a timeout to detect when the cursor stops moving
//         timeoutId = setTimeout(() => {
//             isCursorMoving = false;

//             // Show standing character and hide running character
//             runningImg.style.opacity = 0;
//             standingImg.style.opacity = 1;
//         }, 100); // Adjust delay (in ms) as needed
//     }

//     // Update character position and rotation
//     const imgRect = runningImg.getBoundingClientRect();
//     const imgCenterX = (imgRect.left + imgRect.right) / 2 - stageRect.left; // Image center relative to stage

//     const targetX = cursorX - running.offsetWidth / 2;
//     const maxX = stageRect.width - running.offsetWidth;
//     const newX = Math.max(0, Math.min(targetX, maxX));

//     running.style.transform = `translateX(${newX}px)`;
//     standing.style.transform = `translateX(${newX}px)`;

//     const isToRightOfCursor = imgCenterX > cursorX;
//     runningImg.style.transform = `translate(15%, 20%) rotateY(${isToRightOfCursor ? '180deg' : '0deg'})`;
// });

