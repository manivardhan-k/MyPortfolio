
// Eye and brow movement
document.addEventListener('mousemove', (event) => {
    const irises = document.querySelectorAll('.iris');
    const balls = document.querySelectorAll('.eye');
    const brows = document.querySelectorAll('.brow-one, .brow-two');

    // if (balls.length !== 2) return; // Ensure we have exactly two eyes

    // Get bounding rectangles
    const ball1Rect = balls[0].getBoundingClientRect();
    const ball2Rect = balls[1].getBoundingClientRect();

    // Calculate midpoint between the two eyes
    const centerX = ((ball1Rect.left + ball2Rect.right)/2);
    const centerY = ((ball1Rect.top + ball2Rect.bottom)/2);

    // Cursor position relative to the midpoint
    const cursorX = event.clientX - centerX;
    const cursorY = event.clientY - centerY;

    const distanceFromCenter = Math.sqrt(cursorX ** 2 + cursorY ** 2);

    const maxDistance = Math.sqrt((window.innerWidth - centerX) ** 2 + (window.innerHeight - centerY) ** 2);

    const ratio = 1.25/(3 + 50*distanceFromCenter/(maxDistance));
    const rotation = ratio * (180 / Math.PI); // Convert radians to degrees

    const maxMultiplier = 1.2; // Maximum rotation multiplier

    brows.forEach((brow, index) => {
        // Alternate rotation direction for each brow
        const rotationDirection = index === 0 ? -1 : 1;
        brow.style.transform = `rotateZ(${-Math.abs(rotation) * maxMultiplier * rotationDirection}deg)`;
    });

    // Calculate movement direction based on the midpoint
    const angle = Math.atan2(cursorY, cursorX);

    irises.forEach((iris) => {
        const ballRect = iris.parentElement.getBoundingClientRect(); // Get corresponding eye
        const maxDistance = ballRect.width / 2 - iris.offsetWidth / 1.5;
        const distance = Math.min(Math.sqrt(cursorX ** 2 + cursorY ** 2), maxDistance);

        // Apply transformation relative to the midpoint
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;

        // const skewX = Math.sin(angle) * 15; // Example skew effect
        // const skewY = Math.cos(angle) * -10; // Example skew effect
        const scale = 1 - (distance / maxDistance) * .05; // Scale slightly based on distance


        iris.style.transform = 
        `
            translate(${translateX}px, ${translateY}px)
            rotate(${angle}rad)
            scale(${scale})
        `;

    });
});

// Try to add the skews
// skewX(${skewX}deg)
// skewY(${skewY}deg)





// Sound
const contactLinks = document.querySelectorAll(".nav-links, button[type='submit']");
const hoverSound = document.getElementById("hover-sound");

hoverSound.volume = 0.3;

contactLinks.forEach(link => {
    link.addEventListener("click", () => {
        hoverSound.currentTime = 0; // Restart sound on each hover
        hoverSound.play();
    });
});


// Scroll ring
const statusElement = document.querySelector('.status');
const bar = new ProgressBar.Circle(statusElement, {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 100, // Keep this small for smooth transitions
    color: '#ffffff',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
});

// Throttle function to limit how often the progress bar updates
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function updateProgressBar() {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollPercent = scrollTop / scrollHeight;

    // Use `set` instead of `animate` for instant updates
    bar.set(scrollPercent);
}

// Throttle the scroll event to update every 16ms (approx. 60fps)
window.addEventListener('scroll', throttle(updateProgressBar, 16));






// Animations on scroll - fade in
document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const aboutContent = document.querySelector(".about-content");
    const projectsSection = document.getElementById("projects");
    const skillsContent = document.querySelector(".skills-container");

    // Create an Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add the animation class when the element is in view
                    entry.target.classList.add("animate-in");
                    entry.target.classList.remove("animate-out");
                } else {
                    // Remove the animation class when the element is out of view
                    entry.target.classList.remove("animate-in");
                    entry.target.classList.add("animate-out");
                }
            });
        },
        {
            threshold: 0.3, // Trigger when 50% of the element is visible
        }
    );

    // Start observing all elements
    if (aboutContent) observer.observe(aboutContent);
    if (projectsSection) observer.observe(projectsSection);
    if (skillsContent) observer.observe(skillsContent);
});


// document.addEventListener("DOMContentLoaded", () => {
//     const runningMan = document.querySelector(".running-man img");
//     const standingMan = document.querySelector(".standing-man img");
//     const runningStage = document.querySelector(".running-stage");

//     let running = false;
//     let animationFrame;

//     document.addEventListener("mousemove", (event) => {
//         const stageRect = runningStage.getBoundingClientRect();
//         const cursorX = event.clientX;

//         // Ensure cursor is within the stage bounds
//         if (cursorX >= stageRect.left && cursorX <= stageRect.right) {
//             running = true;
//             runningMan.style.display = "block"; 
//             standingMan.style.display = "none"; 

//             cancelAnimationFrame(animationFrame); 
//             moveRunningMan(cursorX, stageRect);
//         }
//     });

//     function moveRunningMan(targetX, stageRect) {
//         let runningManX = parseFloat(getComputedStyle(runningMan).left) || 0;

//         function step() {
//             let distance = targetX - runningManX;

//             if (Math.abs(distance) > 5) {
//                 runningManX += distance * 0.2; // Smooth movement
//                 runningMan.style.left = `${runningManX - stageRect.left}px`;
//                 animationFrame = requestAnimationFrame(step);
//             } else {
//                 // Stop running, show standing image
//                 runningMan.style.display = "none";
//                 standingMan.style.left = `${runningManX - stageRect.left}px`;
//                 standingMan.style.display = "block";
//                 running = false;
//             }
//         }

//         animationFrame = requestAnimationFrame(step);
//     }
// });




// // Create the glow element
// const cursorGlow = document.createElement('div');
// cursorGlow.classList.add('cursor-glow');
// document.body.appendChild(cursorGlow);

// // Update the position of the glow cursor
// document.addEventListener('mousemove', (e) => {
//     cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
// });



// const svgNode = document.querySelector('svg');
// const fePointLightNode = svgNode.querySelector('fePointLight');
// svgNode.addEventListener('mousemove', handleMove);
// svgNode.addEventListener('touchmove', handleMove);
// function handleMove(event) {
//   fePointLightNode.setAttribute('x', event.clientX);
//   fePointLightNode.setAttribute('y', event.clientY);
// }