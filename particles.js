
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Initial resize
    resizeCanvas();

    // Resize on window change
    window.addEventListener('resize', resizeCanvas);

    // Mouse position
    let mouse = {
        x: undefined,
        y: undefined,
        radius: 100
    };

    // Track mouse movement
    document.addEventListener('mousemove', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = 3;

            // this.baseX = this.x;
            // this.baseY = this.y;
            // this.density = (Math.random() * 30) + 1;
            // this.distance;

            this.vx = (Math.random() - 0.5) * .75; // Random horizontal speed
            this.vy = (Math.random() - 0.5) * .5; // Random vertical speed
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // White particles
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            this.distance = distance;

            // let directionX = forceDirectionX * force * this.density;
            // let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (mouse.radius - distance) / mouse.radius;

                this.x -= forceDirectionX * force * 10;
                this.y -= forceDirectionY * force * 10;

            } else {
                this.x += this.vx;
                this.y += this.vy;
            }

            // Keep particles within canvas bounds
            if (this.x < 0 || this.x > canvas.width) {
                this.vx = -this.vx;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.vy = -this.vy;
            }

        }
    }

    // Create particle array
    const numParticles = (window.innerWidth * window.innerHeight) / 3000;
    const particles = [];
    function init() {
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    init();

    // Animation function
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Optional: Draw connections between particles
        connectParticles();

        requestAnimationFrame(animate);
    }

    // Connect particles with lines
    function connectParticles() {
        let opacityValue = 1;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    opacityValue = 1 - (distance / 100);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`; // White lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Start animation
    animate();


    // Handle touch events for mobile
    canvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    });

    canvas.addEventListener('touchend', function () {
        mouse.x = undefined;
        mouse.y = undefined;
    });
});

