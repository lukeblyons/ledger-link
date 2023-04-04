const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Star {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.originalX = x;
		this.originalY = y;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	update(mouse) {
		const dx = this.x - mouse.x;
		const dy = this.y - mouse.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const maxDistance = 75; //area of stars moved away from cursor
		const force = 3; //how hard the stars move away from cursor

		if (distance < maxDistance) {
			this.x += dx / distance * force;
			this.y += dy / distance * force;
		} else {
			const speed = 0.05;
			this.x += (this.originalX - this.x) * speed;
			this.y += (this.originalY - this.y) * speed;
		}

		this.draw();
	}
}

function random(min, max) {
	return Math.random() * (max - min) + min;
}

let stars;

function init() {
	stars = [];

	for (let i = 0; i < 1500; i++) { //number of stars
		const x = random(0, canvas.width);
		const y = random(0, canvas.height);
		const radius = 1.5; //size of stars
		const color = 'rgba(15, 240, 252, 0.5)'; // Color of the stars
		stars.push(new Star(x, y, radius, color));
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (const star of stars) {
		star.update(mouse);
	}
}

const mouse = {
	x: undefined,
	y: undefined
};

canvas.addEventListener('mousemove', (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

canvas.addEventListener('mouseout', () => {
	mouse.x = undefined;
	mouse.y = undefined;
});

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
});

init();
animate();