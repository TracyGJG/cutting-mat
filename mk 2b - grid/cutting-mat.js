(function () {
	drawGrid();
})();

function drawGrid() {
	const gridSize = 40;
	const grid = document.querySelector('#grid g');

	function repeatFn(times, fn) {
		[...'*'.repeat(times)].forEach(fn);
	}

	function drawLine(x1, y1, x2, y2, dash) {
		return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-dasharray="4,${
			dash * 4
		}"></line>`;
	}

	repeatFn(16 * 2, (_, index) => {
		const vert = gridSize * index;

		grid.innerHTML += drawLine(vert, 0, vert, 800, index % 2);
	});

	repeatFn(10 * 2, (_, index) => {
		const horiz = gridSize * index;

		grid.innerHTML += drawLine(0, horiz, 1280, horiz, index % 2);
	});
}
