const canvas = document.getElementById('drawingCanvas');
        const ctx = canvas.getContext('2d');
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let currentColor = 'black';
        let penSize = 2;
        let drawingHistory = [];
        let redoHistory = [];

         // Resize the canvas to fit the window
         function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - document.querySelector('.tool-container').offsetHeight;
            if (drawingHistory.length > 0) {
                ctx.putImageData(drawingHistory[drawingHistory.length - 1], 0, 0);
            }
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();


        function startDrawing(x, y) {
            isDrawing = true;
            [lastX, lastY] = [x, y];
        }

        function draw(x, y) {
            if (!isDrawing) return;
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = penSize;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();

            [lastX, lastY] = [x, y];
            drawingHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }

        function stopDrawing() {
            isDrawing = false;
            redoHistory = [];
        }

        function getTouchPos(touchEvent) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: touchEvent.touches[0].clientX - rect.left,
                y: touchEvent.touches[0].clientY - rect.top
            };
        }

        // Mouse Events
        canvas.addEventListener('mousedown', (e) => startDrawing(e.offsetX, e.offsetY));
        canvas.addEventListener('mousemove', (e) => draw(e.offsetX, e.offsetY));
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        // Touch Events
        canvas.addEventListener('touchstart', (e) => {
            const pos = getTouchPos(e);
            startDrawing(pos.x, pos.y);
        });
        canvas.addEventListener('touchmove', (e) => {
            const pos = getTouchPos(e);
            draw(pos.x, pos.y);
            e.preventDefault(); // Prevent scrolling
        });
        canvas.addEventListener('touchend', stopDrawing);

        document.getElementById('eraser').addEventListener('click', () => {
            currentColor = 'white';
            penSize = 10;
        });

        document.getElementById('pen').addEventListener('click', () => {
            currentColor = 'black';
            penSize = parseInt(document.getElementById('penSize').value);
        });

        document.getElementById('penSize').addEventListener('change', (e) => {
            penSize = parseInt(e.target.value);
        });

        document.querySelectorAll('.color-picker').forEach(colorPicker => {
            colorPicker.addEventListener('click', (e) => {
                currentColor = e.target.style.backgroundColor;
            });
        });

        document.getElementById('undo').addEventListener('click', () => {
            if (drawingHistory.length > 0) {
                redoHistory.push(drawingHistory.pop());
                ctx.putImageData(drawingHistory[drawingHistory.length - 1] || ctx.createImageData(canvas.width, canvas.height), 0, 0);
            }
        });

        document.getElementById('redo').addEventListener('click', () => {
            if (redoHistory.length > 0) {
                drawingHistory.push(redoHistory.pop());
                ctx.putImageData(drawingHistory[drawingHistory.length - 1], 0, 0);
            }
        });

        document.getElementById('ClearCanvas').addEventListener('click', ()=>{
            ctx.clearRect(0,0, canvas.width, canvas.height);
            drawingHistory = [];
            redoHistory =[];
        });
      
        
        