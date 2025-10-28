import React, { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const lastMouseMoveRef = useRef(Date.now());

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let stars = [];

        // Your exact configuration
        const config = {
            starCount: 800,
            connectionDistance: 120,
            maxSpeed: 0.4,
            mouseForce: 0.3,
            starSize: 1.2,
            connectionOpacity: 0.1,
            returnSpeed: 0.02,
            inactiveTimeout: 2000
        };

        // Your exact functions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createStars();
        };

        const getStarColor = () => {
            const colors = ['#ffffff', '#f0f8ff', '#e6f3ff', '#d4ebff'];
            return colors[Math.floor(Math.random() * colors.length)];
        };

        const createStars = () => {
            stars = [];
            for (let i = 0; i < config.starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * config.maxSpeed,
                    vy: (Math.random() - 0.5) * config.maxSpeed,
                    size: config.starSize,
                    brightness: Math.random() * 0.5 + 0.5,
                    color: getStarColor(),
                    originalX: Math.random() * canvas.width,
                    originalY: Math.random() * canvas.height
                });
            }
        };

        const updateStars = () => {
            const currentTime = Date.now();
            const timeSinceLastMove = currentTime - lastMouseMoveRef.current;
            const isInactive = timeSinceLastMove > config.inactiveTimeout;

            stars.forEach(star => {
                if (!isInactive) {
                    const dx = star.x - mouseRef.current.x;
                    const dy = star.y - mouseRef.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        const force = (150 - distance) / 150;
                        const angle = Math.atan2(dy, dx);
                        const forcePower = force * config.mouseForce;
                        
                        star.vx += Math.cos(angle) * forcePower;
                        star.vy += Math.sin(angle) * forcePower;
                    }
                } else {
                    const dx = star.originalX - star.x;
                    const dy = star.originalY - star.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance > 1) {
                        star.vx += dx * config.returnSpeed;
                        star.vy += dy * config.returnSpeed;
                    }
                }

                if (star.x < 20) star.vx += 0.2;
                if (star.x > canvas.width - 20) star.vx -= 0.2;
                if (star.y < 20) star.vy += 0.2;
                if (star.y > canvas.height - 20) star.vy -= 0.2;

                const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
                if (speed > config.maxSpeed) {
                    star.vx = (star.vx / speed) * config.maxSpeed;
                    star.vy = (star.vy / speed) * config.maxSpeed;
                }

                star.x += star.vx;
                star.y += star.vy;

                star.vx *= 0.99;
                star.vy *= 0.99;

                if (star.x < -10) star.x = canvas.width + 10;
                if (star.x > canvas.width + 10) star.x = -10;
                if (star.y < -10) star.y = canvas.height + 10;
                if (star.y > canvas.height + 10) star.y = -10;
            });
        };

        const drawStars = () => {
            stars.forEach(star => {
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const drawConnections = () => {
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const star1 = stars[i];
                    const star2 = stars[j];
                    
                    const dx = star1.x - star2.x;
                    const dy = star1.y - star2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < config.connectionDistance) {
                        const opacity = (1 - (distance / config.connectionDistance)) * config.connectionOpacity;
                        
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        
                        ctx.beginPath();
                        ctx.moveTo(star1.x, star1.y);
                        ctx.lineTo(star2.x, star2.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            updateStars();
            drawConnections();
            drawStars();
            
            animationRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            lastMouseMoveRef.current = Date.now();
        };

        const handleMouseDown = () => {
            lastMouseMoveRef.current = Date.now();
        };

        // Initialize
        resizeCanvas();
        animate();

        // Event listeners
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}
        />
    );
};

export default StarfieldBackground;